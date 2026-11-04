ALTER TABLE admins
  ADD COLUMN role ENUM('owner', 'admin') NOT NULL DEFAULT 'admin' AFTER password_hash,
  ADD COLUMN is_active TINYINT(1) NOT NULL DEFAULT 1 AFTER role,
  ADD KEY idx_admins_role_active (role, is_active);

ALTER TABLE requests
  ADD COLUMN tracking_token_hash CHAR(64)
    CHARACTER SET ascii COLLATE ascii_bin NULL AFTER status,
  ADD UNIQUE KEY uq_requests_tracking_token_hash (tracking_token_hash);
