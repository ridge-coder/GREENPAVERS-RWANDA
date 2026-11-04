<?php
declare(strict_types=1);

const GREENPAVE_ADMIN_STATUSES = [
    'Pending',
    'Confirmed',
    'In Production',
    'Ready',
    'Completed',
    'Cancelled',
];

const GREENPAVE_ADMIN_ROLES = [
    'owner',
    'admin',
];

function adminStartSession(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    ini_set('session.use_strict_mode', '1');
    ini_set('session.use_only_cookies', '1');
    session_name('GREENPAVE_ADMIN_SESSION');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
    session_start();

    if (!isset($_SESSION['admin_csrf'])) {
        $_SESSION['admin_csrf'] = bin2hex(random_bytes(32));
    }
}

adminStartSession();

function adminEscape(mixed $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function adminTextLength(string $value): int
{
    if (function_exists('mb_strlen')) {
        return mb_strlen($value, 'UTF-8');
    }

    $length = preg_match_all('/./us', $value);
    return $length === false ? strlen($value) : $length;
}

function adminCsrfToken(): string
{
    if (!isset($_SESSION['admin_csrf'])) {
        $_SESSION['admin_csrf'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['admin_csrf'];
}

function adminVerifyCsrf(mixed $token): bool
{
    return is_string($token)
        && isset($_SESSION['admin_csrf'])
        && hash_equals($_SESSION['admin_csrf'], $token);
}

function adminHasRoleSchema(PDO $pdo): bool
{
    $columns = $pdo->query('SHOW COLUMNS FROM admins')->fetchAll(PDO::FETCH_COLUMN);
    $hasRole = in_array('role', $columns, true);
    $hasActive = in_array('is_active', $columns, true);

    if ($hasRole !== $hasActive) {
        throw new RuntimeException('The administrator role schema is incomplete.');
    }

    return $hasRole;
}

function adminCurrentUser(): ?array
{
    return isset($_SESSION['admin']) && is_array($_SESSION['admin'])
        ? $_SESSION['admin']
        : null;
}

function adminRequireAuth(): array
{
    $admin = adminCurrentUser();
    if ($admin === null) {
        header('Location: login.php', true, 303);
        exit;
    }

    require_once __DIR__ . '/../../backend/config/database.php';
    try {
        $pdo = greenpaveDatabase();
        $hasRoleSchema = adminHasRoleSchema($pdo);
        $statement = $pdo->prepare($hasRoleSchema
            ? 'SELECT id, full_name, email, role, is_active FROM admins WHERE id = :id LIMIT 1'
            : 'SELECT id, full_name, email FROM admins WHERE id = :id LIMIT 1'
        );
        $statement->execute(['id' => (int) ($admin['id'] ?? 0)]);
        $currentAdmin = $statement->fetch();
        if ($currentAdmin && !$hasRoleSchema) {
            $currentAdmin['role'] = 'admin';
            $currentAdmin['is_active'] = 1;
        }
    } catch (Throwable $exception) {
        error_log('GREENPAVERS admin authorization lookup failed: ' . $exception->getMessage());
        http_response_code(503);
        exit('Administrator access is temporarily unavailable.');
    }

    if (!$currentAdmin || (int) $currentAdmin['is_active'] !== 1) {
        adminDestroySession();
        header('Location: login.php', true, 303);
        exit;
    }

    $_SESSION['admin'] = [
        'id' => (int) $currentAdmin['id'],
        'full_name' => $currentAdmin['full_name'],
        'email' => $currentAdmin['email'],
        'role' => $currentAdmin['role'],
    ];

    return $_SESSION['admin'];
}

function adminRequireOwner(): array
{
    $admin = adminRequireAuth();
    if (($admin['role'] ?? '') !== 'owner') {
        http_response_code(403);
        exit('You are not authorized to manage administrator accounts.');
    }

    return $admin;
}

function adminDestroySession(): void
{
    $_SESSION = [];
    $cookie = session_get_cookie_params();
    setcookie(session_name(), '', [
        'expires' => time() - 42000,
        'path' => $cookie['path'] ?: '/',
        'secure' => (bool) $cookie['secure'],
        'httponly' => (bool) $cookie['httponly'],
        'samesite' => $cookie['samesite'] ?: 'Strict',
    ]);
    session_destroy();
}

function adminStatusClass(string $status): string
{
    $classes = [
        'Pending' => 'pending',
        'Confirmed' => 'confirmed',
        'In Production' => 'production',
        'Ready' => 'ready',
        'Completed' => 'completed',
        'Cancelled' => 'cancelled',
    ];

    return $classes[$status] ?? 'unknown';
}