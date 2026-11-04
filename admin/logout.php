<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/auth.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    exit('Use the sign-out button to end your session.');
}

if (!adminVerifyCsrf($_POST['csrf_token'] ?? null)) {
    http_response_code(403);
    exit('This sign-out request could not be verified.');
}

adminDestroySession();
header('Location: login.php?logged_out=1', true, 303);
exit;