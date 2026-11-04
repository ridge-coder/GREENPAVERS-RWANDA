<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}

function readRequestData(): ?array
{
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    if (stripos($contentType, 'application/json') !== false) {
        $body = file_get_contents('php://input');
        if ($body === false) {
            return null;
        }
        try {
            $decoded = json_decode($body, true, 512, JSON_THROW_ON_ERROR);
        } catch (JsonException $exception) {
            return null;
        }

        return is_array($decoded) ? $decoded : null;
    }

    return $_POST;
}

function stringValue(array $data, string $key): string
{
    $value = $data[$key] ?? '';
    return is_string($value) || is_numeric($value) ? trim((string) $value) : '';
}

function textLength(string $value): int
{
    if (function_exists('mb_strlen')) {
        return mb_strlen($value, 'UTF-8');
    }

    $length = preg_match_all('/./us', $value);
    return $length === false ? strlen($value) : $length;
}

function diagnosticText(string $value, array $submittedValues = []): string
{
    foreach ($submittedValues as $submittedValue) {
        if (is_string($submittedValue) && $submittedValue !== '') {
            $value = str_ireplace($submittedValue, '[submitted value redacted]', $value);
        }
    }

    $value = preg_replace(
        '/\b(password|passwd|pwd|secret|token|authorization|cookie)\b(\s*[:=]\s*)(?:"[^"]*"|\'[^\']*\'|[^\s,;]+)/i',
        '$1$2[redacted]',
        $value
    ) ?? '[message redacted]';
    $value = preg_replace('/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i', '[email redacted]', $value) ?? '[message redacted]';
    $value = preg_replace('/(?<!\w)\+?\d[\d\s().-]{6,}\d(?!\w)/', '[number redacted]', $value) ?? '[message redacted]';
    return preg_replace('/\b[A-F0-9]{64}\b/i', '[reference redacted]', $value) ?? '[message redacted]';
}

function logRequestServerError(Throwable $exception, array $submittedValues): void
{
    try {
        $localAppData = getenv('LOCALAPPDATA');
        if ($localAppData === false || trim($localAppData) === '') {
            throw new RuntimeException('Local application-data path is unavailable.');
        }

        $localAppDataPath = realpath($localAppData);
        $projectRoot = realpath(dirname(__DIR__, 2));
        $documentRoot = isset($_SERVER['DOCUMENT_ROOT']) ? realpath($_SERVER['DOCUMENT_ROOT']) : false;
        if ($localAppDataPath === false || $projectRoot === false) {
            throw new RuntimeException('A diagnostic log path could not be resolved.');
        }

        $logDirectory = $localAppDataPath . DIRECTORY_SEPARATOR . 'GREENPAVERS' . DIRECTORY_SEPARATOR . 'logs';
        if (!is_dir($logDirectory) && !@mkdir($logDirectory, 0700, true) && !is_dir($logDirectory)) {
            throw new RuntimeException('The diagnostic log directory could not be created.');
        }
        if (is_link($logDirectory)) {
            throw new RuntimeException('The diagnostic log directory is not a regular directory.');
        }

        $resolvedLogDirectory = realpath($logDirectory);
        if ($resolvedLogDirectory === false) {
            throw new RuntimeException('The diagnostic log directory could not be resolved.');
        }

        $isWithin = static function (string $path, string $parent): bool {
            $path = strtolower(rtrim(str_replace('/', DIRECTORY_SEPARATOR, $path), DIRECTORY_SEPARATOR));
            $parent = strtolower(rtrim(str_replace('/', DIRECTORY_SEPARATOR, $parent), DIRECTORY_SEPARATOR));
            return $path === $parent || str_starts_with($path, $parent . DIRECTORY_SEPARATOR);
        };
        if (
            $isWithin($resolvedLogDirectory, $projectRoot)
            || ($documentRoot !== false && $isWithin($resolvedLogDirectory, $documentRoot))
        ) {
            throw new RuntimeException('The diagnostic log directory is inside a public document root.');
        }

        $trace = [];
        foreach ($exception->getTrace() as $frame) {
            $trace[] = [
                'file' => isset($frame['file']) ? diagnosticText((string) $frame['file']) : null,
                'line' => isset($frame['line']) ? (int) $frame['line'] : null,
                'class' => isset($frame['class']) ? (string) $frame['class'] : null,
                'type' => isset($frame['type']) ? (string) $frame['type'] : null,
                'function' => isset($frame['function']) ? (string) $frame['function'] : null,
            ];
        }

        $logFile = $resolvedLogDirectory . DIRECTORY_SEPARATOR . 'requests-api-errors.log';
        if (is_link($logFile)) {
            throw new RuntimeException('The diagnostic log file is not a regular file.');
        }

        $entry = [
            'time' => gmdate(DATE_ATOM),
            'exception_class' => get_class($exception),
            'message' => diagnosticText($exception->getMessage(), $submittedValues),
            'file' => diagnosticText($exception->getFile()),
            'line' => $exception->getLine(),
            'trace' => $trace,
        ];
        $encoded = json_encode($entry, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
        if ($encoded === false || @file_put_contents(
            $logFile,
            $encoded . PHP_EOL,
            FILE_APPEND | LOCK_EX
        ) === false) {
            throw new RuntimeException('The diagnostic log entry could not be written.');
        }
    } catch (Throwable $loggingException) {
        error_log('GREENPAVERS request diagnostic log write failed.');
    }
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['success' => false, 'code' => 'method_not_allowed', 'message' => 'This endpoint accepts POST requests only.', 'errors' => []]);
}

