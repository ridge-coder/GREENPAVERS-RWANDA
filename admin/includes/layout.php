<?php
declare(strict_types=1);

require_once __DIR__ . '/auth.php';

function adminPageStart(string $title, string $activePage): void
{
    $admin = adminCurrentUser();
    ?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title><?= adminEscape($title) ?> | GREENPAVERS Admin</title>
  <link rel="stylesheet" href="assets/admin.css">
</head>
<body class="admin-body">
  <div class="admin-shell">
    <aside class="admin-sidebar">
      <a class="admin-brand" href="dashboard.php" aria-label="GREENPAVERS admin dashboard">
        <span class="admin-brand-mark" aria-hidden="true">G</span>
        <span>GREEN<span>PAVERS</span><small>ADMINISTRATION</small></span>
      </a>
      <p class="sidebar-label">WORKSPACE</p>
      <nav class="admin-nav" aria-label="Administration">
        <a class="<?= $activePage === 'dashboard' ? 'is-active' : '' ?>" href="dashboard.php"><span aria-hidden="true">▦</span> Dashboard</a>
        <a class="<?= $activePage === 'requests' ? 'is-active' : '' ?>" href="requests.php"><span aria-hidden="true">≡</span> Requests</a>
        <?php if (($admin['role'] ?? '') === 'owner'): ?>
        <a class="<?= $activePage === 'accounts' ? 'is-active' : '' ?>" href="accounts.php"><span aria-hidden="true">◎</span> Admin accounts</a>
        <?php endif; ?>
      </nav>
      <div class="sidebar-account">
        <span class="account-avatar" aria-hidden="true">GP</span>
        <span class="account-name"><?= adminEscape($admin['full_name'] ?? 'Administrator') ?><small><?= adminEscape($admin['email'] ?? '') ?></small></span>
      </div>
      <form class="sidebar-logout" action="logout.php" method="post">
        <input type="hidden" name="csrf_token" value="<?= adminEscape(adminCsrfToken()) ?>">
        <button type="submit"><span aria-hidden="true">↗</span> Sign out</button>
      </form>
    </aside>
    <main class="admin-main">
      <header class="admin-topbar">
        <div><p class="topbar-kicker">GREENPAVERS / ADMIN</p><h1><?= adminEscape($title) ?></h1></div>
        <a class="public-link" href="../customer/" target="_blank" rel="noopener">View public site <span aria-hidden="true">↗</span></a>
      </header>
<?php
}

function adminPageEnd(): void
{
    ?>
      <footer class="admin-footer"><span>GREENPAVERS / ADMINISTRATION</span><span>PAVERS / RECYCLED PLASTIC + SAND</span></footer>
    </main>
  </div>
</body>
</html>
<?php
}