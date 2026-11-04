<?php
declare(strict_types=1);

require_once __DIR__ . '/../backend/config/database.php';

function setupTextLength(string $value): int
{
    if (function_exists('mb_strlen')) {
        return mb_strlen($value, 'UTF-8');
    }

    $length = preg_match_all('/./us', $value);
    return $length === false ? strlen($value) : $length;
}

function setupReadLine(string $prompt): string
{
    fwrite(STDOUT, $prompt);
    $value = fgets(STDIN);
    if ($value === false) {
        throw new RuntimeException('Input ended before setup was complete.');
    }

    return trim($value);
}

function setupReadSecret(string $prompt): string
{
    if (PHP_OS_FAMILY === 'Windows') {
        $script = '$secure = Read-Host -Prompt "' . str_replace('"', '""', $prompt)
            . '" -AsSecureString; $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure); '
            . 'try { [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new(); '
            . '[Console]::Out.Write([Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)) } '
            . 'finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer) }';
        $process = proc_open(
            ['powershell.exe', '-NoProfile', '-Command', $script],
            [0 => STDIN, 1 => ['pipe', 'w'], 2 => STDERR],
            $pipes,
            null,
            null,
            ['bypass_shell' => true]
        );
        if (!is_resource($process)) {
            throw new RuntimeException('Could not start PowerShell for hidden password input.');
        }

        $secret = stream_get_contents($pipes[1]);
        fclose($pipes[1]);
        $exitCode = proc_close($process);
        if ($secret === false || $exitCode !== 0) {
            throw new RuntimeException('Hidden password input failed.');
        }

        return rtrim($secret, "\r\n");
    }

    exec('stty -echo 2>/dev/null', $output, $exitCode);
    if ($exitCode !== 0) {
        throw new RuntimeException('Hidden password input requires an interactive terminal.');
    }

    try {
        fwrite(STDOUT, $prompt);
        $secret = fgets(STDIN);
        if ($secret === false) {
            throw new RuntimeException('Input ended before setup was complete.');
        }

        return rtrim($secret, "\r\n");
    } finally {
        exec('stty echo 2>/dev/null', $output, $restoreExitCode);
        fwrite(STDOUT, PHP_EOL);
        if ($restoreExitCode !== 0) {
            throw new RuntimeException('Could not restore terminal input after password entry.');
        }
    }
}

function setupCreateFirstAdmin(PDO $pdo, string $fullName, string $email, string $password): void
{
    if ($fullName === '' || setupTextLength($fullName) > 120) {
        throw new InvalidArgumentException('Enter an administrator name of no more than 120 characters.');
    }
    if (strlen($email) > 254 || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
        throw new InvalidArgumentException('Enter a valid administrator email address.');
    }
    if (setupTextLength($password) < 12 || strlen($password) > 72) {
        throw new InvalidArgumentException('Choose a password of at least 12 characters and no more than 72 bytes.');
    }

    $lockName = 'gp_first_admin_' . substr(hash('sha256', (string) getenv('GREENPAVE_DB_NAME')), 0, 47);
    $lock = $pdo->prepare('SELECT GET_LOCK(:lock_name, 0)');
    $lock->execute(['lock_name' => $lockName]);
    if ((int) $lock->fetchColumn() !== 1) {
        throw new RuntimeException('Another first-admin setup is already running for this database.');
    }

    try {
        $pdo->beginTransaction();
        $existingAdmin = $pdo->query('SELECT id FROM admins ORDER BY id LIMIT 1 FOR UPDATE')->fetchColumn();
        if ($existingAdmin !== false) {
            $pdo->rollBack();
            throw new RuntimeException('An administrator already exists. No account was changed.');
        }

        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        if ($passwordHash === false) {
            throw new RuntimeException('PHP could not hash the password.');
        }

        $insert = $pdo->prepare(
            'INSERT INTO admins (full_name, email, password_hash, role, is_active)
             VALUES (:full_name, :email, :password_hash, :role, 1)'
        );
        $insert->execute([
            'full_name' => $fullName,
            'email' => $email,
            'password_hash' => $passwordHash,
            'role' => 'owner',
        ]);
        $pdo->commit();
    } catch (Throwable $exception) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        throw $exception;
    } finally {
        $release = $pdo->prepare('SELECT RELEASE_LOCK(:lock_name)');
        $release->execute(['lock_name' => $lockName]);
    }
}

function runFirstAdminSetup(): int
{
    if (PHP_SAPI !== 'cli') {
        http_response_code(404);
        return 1;
    }

    $databaseName = getenv('GREENPAVE_DB_NAME');
    if ($databaseName === false || $databaseName === '' || !preg_match('/^[A-Za-z0-9_]{1,64}$/', $databaseName)) {
        fwrite(STDERR, "Set GREENPAVE_DB_NAME explicitly to the intended database before running setup.\n");
        return 1;
    }

    fwrite(STDOUT, "Target database: {$databaseName}\n");
    $confirmation = setupReadLine('Type the database name exactly to continue: ');
    if (!hash_equals($databaseName, $confirmation)) {
        fwrite(STDERR, "Database name did not match. No account was created.\n");
        return 1;
    }

    try {
        $pdo = greenpaveDatabase();
        $existingAdmin = $pdo->query('SELECT id FROM admins ORDER BY id LIMIT 1')->fetchColumn();
        if ($existingAdmin !== false) {
            throw new RuntimeException('An administrator already exists. No account was changed.');
        }

        $fullName = setupReadLine('Administrator full name: ');
        $email = strtolower(setupReadLine('Administrator email: '));
        $password = setupReadSecret('Choose a password (12-72 bytes; input hidden): ');
        $confirmationPassword = setupReadSecret('Confirm the password (input hidden): ');
        if (!hash_equals($password, $confirmationPassword)) {
            throw new InvalidArgumentException('Passwords did not match. No account was created.');
        }

        setupCreateFirstAdmin($pdo, $fullName, $email, $password);
        $password = '';
        $confirmationPassword = '';
        fwrite(STDOUT, "First administrator created successfully. Sign in at /admin/login.php.\n");
        return 0;
    } catch (Throwable $exception) {
        fwrite(STDERR, 'First-admin setup failed: ' . $exception->getMessage() . PHP_EOL);
        return 1;
    } finally {
        if (isset($password)) {
            $password = '';
        }
        if (isset($confirmationPassword)) {
            $confirmationPassword = '';
        }
    }
}

if (realpath($_SERVER['SCRIPT_FILENAME'] ?? '') === __FILE__) {
    exit(runFirstAdminSetup());
}
