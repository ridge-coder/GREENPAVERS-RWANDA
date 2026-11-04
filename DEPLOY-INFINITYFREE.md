# GREENPAVERS — InfinityFree deployment

## 1. Confirm these hosting details first

In the InfinityFree control panel, record:

- The exact website document root (often `htdocs`; confirm it).
- Whether PHP `getenv()` can read account-configured environment variables.
- PHP version and availability of PDO MySQL, OpenSSL, mbstring, and sessions.
- The assigned MySQL hostname, port, database name, username, password, and import method.
- Whether SSH/interactive CLI is available and can connect to the hosted database.
- Whether HTTPS is enabled for the domain.

Do not put database credentials in this file, source control, or any downloadable file.

## 2. Upload only these runtime files to the document root

Preserve this exact directory structure under the confirmed document root:

```text
htdocs/
  customer/
    about.html
    contact.html
    gallery.html
    index.html
    process.html
    products.html
    request.html
    track.html
    css/site.css
    js/site.js
    assets/                 (all existing .jpg and .svg assets, including images/)
  backend/
    api/requests.php
    api/track-request.php
    config/database.php
  admin/
    login.php
    dashboard.php
    requests.php
    request-details.php
    logout.php
    accounts.php
    includes/auth.php
    includes/layout.php
    assets/admin.css
```

The public entry page is `customer/index.html`; this layout serves the site at
`https://YOUR-DOMAIN/customer/`. The project has no root `index.html`.

Do **not** upload `admin/setup.php`, `admin/provision-first-admin.php`, or
`admin/establish-first-owner.php` as public pages. Also exclude `database/`,
`.vscode/`, `.github/`, `README.md`, `MANUAL-TESTING-REPORT.md`,
`customer/assets/PHOTO-CREDITS.md`, and all backups, logs, and secrets.

## 3. Configure the database connection privately

`backend/config/database.php` currently requires `getenv()` to provide:

```text
GREENPAVE_ENV=production
GREENPAVE_DB_HOST
GREENPAVE_DB_PORT
GREENPAVE_DB_NAME
GREENPAVE_DB_USER
GREENPAVE_DB_PASSWORD
```

If InfinityFree exposes private environment variables to PHP, configure all six
there using the exact assigned database values. Do not use XAMPP defaults.

If `getenv()` is unavailable, stop before uploading the live site. The minimum
safe code change is to let `backend/config/database.php` load the same settings
from a PHP configuration file outside the actual document root, while failing
closed if the file or values are missing. Ask InfinityFree support for a private
configuration location and verify it is not web-accessible before making that
change. Never put credentials in `htdocs`, HTML, JavaScript, or a public PHP
file.

## 4. Initialize the already-empty hosting database

Use the hosting database's assigned name; do not assume it is literally
`greenpave`.

1. Select the empty assigned database in the host's database import tool.
2. Review `database/greenpave.sql`. It contains `CREATE DATABASE ... greenpave`
   and `USE greenpave`; these statements can target the wrong database or fail
   with hosted database permissions. For the import, omit those two statements
   and execute the remaining schema/seed statements in the selected empty
   assigned database. Do not import into any database containing business data.
3. Import `database/greenpave.sql` first.
4. Then import `database/migrations/20261013_admin_roles_and_request_tracking.sql`.
   The admin roles and tracking feature require these columns. Review the
   migration and confirm the base import completed before applying it.
5. Do **not** import `database/migrations/20261009_update_request_statuses.sql`
   for this fresh database: the base schema already defines the final status
   enum, and that migration is only for upgrading the earlier schema.

These SQL files are deployment inputs only; do not upload them into the public
document root. No database changes are made by following this checklist itself.

## 5. Create the first administrator safely

After the schema and private database configuration are ready, the fastest
project-provided route is to run `admin/provision-first-admin.php` through an
authenticated SSH/CLI session with PHP CLI and PDO MySQL, if InfinityFree
provides those capabilities. Configure the production database variables in
that private CLI environment. The utility confirms the target database,
requires the `admins` table to be empty, and prompts for the owner's password
without echoing it. The roles migration must already be applied.

This utility is CLI-only; do not open it as a browser URL or upload it as a
public script. The web setup page is deliberately local-loopback-only and is
not an InfinityFree provisioning method. If the host offers no secure CLI
provisioning path, ask InfinityFree support for a private supported method
before enabling public admin access; do not add a public account-creation
endpoint.

## 6. Before opening the site publicly

- Confirm HTTPS and the private database configuration are active.
- Confirm the owner can sign in and that the admin is not created through a
  public setup page.
- The customer request HTTP 500 is unresolved; do not treat deployment as
  verified or invite live requests until it has been fixed and tested safely.
- No files have been uploaded and no online deployment or hosting test has
  been performed.
