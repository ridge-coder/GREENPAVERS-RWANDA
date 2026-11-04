<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Referrer-Policy: no-referrer');
header('X-Content-Type-Options: nosniff');

function trackRespond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}

function trackReadReference(): ?string
{
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    if (stripos($contentType, 'application/json') !== false) {
        $body = file_get_contents('php://input');
        if ($body === false || strlen($body) > 4096) {
            return null;
        }
        try {
            $data = json_decode($body, true, 16, JSON_THROW_ON_ERROR);
        } catch (JsonException) {
            return null;
        }
    } else {
        $data = $_POST;
    }

    $reference = is_array($data) && is_string($data['tracking_reference'] ?? null)
        ? strtoupper(trim($data['tracking_reference']))
        : '';

    return preg_match('/^[A-F0-9]{64}$/', $reference) ? $reference : null;
}

function trackConsumeAttempt(): bool
{
    $address = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $addressHash = hash('sha256', $address);
    $directory = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'greenpavers-tracking';
    if (!is_dir($directory) && !@mkdir($directory, 0700) && !is_dir($directory)) {
        throw new RuntimeException('Could not create the private tracking rate-limit directory.');
    }
    if (!is_dir($directory) || is_link($directory)) {
        throw new RuntimeException('The tracking rate-limit directory is not private.');
    }
    if (PHP_OS_FAMILY !== 'Windows' && !chmod($directory, 0700)) {
        throw new RuntimeException('Could not secure the tracking rate-limit directory.');
    }

    $path = $directory . DIRECTORY_SEPARATOR . $addressHash . '.json';
    $file = fopen($path, 'c+');
    if ($file === false) {
        throw new RuntimeException('Could not open the local tracking rate-limit file.');
    }

    $locked = false;
    try {
        if (PHP_OS_FAMILY !== 'Windows' && !chmod($path, 0600)) {
            throw new RuntimeException('Could not secure the tracking rate-limit file.');
        }
        if (!flock($file, LOCK_EX)) {
            throw new RuntimeException('Could not lock the local tracking rate-limit file.');
        }
        $locked = true;

        rewind($file);
        $contents = stream_get_contents($file);
        if ($contents === false) {
            throw new RuntimeException('Could not read the local tracking rate-limit file.');
        }

        $state = $contents === '' ? null : json_decode($contents, true);
        if ($contents !== '' && !is_array($state)) {
            throw new RuntimeException('The local tracking rate-limit file is invalid.');
        }

        $now = time();
        $windowStarted = (int) ($state['window_started'] ?? 0);
        $attempts = (int) ($state['attempts'] ?? 0);
        if ($windowStarted <= 0 || $now - $windowStarted >= 900) {
            $windowStarted = $now;
            $attempts = 0;
        }
        $attempts++;
        $encoded = json_encode(
            ['window_started' => $windowStarted, 'attempts' => $attempts],
            JSON_THROW_ON_ERROR
        );

        rewind($file);
        if (!ftruncate($file, 0) || fwrite($file, $encoded) !== strlen($encoded) || !fflush($file)) {
            throw new RuntimeException('Could not update the local tracking rate-limit file.');
        }

        return $attempts <= 20;
    } finally {
        if ($locked) {
            flock($file, LOCK_UN);
        }
        fclose($file);
    }
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    trackRespond(405, ['success' => false, 'code' => 'method_not_allowed']);
}

if (isset($_SERVER['CONTENT_LENGTH']) && (int) $_SERVER['CONTENT_LENGTH'] > 4096) {
    trackRespond(400, ['success' => false, 'code' => 'invalid_reference']);
}

try {
    if (!trackConsumeAttempt()) {
        trackRespond(429, ['success' => false, 'code' => 'rate_limited']);
    }
} catch (Throwable $exception) {
    error_log('GREENPAVERS request tracking rate limit failed: ' . $exception->getMessage());
    trackRespond(503, ['success' => false, 'code' => 'tracking_unavailable']);
}

$reference = trackReadReference();
if ($reference === null) {
    trackRespond(404, ['success' => false, 'code' => 'request_not_found']);
}

try {
    require_once __DIR__ . '/../config/database.php';
    $statement = greenpaveDatabase()->prepare(
        'SELECT status, created_at FROM requests WHERE tracking_token_hash = :tracking_token_hash LIMIT 1'
    );
    $statement->execute(['tracking_token_hash' => hash('sha256', $reference)]);
    $request = $statement->fetch();
    if (!$request) {
        trackRespond(404, ['success' => false, 'code' => 'request_not_found']);
    }

    $customerStatus = $request['status'] === 'Confirmed' ? 'Approved' : $request['status'];
    trackRespond(200, [
        'success' => true,
        'request' => [
            'status' => $customerStatus,
            'submitted_at' => date(DATE_ATOM, strtotime($request['created_at'])),
        ],
    ]);
} catch (Throwable $exception) {
    error_log('GREENPAVERS request tracking lookup failed: ' . $exception->getMessage());
    trackRespond(503, ['success' => false, 'code' => 'tracking_unavailable']);
}
