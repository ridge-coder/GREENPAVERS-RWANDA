<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/auth.php';
$admin = adminRequireAuth();
require_once __DIR__ . '/includes/layout.php';
require_once __DIR__ . '/../backend/config/database.php';

$rawId = $_POST['id'] ?? $_GET['id'] ?? null;
$requestId = filter_var($rawId, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
$pageError = '';
$updated = false;
$request = null;
$httpStatus = 200;

if ($requestId === false || $requestId === null) {
    $httpStatus = 400;
    $pageError = 'A valid request ID is required.';
} elseif (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    $submittedStatus = is_string($_POST['status'] ?? null) ? $_POST['status'] : '';
    if (!adminVerifyCsrf($_POST['csrf_token'] ?? null)) {
        $httpStatus = 403;
        $pageError = 'This update could not be verified. Refresh the page and try again.';
    } elseif (!in_array($submittedStatus, GREENPAVE_ADMIN_STATUSES, true)) {
        $httpStatus = 422;
        $pageError = 'Choose one of the available request statuses.';
    } else {
        try {
            $pdo = greenpaveDatabase();
            $update = $pdo->prepare('UPDATE requests SET status = :status WHERE id = :id');
            $update->execute(['status' => $submittedStatus, 'id' => $requestId]);
            $exists = $pdo->prepare('SELECT id FROM requests WHERE id = :id LIMIT 1');
            $exists->execute(['id' => $requestId]);
            if (!$exists->fetch()) {
                $httpStatus = 404;
                $pageError = 'This request could not be found.';
            } else {
                header('Location: request-details.php?id=' . rawurlencode((string) $requestId) . '&updated=1', true, 303);
                exit;
            }
        } catch (Throwable $exception) {
            error_log('GREENPAVERS admin status update failed: ' . $exception->getMessage());
            $httpStatus = 503;
            $pageError = 'The status could not be updated right now. Please try again later.';
        }
    }
}

if ($requestId !== false && $requestId !== null) {
    try {
        $pdo = greenpaveDatabase();
        $statement = $pdo->prepare('SELECT * FROM requests WHERE id = :id LIMIT 1');
        $statement->execute(['id' => $requestId]);
        $request = $statement->fetch() ?: null;
        if ($request === null && $pageError === '') {
            $httpStatus = 404;
            $pageError = 'This request could not be found.';
        }
    } catch (Throwable $exception) {
        error_log('GREENPAVERS admin request detail load failed: ' . $exception->getMessage());
        $httpStatus = 503;
        $pageError = 'Request details are temporarily unavailable. Please try again later.';
    }
}

http_response_code($httpStatus);
adminPageStart('Request details', 'requests');
?>
      <p class="back-link"><a href="requests.php">← Back to requests</a></p>
      <?php if ($pageError !== ''): ?>
        <section class="panel detail-error"><span class="error-mark" aria-hidden="true">!</span><h2>We could not open this request.</h2><p><?= adminEscape($pageError) ?></p><a class="admin-button button-dark" href="requests.php">Return to requests</a></section>
      <?php elseif ($request !== null): ?>
        <section class="detail-heading"><div><p class="eyebrow">REQUEST / #<?= adminEscape($request['id']) ?></p><h2><?= adminEscape($request['full_name']) ?></h2><p>Submitted <?= adminEscape(date('d M Y, H:i', strtotime($request['created_at']))) ?></p></div><span class="status-badge status-<?= adminEscape(adminStatusClass($request['status'])) ?> status-large"><?= adminEscape($request['status']) ?></span></section>
        <?php if (($_GET['updated'] ?? '') === '1'): ?><p class="notice notice-success" role="status">Request status updated.</p><?php endif; ?>
        <div class="detail-layout">
          <section class="panel detail-panel"><div class="panel-heading"><div><p class="eyebrow">CUSTOMER / PROJECT</p><h2>Request information</h2></div></div>
            <dl class="detail-list">
              <div><dt>Full name</dt><dd><?= adminEscape($request['full_name']) ?></dd></div>
              <div><dt>Phone</dt><dd><a href="tel:<?= adminEscape($request['phone']) ?>"><?= adminEscape($request['phone']) ?></a></dd></div>
              <div><dt>Email</dt><dd><?php if ($request['email'] !== null && $request['email'] !== ''): ?><a href="mailto:<?= adminEscape($request['email']) ?>"><?= adminEscape($request['email']) ?></a><?php else: ?>Not provided<?php endif; ?></dd></div>
              <div><dt>Location</dt><dd><?= adminEscape($request['location']) ?></dd></div>
              <div><dt>Product type</dt><dd><?= adminEscape(ucwords(str_replace('_', ' ', $request['product_type']))) ?></dd></div>
              <div><dt>Quantity</dt><dd><?= adminEscape($request['quantity']) ?></dd></div>
              <div><dt>Preferred color</dt><dd><?= adminEscape($request['preferred_color']) ?></dd></div>
              <div><dt>Delivery required</dt><dd><?= adminEscape($request['delivery_required']) ?></dd></div>
              <div><dt>Message</dt><dd class="detail-message"><?= $request['message'] !== null && $request['message'] !== '' ? nl2br(adminEscape($request['message'])) : 'No additional message' ?></dd></div>
              <div><dt>Created</dt><dd><?= adminEscape(date('d M Y, H:i:s', strtotime($request['created_at']))) ?></dd></div>
              <div><dt>Last updated</dt><dd><?= adminEscape(date('d M Y, H:i:s', strtotime($request['updated_at']))) ?></dd></div>
            </dl>
          </section>
          <aside class="panel status-panel"><p class="eyebrow">WORKFLOW</p><h2>Update status</h2><p>Choose the current stage for this customer request.</p>
            <form action="request-details.php" method="post" class="status-form">
              <input type="hidden" name="id" value="<?= adminEscape($request['id']) ?>">
              <input type="hidden" name="csrf_token" value="<?= adminEscape(adminCsrfToken()) ?>">
              <label for="request-status">Request status</label>
              <select id="request-status" name="status" required><?php foreach (GREENPAVE_ADMIN_STATUSES as $status): ?><option value="<?= adminEscape($status) ?>" <?= $request['status'] === $status ? 'selected' : '' ?>><?= adminEscape($status) ?></option><?php endforeach; ?></select>
              <button class="admin-button button-dark" type="submit">Save status <span aria-hidden="true">↗</span></button>
            </form>
          </aside>
        </div>
      <?php endif; ?>
<?php adminPageEnd(); ?>