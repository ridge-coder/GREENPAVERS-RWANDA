<?php
declare(strict_types=1);

require_once __DIR__ . '/provision-first-admin.php';

function runFirstOwnerBootstrap(): int
{
    if (PHP_SAPI !== 'cli') {
        http_response_code(404);
        return 1;
    }
    if (getenv('GREENPAVE_OWNER_BOOTSTRAP_ENABLED') !== '1') {
        fwrite(STDERR, "Set GREENPAVE_OWNER_BOOTSTRAP_ENABLED=1 explicitly before continuing.\n");
        return 1;
    }

    $configuredOwnerEmail = getenv('GREENPAVE_INITIAL_OWNER_EMAIL');
    if (
        $configuredOwnerEmail === false
        || filter_var(strtolower(trim($configuredOwnerEmail)), FILTER_VALIDATE_EMAIL) === false
    ) {
        fwrite(STDERR, "Set GREENPAVE_INITIAL_OWNER_EMAIL to the owner-approved existing account email.\n");
        return 1;
    }
    $configuredOwnerEmail = strtolower(trim($configuredOwnerEmail));

    $databaseName = getenv('GREENPAVE_DB_NAME');
    if ($databaseName === false || $databaseName === '' || !preg_match('/^[A-Za-z0-9_]{1,64}$/', $databaseName)) {
        fwrite(STDERR, "Set GREENPAVE_DB_NAME explicitly to the intended database before running setup.\n");
        return 1;
    }

    fwrite(STDOUT, "Target database: {$databaseName}\n");
    if (!hash_equals($databaseName, setupReadLine('Type the database name exactly to continue: '))) {
        fwrite(STDERR, "Database name did not match. No account was changed.\n");
        return 1;
    }

    $email = strtolower(setupReadLine('Existing administrator email: '));
    if (!hash_equals($configuredOwnerEmail, $email)) {
        fwrite(STDERR, "The account email does not match the configured owner-approved address. No account was changed.\n");
        return 1;
    }
    $password = setupReadSecret('Enter that administrator password (input hidden): ');
    try {
        $pdo = greenpaveDatabase();
        $pdo->beginTransaction();
        $statement = $pdo->prepare(
            'SELECT id, password_hash, role, is_active FROM admins WHERE email = :email LIMIT 1 FOR UPDATE'
        );
        $statement->execute(['email' => $email]);
        $admin = $statement->fetch();
        if (!$admin || (int) $admin['is_active'] !== 1 || !password_verify($password, $admin['password_hash'])) {
            throw new RuntimeException('The active administrator could not be verified. No account was changed.');
        }
        if ($admin['role'] === 'owner') {
            $pdo->commit();
            fwrite(STDOUT, "This administrator is already an owner. No account was changed.\n");
            return 0;
        }

        $pdo->query("SELECT id FROM admins WHERE role = 'owner' AND is_active = 1 FOR UPDATE")->fetchAll();
        $update = $pdo->prepare("UPDATE admins SET role = 'owner' WHERE id = :id AND is_active = 1");
        $update->execute(['id' => (int) $admin['id']]);
        $pdo->commit();
        fwrite(STDOUT, "The verified administrator was explicitly designated as the first owner.\n");
        return 0;
    } catch (Throwable $exception) {
        if (isset($pdo) && $pdo instanceof PDO && $pdo->inTransaction()) {
            $pdo->rollBack();
        }
        fwrite(STDERR, 'Owner setup failed: ' . $exception->getMessage() . PHP_EOL);
        return 1;
    } finally {
        $password = '';
    }
}

if (realpath($_SERVER['SCRIPT_FILENAME'] ?? '') === __FILE__) {
    exit(runFirstOwnerBootstrap());
}
