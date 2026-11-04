# GREENPAVERS workspace guidance

- Keep the public website in `customer/` and all future administrative code in `admin/`; never mix their pages, assets, or scripts.
- Use semantic HTML, external CSS, and vanilla JavaScript. Do not introduce frontend frameworks or dependencies.
- Treat local Commons photos as reference imagery, not GREENPAVERS project photos. Replace them with owner-supplied photography when available.
- Do not claim product specifications, environmental metrics, contact details, or backend behavior that the business has not confirmed.
- The customer request form posts to `backend/api/requests.php`; keep credentials in server-side environment/configuration only.
- Preserve the shared Kinyarwanda/English and light/dark controls across all customer pages.