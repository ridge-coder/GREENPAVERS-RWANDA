# GREENPAVERS

GREENPAVERS makes paving blocks using recycled plastic and sand. The customer pages use semantic HTML, CSS, and vanilla JavaScript; the request endpoint uses PHP and PDO with MySQL/MariaDB.

## Pages

The customer area includes Home, About, Pavers, Our Process, Gallery, Contact, Request Pavers, and request tracking. Kinyarwanda is the default language; English and the light/dark theme preferences persist in the browser. The separate `admin/` area provides session-protected login, a database-backed dashboard, request list/details, CSRF-protected status updates, and owner-only administrator account management.

## Local setup

1. Install PHP with PDO MySQL support and a local MySQL or MariaDB server.
2. Create an empty development database and import `database/greenpave.sql` into it.
3. If upgrading an earlier schema, apply `database/migrations/20261009_update_request_statuses.sql` once. Apply `database/migrations/20261013_admin_roles_and_request_tracking.sql` when enabling administrator roles and request tracking. Back up the database first and confirm which schema version is installed before applying a migration.
4. Configure `GREENPAVE_ENV=local` and the `GREENPAVE_DB_HOST`, `GREENPAVE_DB_PORT`, `GREENPAVE_DB_NAME`, `GREENPAVE_DB_USER`, and `GREENPAVE_DB_PASSWORD` environment variables for the PHP process. Do not put credentials in source files or commit local database configuration.
5. From the project root, start the PHP development server with `php -S 127.0.0.1:8080 -t .` after configuring the environment variables.
6. Open `/customer/` for the public site or `/admin/login.php` for administrator sign-in.

The application requires `GREENPAVE_ENV` to be explicitly set to `local` or `production`; it fails closed if the setting is missing. The first administrator can be created only through the protected local setup procedure described below.

## Production deployment

- Set `GREENPAVE_ENV=production` in the web server's private environment configuration. Production mode fails closed unless all five `GREENPAVE_DB_*` settings are supplied and the database user is not `root`. Do not set these values in customer-facing HTML/JavaScript, a public repository, or web-accessible configuration files.
- Use a dedicated database and a dedicated application account with a strong unique password. Grant only `SELECT`, `INSERT`, and `UPDATE` on `admins`, and `SELECT`, `INSERT`, and `UPDATE` on `requests`; do not grant `DELETE`, schema changes, or global privileges to the runtime account. Use a separate, temporary deployment account for schema creation and migrations, then revoke it.
- Serve the entire site over HTTPS. Configure the web server to redirect HTTP to HTTPS and enable secure cookies/HSTS only after HTTPS is working. If TLS terminates at a reverse proxy, configure the PHP/web-server HTTPS indicator only for requests received from that trusted proxy so the admin session cookie gets the `Secure` attribute.
- Use a supported PHP version with PDO MySQL enabled, `utf8mb4` MySQL/MariaDB, and production error logging with display errors disabled. Keep the database on a private network; require encrypted database connections when traffic crosses an untrusted network.
- Set `GREENPAVE_ENV=production` and every `GREENPAVE_DB_*` value in private web-server configuration before enabling the public site. Missing environment configuration fails closed; production does not fall back to local defaults.
- Provision the first administrator with the CLI-only setup utility from a trusted server-side environment, using temporary deployment credentials with `SELECT` and `INSERT` access to `admins`. There is no public registration endpoint. Verify sign-in, session expiry, CSRF-protected status updates, backups, and restore procedures in staging before launch.
- Replace the local XAMPP web server and development settings with a production web-server configuration; do not expose phpMyAdmin, development ports, PHP source, or error logs publicly.

## Administrator provisioning

There is no public registration page. Initial setup is available at `admin/setup.php` only when all of these conditions hold: `GREENPAVE_ENV=local`, `GREENPAVE_ADMIN_SETUP_ENABLED=1`, the request comes from the loopback computer, and the `admins` table is empty. Setup uses the existing CSRF-protected admin session, database lock, transaction, `password_hash()`, and prepared statement; the first account is assigned the `owner` role. After that account is created, the page closes. It cannot reset or replace an existing account.

Keep the setup server bound to loopback and use it only in a trusted local development environment. The explicit `GREENPAVE_ADMIN_SETUP_ENABLED=1` setting must be present in the PHP server process; without the opt-in, the setup route intentionally returns 404. The page requires an empty `admins` table and becomes unavailable after the first account is created.

After signing in as an owner, `admin/accounts.php` can create, edit, activate, or deactivate administrator accounts and assign `owner` or `admin` roles. It checks the current active owner role on every request, protects writes with CSRF tokens, and prevents demoting or deactivating the last active owner. Existing admins are not promoted automatically by the migration. The CLI-only `admin/establish-first-owner.php` utility requires an explicitly configured, owner-approved email and verification of that existing account; an ordinary admin cannot choose a different account to promote.

The CLI-only `admin/provision-first-admin.php` utility is for trusted server-side provisioning. It requires the target database name to be explicitly set and confirmed, and refuses to create an account if an admin already exists. Use private environment configuration and a temporary deployment account where appropriate. Never place administrator passwords or hashes in source files, browser requests, or logs.

## Customer request tracking

When the request-tracking migration is installed, each new successful request receives a random 256-bit tracking reference. The customer sees it once on the request confirmation screen and must save it; the database stores only its SHA-256 hash. The request form remains compatible with the pre-migration schema: it saves the request without a tracking reference and tells the customer tracking is not available yet. The migration is required before private tracking can be used. The tracking page is [customer/track.html](customer/track.html); it accepts only the private reference and returns the current status and submission time, never the sequential request ID, name, phone, email, location, or message. The lookup endpoint limits attempts to 20 per 15-minute window per connecting IP using a locked, owner-only directory and per-host files in the PHP system temporary directory. In a multi-server deployment, configure shared rate limiting at the hosting layer. Existing requests retain a `NULL` tracking hash and are not retroactively trackable; do not make up references for them. Status history is not currently stored, so tracking shows the current status only; `Confirmed` is displayed as `Approved`, while `Cancelled` remains `Cancelled`.

The migration is additive and must be applied once by a migration account before deploying the updated application. Back up the database first, and never run it against a database whose schema has not been checked.

When testing request workflows, use a separate development database and avoid copying or publishing real customer records.

## Customer photos, indicative prices, and requests

The customer pages use the owner-supplied `paver1.jpg` and `paver2.jpg` photos from `customer/assets/images/`. Remaining Wikimedia Commons images are labelled as references, not GREENPAVERS projects. Source links and license terms are in [customer/assets/PHOTO-CREDITS.md](customer/assets/PHOTO-CREDITS.md).

The public site displays the proposed per-paver prices as indicative only; they have not been confirmed by management. The request form calculates an estimate in the browser and sends only the existing request fields. The server does not trust or store client-submitted prices, and the final quote and style availability must be confirmed by GREENPAVERS. The form accepts a whole-paver quantity from 1 to 1,000,000. No price columns or database migration are required for this display/calculation.

The request form stores project enquiries in MySQL. Do not include payment details or other sensitive information in its message field. The admin status values are `Pending`, `Confirmed`, `In Production`, `Ready`, `Completed`, and `Cancelled`.