<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/auth.php';
$admin = adminRequireAuth();
require_once __DIR__ . '/includes/layout.php';
require_once __DIR__ . '/../backend/config/database.php';

$counts = array_fill_keys(GREENPAVE_ADMIN_STATUSES, 0);
$totalRequests = 0;
$recentRequests = [];
$loadError = false;

try {
    $pdo = greenpaveDatabase();
    $countRows = $pdo->query('SELECT status, COUNT(*) AS total FROM requests GROUP BY status')->fetchAll();
    foreach ($countRows as $row) {
        if (array_key_exists($row['status'], $counts)) {
            $counts[$row['status']] = (int) $row['total'];
            $totalRequests += (int) $row['total'];
        }
    }
    $recentRequests = $pdo->query(
        'SELECT id, full_name, product_type, quantity, status, created_at
         FROM requests ORDER BY created_at DESC, id DESC LIMIT 8'
    )->fetchAll();
} catch (Throwable $exception) {
    error_log('GREENPAVERS admin dashboard load failed: ' . $exception->getMessage());
    $loadError = true;
}

$metrics = [
    'Pending' => 'Pending',
    'Confirmed' => 'Confirmed',
    'In Production' => 'In production',
    'Ready' => 'Ready',
    'Completed' => 'Completed',
    'Cancelled' => 'Cancelled',
];

adminPageStart('Dashboard', 'dashboard');
?>
      <section class="welcome-band">
        <div><p class="eyebrow">OPERATIONS / OVERVIEW</p><h2>Good work starts<br>with a clear view.</h2><p>Track incoming paving enquiries and their current status.</p></div>
        <a class="admin-button button-lime" href="requests.php">Review requests <span aria-hidden="true">↗</span></a>
        <span class="welcome-mark" aria-hidden="true">GP</span>
      </section>
      <?php if ($loadError): ?><p class="notice notice-error" role="alert">Dashboard data is temporarily unavailable. Please try again later.</p><?php else: ?>
      <section class="metrics-grid" aria-label="Request totals">
        <article class="metric-card metric-total"><span class="metric-label">TOTAL REQUESTS</span><strong><?= adminEscape($totalRequests) ?></strong><span class="metric-note">All customer enquiries</span></article>
        <?php foreach ($metrics as $status => $label): ?>
          <article class="metric-card"><span class="metric-label"><?= adminEscape(strtoupper($label)) ?></span><strong><?= adminEscape($counts[$status]) ?></strong><span class="metric-note">Requests in this stage</span></article>
        <?php endforeach; ?>
      </section>
      <section class="panel recent-panel">
        <div class="panel-heading"><div><p class="eyebrow">LATEST ACTIVITY</p><h2>Recent requests</h2></div><a class="inline-link" href="requests.php">All requests <span aria-hidden="true">→</span></a></div>
        <?php if ($recentRequests === []): ?>
          <div class="empty-state"><span class="empty-mark" aria-hidden="true">—</span><h3>No requests yet</h3><p>New customer enquiries will appear here when submitted.</p></div>
        <?php else: ?>
          <div class="table-scroll"><table class="admin-table"><thead><tr><th>Customer</th><th>Product</th><th>Quantity</th><th>Status</th><th>Submitted</th><th><span class="visually-hidden">Open</span></th></tr></thead><tbody>
            <?php foreach ($recentRequests as $request): ?>
              <tr><td><a class="table-primary" href="request-details.php?id=<?= adminEscape($request['id']) ?>"><?= adminEscape($request['full_name']) ?></a></td><td><?= adminEscape(ucwords(str_replace('_', ' ', $request['product_type']))) ?></td><td><?= adminEscape($request['quantity']) ?></td><td><span class="status-badge status-<?= adminEscape(adminStatusClass($request['status'])) ?>"><?= adminEscape($request['status']) ?></span></td><td><?= adminEscape(date('d M Y, H:i', strtotime($request['created_at']))) ?></td><td><a class="row-action" href="request-details.php?id=<?= adminEscape($request['id']) ?>" aria-label="Open request <?= adminEscape($request['id']) ?>">↗</a></td></tr>
            <?php endforeach; ?>
          </tbody></table></div>
        <?php endif; ?>
      </section>
      <?php endif; ?>
<?php adminPageEnd(); ?>