$data = readRequestData();
if ($data === null) {
    respond(400, [
        'success' => false,
        'code' => 'invalid_json',
        'message' => 'Send a valid JSON object or form submission.',
        'errors' => [],
    ]);
}
$fullName = stringValue($data, 'full_name');
$phone = stringValue($data, 'phone');
$email = stringValue($data, 'email');
$location = stringValue($data, 'location');
$productType = stringValue($data, 'product_type');
$quantity = stringValue($data, 'quantity');
$preferredColor = stringValue($data, 'preferred_color');
$deliveryChoice = stringValue($data, 'delivery_required');
$message = stringValue($data, 'message');

$errors = [];
if ($fullName === '' || textLength($fullName) > 120) {
    $errors['full_name'] = 'Enter your name (up to 120 characters).';
}
if (!preg_match('/^\+?[0-9][0-9\s().-]{6,19}$/', $phone)) {
    $errors['phone'] = 'Enter a valid phone number with at least 7 digits.';
} elseif (strlen(preg_replace('/\D/', '', $phone) ?? '') < 7) {
    $errors['phone'] = 'Enter a valid phone number with at least 7 digits.';
}
if ($email !== '' && (strlen($email) > 254 || filter_var($email, FILTER_VALIDATE_EMAIL) === false)) {
    $errors['email'] = 'Enter a valid email address or leave this field blank.';
}
if ($location === '' || textLength($location) > 180) {
    $errors['location'] = 'Enter a project location (up to 180 characters).';
}
if (!in_array($productType, ['interlocking', 'linear', 'landscape', 'hexagonal', 'square', 'decorative', 'unsure'], true)) {
    $errors['product_type'] = 'Choose a listed paver type.';
}
$quantityValue = preg_match('/^\d{1,7}$/D', $quantity) ? (int) $quantity : 0;
if ($quantityValue < 1 || $quantityValue > 1000000) {
    $errors['quantity'] = 'Enter a whole-number quantity from 1 to 1,000,000 pavers.';
}
if (!in_array($preferredColor, ['natural', 'charcoal', 'red', 'other'], true)) {
    $errors['preferred_color'] = 'Choose a preferred color.';
}
$deliveryValues = ['yes' => 'Yes', 'no' => 'No', 'unsure' => 'Not sure'];
if (!isset($deliveryValues[$deliveryChoice])) {
    $errors['delivery_required'] = 'Choose a delivery preference.';
}
if (textLength($message) > 5000) {
    $errors['message'] = 'Keep your message under 5,000 characters.';
}

