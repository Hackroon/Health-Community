# Health-Community

## Purpose
- Hospital and vendor resource coordination dashboard.

## Features
- Role-based hospital and vendor dashboards.
- Supabase auth with sign up, login, and password reset.
- Inventory, logistics, network, and settings views.
- Role-aware routing and session handling.

## How to use
1. Sign up as a hospital or vendor organization.
2. Confirm the email address.
3. Log in and use the matching dashboard.
4. Use Forgot Password to reset access by email.

## Security
- Passwords must be 8+ characters with letters, numbers, and a special character.
- Hospital and vendor accounts stay role-separated by email.
- Short display IDs are shown in the app for hospital and vendor records.
- OWASP-style protections are applied through auth, role guards, and input validation.
