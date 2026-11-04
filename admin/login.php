<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/../backend/config/database.php';

if (adminCurrentUser() !== null) {
    header('Location: dashboard.php', true, 303);
    exit;
}

$error = '';
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    $rawEmail = $_POST['email'] ?? '';
    $email = is_string($rawEmail) ? strtolower(trim($rawEmail)) : '';
    $password = is_string($_POST['password'] ?? null) ? $_POST['password'] : '';

    if (!adminVerifyCsrf($_POST['csrf_token'] ?? null)) {
        $error = 'Your login session expired. Refresh the page and try again.';
    } elseif (filter_var($email, FILTER_VALIDATE_EMAIL) === false || strlen($email) > 254 || $password === '' || strlen($password) > 72) {
        $error = 'Email or password is incorrect.';
    } else {
        try {
            $pdo = greenpaveDatabase();
            $hasRoleSchema = adminHasRoleSchema($pdo);
            $statement = $pdo->prepare($hasRoleSchema
                ? 'SELECT id, full_name, email, password_hash, role, is_active
                   FROM admins WHERE email = :email LIMIT 1'
                : 'SELECT id, full_name, email, password_hash
                   FROM admins WHERE email = :email LIMIT 1'
            );
            $statement->execute(['email' => $email]);
            $admin = $statement->fetch();
            if ($admin && !$hasRoleSchema) {
                $admin['role'] = 'admin';
                $admin['is_active'] = 1;
            }

            if ($admin && (int) $admin['is_active'] === 1 && password_verify($password, $admin['password_hash'])) {
                session_regenerate_id(true);
                $_SESSION['admin'] = [
                    'id' => (int) $admin['id'],
                    'full_name' => $admin['full_name'],
                    'email' => $admin['email'],
                    'role' => $admin['role'],
                ];
                $_SESSION['admin_csrf'] = bin2hex(random_bytes(32));
                header('Location: dashboard.php', true, 303);
                exit;
            }

            $error = 'Email or password is incorrect.';
        } catch (Throwable $exception) {
            error_log('GREENPAVERS admin login failed: ' . $exception->getMessage());
            $error = 'Sign-in is temporarily unavailable. Please try again later.';
        }
    }
}

$loggedOut = ($_GET['logged_out'] ?? '') === '1';
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>Admin sign in | GREENPAVERS</title>
  <link rel="stylesheet" href="assets/admin.css">
</head>
<body class="login-body">
  <main class="login-layout">
    <section class="login-story">
      <a class="admin-brand login-brand" href="../customer/" aria-label="GREENPAVERS public website"><span class="admin-brand-mark" aria-hidden="true">G</span><span>GREEN<span>PAVERS</span><small>ADMINISTRATION</small></span></a>
      <p class="login-eyebrow">PAVERS / CUSTOMER REQUESTS</p>
      <h1>Manage<br><em>paver requests.</em></h1>
      <p>Review customer paver requests and update their status.</p>
      <span class="login-index">GREENPAVERS / INTERNAL</span>
    </section>
    <section class="login-panel" aria-labelledby="login-title">
      <div class="login-panel-top"><span>ADMIN ACCESS</span><span>01 / SIGN IN</span></div>
      <h2 id="login-title">Welcome back.</h2>
      <p class="login-description">Sign in with your administrator account.</p>
      <?php if ($loggedOut): ?><p class="notice notice-success" role="status">You have signed out.</p><?php endif; ?>
      <?php if ($error !== ''): ?><p class="notice notice-error" role="alert"><?= adminEscape($error) ?></p><?php endif; ?>
      <form class="login-form" action="login.php" method="post">
        <input type="hidden" name="csrf_token" value="<?= adminEscape(adminCsrfToken()) ?>">
        <label for="email">Email address</label>
        <input id="email" name="email" type="email" autocomplete="username" maxlength="254" required value="<?= adminEscape($_POST['email'] ?? '') ?>">
        <label for="password">Password</label>
        <input id="password" name="password" type="password" autocomplete="current-password" maxlength="200" required>
        <button class="admin-button button-primary" type="submit">Sign in <span aria-hidden="true">↗</span></button>
      </form>
      <a class="login-back" href="../customer/">← Back to GREENPAVERS</a>
    </section>
  </main>
</body>
</html>