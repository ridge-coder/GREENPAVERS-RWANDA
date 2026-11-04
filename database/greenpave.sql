
CREATE TABLE IF NOT EXISTS admins (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(254) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_admins_email (email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS products (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  slug VARCHAR(120) NOT NULL,
  product_type VARCHAR(40) NOT NULL,
  description VARCHAR(500) NOT NULL,
  material VARCHAR(120) NOT NULL DEFAULT 'Recycled plastic and sand',
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_products_slug (slug),
  KEY idx_products_active (is_active)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS requests (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(120) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  email VARCHAR(254) NULL,
  location VARCHAR(180) NOT NULL,
  product_type VARCHAR(40) NOT NULL,
  quantity VARCHAR(40) NOT NULL,
  preferred_color VARCHAR(40) NOT NULL,
  delivery_required ENUM('Yes', 'No', 'Not sure') NOT NULL,
  message TEXT NULL,
  status ENUM('Pending', 'Confirmed', 'In Production', 'Ready', 'Completed', 'Cancelled') NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_requests_status_created (status, created_at),
  KEY idx_requests_phone (phone),
  KEY idx_requests_created (created_at)
) ENGINE=InnoDB;

INSERT INTO products (name, slug, product_type, description)
VALUES
  ('GREENPAVERS Interlocking Pavers', 'interlocking', 'interlocking', 'Interlocking pavers for paths and shared outdoor spaces. Confirm format and suitability for each project.'),
  ('GREENPAVERS Linear Pavers', 'linear', 'linear', 'Long rectangular pavers for walkways and edges. Confirm format and suitability for each project.'),
  ('GREENPAVERS Landscape Pavers', 'landscape', 'landscape', 'Modular pavers for garden and terrace layouts. Confirm format and suitability for each project.')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  product_type = VALUES(product_type),
  description = VALUES(description);