if ($errors !== []) {
    respond(422, [
        'success' => false,
        'code' => 'validation_error',
        'message' => 'Please check the highlighted fields and try again.',
        'errors' => $errors,
    ]);
}

$colorLabels = [
    'natural' => 'Natural',
    'charcoal' => 'Charcoal',
    'red' => 'Red / clay',
    'other' => 'Other / unsure',
];

$requestValues = [
    'full_name' => $fullName,
    'phone' => $phone,
    'email' => $email === '' ? null : $email,
    'location' => $location,
    'product_type' => $productType,
    'quantity' => $quantity,
    'preferred_color' => $colorLabels[$preferredColor],
    'delivery_required' => $deliveryValues[$deliveryChoice],
    'message' => $message === '' ? null : $message,
    'status' => 'Pending',
];

try {
    require_once __DIR__ . '/../config/database.php';
    $pdo = greenpaveDatabase();
    $trackingReference = strtoupper(bin2hex(random_bytes(32)));
    try {
        $statement = $pdo->prepare(
            'INSERT INTO requests (full_name, phone, email, location, product_type, quantity, preferred_color, delivery_required, message, status, tracking_token_hash)
             VALUES (:full_name, :phone, :email, :location, :product_type, :quantity, :preferred_color, :delivery_required, :message, :status, :tracking_token_hash)'
        );
        $statement->execute($requestValues + [
            'tracking_token_hash' => hash('sha256', $trackingReference),
        ]);
    } catch (PDOException $exception) {
        $errorInfo = $exception->errorInfo;
        $isMissingTrackingColumn = is_array($errorInfo)
            && ($errorInfo[0] ?? null) === '42S22'
            && (int) ($errorInfo[1] ?? 0) === 1054;
        if (!$isMissingTrackingColumn) {
            throw $exception;
        }

        $trackingReference = null;
        $statement = $pdo->prepare(
            'INSERT INTO requests (full_name, phone, email, location, product_type, quantity, preferred_color, delivery_required, message, status)
             VALUES (:full_name, :phone, :email, :location, :product_type, :quantity, :preferred_color, :delivery_required, :message, :status)'
        );
        $statement->execute($requestValues);
        error_log('GREENPAVERS request API: tracking migration absent; saved request without a tracking reference.');
    }

    respond(201, [
        'success' => true,
        'code' => 'request_saved',
        'message' => 'Your request has been received. GREENPAVERS will review the details.',
        'request_id' => (int) $pdo->lastInsertId(),
        'tracking_reference' => $trackingReference,
    ]);
} catch (PDOException $exception) {
    $errorInfo = $exception->errorInfo;
    $sqlState = is_array($errorInfo) && is_string($errorInfo[0] ?? null)
        ? $errorInfo[0]
        : (string) $exception->getCode();
    $driverCode = is_array($errorInfo) && isset($errorInfo[1]) && is_scalar($errorInfo[1])
        ? (string) $errorInfo[1]
        : 'unavailable';
    error_log(sprintf('GREENPAVERS request database error (SQLSTATE %s, driver code %s).', $sqlState, $driverCode));
    respond(503, [
        'success' => false,
        'code' => 'database_unavailable',
        'message' => 'We could not save your request right now. Please try again later.',
        'errors' => [],
    ]);
} catch (Throwable $exception) {
    logRequestServerError($exception, [$fullName, $phone, $email, $location, $message]);
    respond(500, [
        'success' => false,
        'code' => 'server_error',
        'message' => 'Something went wrong. Please try again later.',
        'errors' => [],
    ]);
}