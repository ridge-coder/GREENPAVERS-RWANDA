<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/provision-first-admin.php';

header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: same-origin');

$environment = strtolower(trim(getenv('GREENPAVE_ENV') ?: ''));
$setupEnabled = getenv('GREENPAVE_ADMIN_SETUP_ENABLED') === '1';
$isLoopback = in_array($_SERVER['REMOTE_ADDR'] ?? '', ['127.0.0.1', '::1'], true);

if ($environment !== 'local' || !$setupEnabled || !$isLoopback) {
    http_response_code(404);
    exit('Not found.');
}

$error = '';
$success = false;
$pdo = null;
$adminExists = false;
try {
    $pdo = greenpaveDatabase();
    $adminExists = $pdo->query('SELECT id FROM admins ORDER BY id LIMIT 1')->fetchColumn() !== false;
} catch (Throwable) {
    http_response_code(503);
    $error = 'Setup is temporarily unavailable. Check the local database connection and try again.';
}

if ($pdo instanceof PDO && !$adminExists && ($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    $rawName = $_POST['full_name'] ?? '';
    $rawEmail = $_POST['email'] ?? '';
    $password = is_string($_POST['password'] ?? null) ? $_POST['password'] : '';
    $passwordConfirmation = is_string($_POST['password_confirmation'] ?? null) ? $_POST['password_confirmation'] : '';
    $fullName = is_string($rawName) ? trim($rawName) : '';
    $email = is_string($rawEmail) ? strtolower(trim($rawEmail)) : '';

    if (!adminVerifyCsrf($_POST['csrf_token'] ?? null)) {
        $error = 'Your setup session expired. Refresh the page and try again.';
    } elseif ($fullName === '' || setupTextLength($fullName) > 120) {
        $error = 'Enter your full name using no more than 120 characters.';
    } elseif ($email === '' || strlen($email) > 254 || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
        $error = 'Enter a valid email address.';
    } elseif (setupTextLength($password) < 12 || strlen($password) > 72) {
        $error = 'Choose a password of at least 12 characters and no more than 72 bytes.';
    } elseif (!hash_equals($password, $passwordConfirmation)) {
        $error = 'The password confirmation does not match.';
    } else {
        try {
            setupCreateFirstAdmin($pdo, $fullName, $email, $password);
            $success = true;
            $adminExists = true;
        } catch (InvalidArgumentException $exception) {
            $error = $exception->getMessage();
        } catch (RuntimeException $exception) {
            $error = $exception->getMessage() === 'An administrator already exists. No account was changed.'
                ? 'Initial setup is closed because an administrator already exists. Use the owner-approved account recovery procedure.'
                : 'Setup could not be completed. Please check the database configuration and try again.';
        } catch (Throwable) {
            $error = 'Setup could not be completed. Please check the database configuration and try again.';
        } finally {
            $password = '';
            $passwordConfirmation = '';
        }
    }
}
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>First-time admin setup | GREENPAVERS</title>
  <link rel="stylesheet" href="assets/admin.css">
</head>
<body class="login-body">
  <main class="login-layout setup-layout">
    <section class="login-story">
      <a class="admin-brand login-brand" href="../customer/" aria-label="GREENPAVERS public website"><span class="admin-brand-mark" aria-hidden="true">G</span><span>GREEN<span>PAVERS</span><small>ADMINISTRATION</small></span></a>
      <p class="login-eyebrow">OWNER-ONLY / LOCAL SETUP</p>
      <h1>Create the<br><em>first admin.</em></h1>
      <p>This local setup is available only while the admin table is empty. It closes automatically after the first account is created.</p>
      <span class="login-index">GREENPAVERS / INTERNAL</span>
    </section>
    <section class="login-panel" aria-labelledby="setup-title">
      <div class="login-panel-top"><span>ADMIN ACCESS</span><span>01 / INITIAL SETUP</span></div>
      <?php if ($success): ?>
        <h2 id="setup-title">Setup complete.</h2>
        <p class="login-description">Your administrator account has been created. Sign in to continue.</p>
        <p class="notice notice-success" role="status">The first admin account is ready.</p>
        <a class="admin-button button-primary setup-login-link" href="login.php">Go to admin sign in <span aria-hidden="true">↗</span></a>
      <?php elseif ($adminExists): ?>
        <h2 id="setup-title">Setup is closed.</h2>
        <p class="login-description">An administrator already exists. This page cannot add, reset, or replace an account.</p>
        <p class="notice notice-info" role="status">Ask the website owner to use the approved account-recovery procedure.</p>
        <a class="login-back" href="login.php">Go to admin sign in</a>
      <?php else: ?>
        <h2 id="setup-title">Create your account.</h2>
        <p class="login-description">Choose credentials for the authorized website owner. Passwords are hidden and must be at least 12 characters.</p>
        <?php if ($error !== ''): ?><p class="notice notice-error" role="alert"><?= adminEscape($error) ?></p><?php endif; ?>
        <form class="login-form" action="setup.php" method="post" autocomplete="off">
          <input type="hidden" name="csrf_token" value="<?= adminEscape(adminCsrfToken()) ?>">
          <label for="full-name">Full name</label>
          <input id="full-name" name="full_name" type="text" autocomplete="name" maxlength="120" required value="<?= adminEscape($_POST['full_name'] ?? '') ?>">
          <label for="email">Email address</label>
          <input id="email" name="email" type="email" autocomplete="email" maxlength="254" required value="<?= adminEscape($_POST['email'] ?? '') ?>">
          <label for="password">Choose password</label>
          <input id="password" name="password" type="password" autocomplete="new-password" minlength="12" maxlength="72" required>
          <label for="password-confirmation">Confirm password</label>
          <input id="password-confirmation" name="password_confirmation" type="password" autocomplete="new-password" minlength="12" maxlength="72" required>
          <button class="admin-button button-primary" type="submit">Create first admin <span aria-hidden="true">↗</span></button>
        </form>
        <a class="login-back" href="login.php">Back to admin sign in</a>
      <?php endif; ?>
    </section>
  </main>
</body>
</html>
