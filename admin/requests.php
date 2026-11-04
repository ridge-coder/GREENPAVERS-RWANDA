<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/auth.php';
$admin = adminRequireAuth();
require_once __DIR__ . '/includes/layout.php';
require_once __DIR__ . '/../backend/config/database.php';

$rawFilter = $_GET['status'] ?? '';
$filter = is_string($rawFilter) ? trim($rawFilter) : '';
$rawSearch = $_GET['q'] ?? '';
$search = is_string($rawSearch) ? trim($rawSearch) : '';
$error = '';
$loadFailed = false;
$requests = [];
if ($filter !== '' && !in_array($filter, GREENPAVE_ADMIN_STATUSES, true)) {
    $filter = '';
    $error = 'That status filter is not available. Showing all requests.';
}
if (adminTextLength($search) > 120) {
    $search = '';
    $error = 'Search terms must be 120 characters or fewer.';
}

try {
    $pdo = greenpaveDatabase();
    $conditions = [];
    $parameters = [];
    if ($filter !== '') {
      $conditions[] = 'status = :status';
      $parameters['status'] = $filter;
    }
    if ($search !== '') {
      $conditions[] = '(full_name LIKE :name OR phone LIKE :phone OR email LIKE :email OR location LIKE :location)';
      $searchPattern = '%' . $search . '%';
      $parameters['name'] = $searchPattern;
      $parameters['phone'] = $searchPattern;
      $parameters['email'] = $searchPattern;
      $parameters['location'] = $searchPattern;
    }
    $sql = 'SELECT id, full_name, phone, product_type, quantity, location, status, created_at FROM requests';
    if ($conditions !== []) {
      $sql .= ' WHERE ' . implode(' AND ', $conditions);
    }
    $sql .= ' ORDER BY created_at DESC, id DESC';
    $statement = $pdo->prepare($sql);
    $statement->execute($parameters);
    $requests = $statement->fetchAll();
} catch (Throwable $exception) {
    error_log('GREENPAVERS admin requests load failed: ' . $exception->getMessage());
  $loadFailed = true;
    $error = 'Requests are temporarily unavailable. Please try again later.';
}

adminPageStart('Requests', 'requests');
?>
      <section class="page-intro"><div><p class="eyebrow">CUSTOMER ENQUIRIES / <?= adminEscape(count($requests)) ?> SHOWN</p><h2>Requests, in view.</h2><p>Review project details and move each enquiry through its current stage.</p></div>
        <form class="filter-form" action="requests.php" method="get"><label for="request-search">Search<input id="request-search" name="q" type="search" maxlength="120" value="<?= adminEscape($search) ?>" placeholder="Name, phone, email, location"></label><label for="status-filter">Status</label><select id="status-filter" name="status"><option value="">All statuses</option><?php foreach (GREENPAVE_ADMIN_STATUSES as $status): ?><option value="<?= adminEscape($status) ?>" <?= $filter === $status ? 'selected' : '' ?>><?= adminEscape($status) ?></option><?php endforeach; ?></select><button class="admin-button button-dark" type="submit">Apply</button></form>
      </section>
      <?php if ($error !== ''): ?><p class="notice <?= $loadFailed ? 'notice-error' : 'notice-info' ?>" role="status"><?= adminEscape($error) ?></p><?php endif; ?>
      <section class="panel requests-panel"><div class="panel-heading"><div><p class="eyebrow">REQUEST REGISTER</p><h2><?= $filter !== '' ? adminEscape($filter) . ' requests' : 'All requests' ?></h2></div><span class="result-count"><?= adminEscape(count($requests)) ?> records</span></div>
        <?php if ($loadFailed): ?>
          <div class="empty-state"><span class="empty-mark" aria-hidden="true">!</span><h3>Request data unavailable</h3><p>Try reloading later. Existing request records have not been changed.</p></div>
        <?php elseif ($requests === []): ?>
          <div class="empty-state"><span class="empty-mark" aria-hidden="true">—</span><h3><?= $filter !== '' ? 'No requests in this stage' : 'No requests received yet' ?></h3><p><?= $filter !== '' ? 'Try another status filter or return to all requests.' : 'Customer enquiries submitted from the public website will appear here.' ?></p><?php if ($filter !== ''): ?><a class="inline-link" href="requests.php">View all requests <span aria-hidden="true">→</span></a><?php endif; ?></div>
        <?php else: ?>
          <div class="table-scroll"><table class="admin-table"><thead><tr><th>Customer</th><th>Phone</th><th>Product</th><th>Quantity</th><th>Location</th><th>Status</th><th>Submitted</th><th><span class="visually-hidden">Open</span></th></tr></thead><tbody>
            <?php foreach ($requests as $request): ?>
              <tr><td><a class="table-primary" href="request-details.php?id=<?= adminEscape($request['id']) ?>"><?= adminEscape($request['full_name']) ?></a></td><td><?= adminEscape($request['phone']) ?></td><td><?= adminEscape(ucwords(str_replace('_', ' ', $request['product_type']))) ?></td><td><?= adminEscape($request['quantity']) ?></td><td><?= adminEscape($request['location']) ?></td><td><span class="status-badge status-<?= adminEscape(adminStatusClass($request['status'])) ?>"><?= adminEscape($request['status']) ?></span></td><td><?= adminEscape(date('d M Y, H:i', strtotime($request['created_at']))) ?></td><td><a class="row-action" href="request-details.php?id=<?= adminEscape($request['id']) ?>" aria-label="View request <?= adminEscape($request['id']) ?>">↗</a></td></tr>
            <?php endforeach; ?>
          </tbody></table></div>
        <?php endif; ?>
      </section>
<?php adminPageEnd(); ?>