<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/auth.php';
$admin = adminRequireOwner();
require_once __DIR__ . '/includes/layout.php';
require_once __DIR__ . '/../backend/config/database.php';

$error = '';
$success = '';
$createValues = ($_POST['action'] ?? '') === 'create' ? $_POST : [];
try {
    $pdo = greenpaveDatabase();
} catch (Throwable $exception) {
    error_log('GREENPAVERS admin account database connection failed: ' . $exception->getMessage());
    http_response_code(503);
    exit('Administrator accounts are temporarily unavailable.');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    $action = is_string($_POST['action'] ?? null) ? $_POST['action'] : '';
    if (!adminVerifyCsrf($_POST['csrf_token'] ?? null)) {
        $error = 'This account change could not be verified. Refresh the page and try again.';
    } elseif ($action === 'create') {
        $fullName = is_string($_POST['full_name'] ?? null) ? trim($_POST['full_name']) : '';
        $email = is_string($_POST['email'] ?? null) ? strtolower(trim($_POST['email'])) : '';
        $role = is_string($_POST['role'] ?? null) ? $_POST['role'] : '';
        $password = is_string($_POST['password'] ?? null) ? $_POST['password'] : '';
        $passwordConfirmation = is_string($_POST['password_confirmation'] ?? null)
            ? $_POST['password_confirmation']
            : '';

        if ($fullName === '' || adminTextLength($fullName) > 120) {
            $error = 'Enter a name using no more than 120 characters.';
        } elseif (strlen($email) > 254 || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
            $error = 'Enter a valid email address.';
        } elseif (!in_array($role, GREENPAVE_ADMIN_ROLES, true)) {
            $error = 'Choose an available administrator role.';
        } elseif (adminTextLength($password) < 12 || strlen($password) > 72) {
            $error = 'Choose a password of at least 12 characters and no more than 72 bytes.';
        } elseif (!hash_equals($password, $passwordConfirmation)) {
            $error = 'The password confirmation does not match.';
        } else {
            try {
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
                    'role' => $role,
                ]);
                $success = 'Administrator account created.';
            } catch (PDOException $exception) {
                error_log('GREENPAVERS admin account creation failed: ' . $exception->getMessage());
                $error = $exception->getCode() === '23000'
                    ? 'An administrator account already uses that email address.'
                    : 'The account could not be created right now. Please try again later.';
            } catch (Throwable $exception) {
                error_log('GREENPAVERS admin account creation failed: ' . $exception->getMessage());
                $error = 'The account could not be created right now. Please try again later.';
            } finally {
                $password = '';
                $passwordConfirmation = '';
            }
        }
    } elseif ($action === 'update') {
        $id = filter_var($_POST['id'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
        $fullName = is_string($_POST['full_name'] ?? null) ? trim($_POST['full_name']) : '';
        $email = is_string($_POST['email'] ?? null) ? strtolower(trim($_POST['email'])) : '';
        $role = is_string($_POST['role'] ?? null) ? $_POST['role'] : '';
        $isActive = ($_POST['is_active'] ?? '') === '1';

        if ($id === false || $id === null) {
            $error = 'Choose a valid administrator account.';
        } elseif ($fullName === '' || adminTextLength($fullName) > 120) {
            $error = 'Enter a name using no more than 120 characters.';
        } elseif (strlen($email) > 254 || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
            $error = 'Enter a valid email address.';
        } elseif (!in_array($role, GREENPAVE_ADMIN_ROLES, true)) {
            $error = 'Choose an available administrator role.';
        } else {
            try {
                $pdo->beginTransaction();
                $targetQuery = $pdo->prepare('SELECT id, role, is_active FROM admins WHERE id = :id FOR UPDATE');
                $targetQuery->execute(['id' => $id]);
                $target = $targetQuery->fetch();
                if (!$target) {
                    throw new RuntimeException('Administrator account not found.');
                }

                if (
                    $target['role'] === 'owner'
                    && (int) $target['is_active'] === 1
                    && ($role !== 'owner' || !$isActive)
                ) {
                    $activeOwners = $pdo->query(
                        "SELECT id FROM admins WHERE role = 'owner' AND is_active = 1 FOR UPDATE"
                    )->fetchAll();
                    if (count($activeOwners) <= 1) {
                        throw new RuntimeException('The last active owner cannot be demoted or deactivated.');
                    }
                }

                $update = $pdo->prepare(
                    'UPDATE admins SET full_name = :full_name, email = :email, role = :role, is_active = :is_active
                     WHERE id = :id'
                );
                $update->execute([
                    'full_name' => $fullName,
                    'email' => $email,
                    'role' => $role,
                    'is_active' => $isActive ? 1 : 0,
                    'id' => $id,
                ]);
                $pdo->commit();
                $success = 'Administrator account updated.';
                if ((int) $id === (int) $admin['id'] && !$isActive) {
                    adminDestroySession();
                    header('Location: login.php?logged_out=1', true, 303);
                    exit;
                }
            } catch (PDOException $exception) {
                if ($pdo->inTransaction()) {
                    $pdo->rollBack();
                }
                error_log('GREENPAVERS admin account update failed: ' . $exception->getMessage());
                $error = $exception->getCode() === '23000'
                    ? 'An administrator account already uses that email address.'
                    : 'The account could not be updated right now. Please try again later.';
            } catch (Throwable $exception) {
                if ($pdo->inTransaction()) {
                    $pdo->rollBack();
                }
                $error = $exception->getMessage() === 'The last active owner cannot be demoted or deactivated.'
                    || $exception->getMessage() === 'Administrator account not found.'
                    ? $exception->getMessage()
                    : 'The account could not be updated right now. Please try again later.';
            }
        }
    } else {
        $error = 'Choose a valid account action.';
    }
}

try {
    $accounts = $pdo->query(
        'SELECT id, full_name, email, role, is_active, created_at
         FROM admins ORDER BY role, full_name, id'
    )->fetchAll();
} catch (Throwable $exception) {
    error_log('GREENPAVERS admin account list failed: ' . $exception->getMessage());
    http_response_code(503);
    $accounts = [];
    $error = 'Administrator accounts are temporarily unavailable.';
}

adminPageStart('Admin accounts', 'accounts');
?>
      <section class="page-intro account-intro">
        <div><p class="eyebrow">ACCESS / PERMISSIONS</p><h2>Administrator accounts.</h2><p>Only active owners can manage accounts and assign roles. Passwords and password hashes are never displayed.</p></div>
      </section>
      <?php if ($error !== ''): ?><p class="notice notice-error" role="alert"><?= adminEscape($error) ?></p><?php endif; ?>
      <?php if ($success !== ''): ?><p class="notice notice-success" role="status"><?= adminEscape($success) ?></p><?php endif; ?>
      <section class="panel account-create-panel">
        <div class="panel-heading"><div><p class="eyebrow">NEW ACCESS</p><h2>Create administrator</h2></div></div>
        <form class="account-form" action="accounts.php" method="post" autocomplete="off">
          <input type="hidden" name="csrf_token" value="<?= adminEscape(adminCsrfToken()) ?>">
          <input type="hidden" name="action" value="create">
          <label>Full name<input name="full_name" maxlength="120" required value="<?= adminEscape($createValues['full_name'] ?? '') ?>"></label>
          <label>Email address<input name="email" type="email" maxlength="254" required value="<?= adminEscape($createValues['email'] ?? '') ?>"></label>
          <label>Role<select name="role" required><option value="admin">Administrator</option><option value="owner">Owner</option></select></label>
          <label>Password<input name="password" type="password" minlength="12" maxlength="72" autocomplete="new-password" required></label>
          <label>Confirm password<input name="password_confirmation" type="password" minlength="12" maxlength="72" autocomplete="new-password" required></label>
          <button class="admin-button button-dark" type="submit">Create account <span aria-hidden="true">↗</span></button>
        </form>
      </section>
      <section class="account-list" aria-label="Existing administrator accounts">
        <?php if ($accounts === []): ?>
          <section class="panel empty-state"><h2>No administrator accounts are available.</h2></section>
        <?php else: foreach ($accounts as $account): ?>
          <article class="panel account-card">
            <div class="account-card-heading">
              <div><p class="eyebrow">ACCOUNT / #<?= adminEscape($account['id']) ?></p><h2><?= adminEscape($account['full_name']) ?></h2><p><?= adminEscape($account['email']) ?></p></div>
              <span class="status-badge <?= $account['role'] === 'owner' ? 'status-confirmed' : '' ?>"><?= adminEscape(ucfirst($account['role'])) ?> · <?= (int) $account['is_active'] === 1 ? 'Active' : 'Inactive' ?></span>
            </div>
            <form class="account-form account-edit-form" action="accounts.php" method="post" autocomplete="off">
              <input type="hidden" name="csrf_token" value="<?= adminEscape(adminCsrfToken()) ?>">
              <input type="hidden" name="action" value="update">
              <input type="hidden" name="id" value="<?= adminEscape($account['id']) ?>">
              <label>Full name<input name="full_name" maxlength="120" required value="<?= adminEscape($account['full_name']) ?>"></label>
              <label>Email address<input name="email" type="email" maxlength="254" required value="<?= adminEscape($account['email']) ?>"></label>
              <label>Role<select name="role" required><?php foreach (GREENPAVE_ADMIN_ROLES as $role): ?><option value="<?= adminEscape($role) ?>" <?= $account['role'] === $role ? 'selected' : '' ?>><?= adminEscape(ucfirst($role)) ?></option><?php endforeach; ?></select></label>
              <label class="account-active"><input type="checkbox" name="is_active" value="1" <?= (int) $account['is_active'] === 1 ? 'checked' : '' ?>> Active</label>
              <button class="admin-button button-dark" type="submit">Save account</button>
            </form>
          </article>
        <?php endforeach; endif; ?>
      </section>
<?php adminPageEnd(); ?>
