# DRK Aksesuar website

Corporate website for DRK Aksesuar. The project contains a React/Vite frontend and a small Node.js server that serves the production build, handles SPA routes and sends contact-form emails over SMTP.

## Requirements

- Node.js 20 or newer
- npm
- An SMTP account
- A reverse proxy such as Nginx or Apache for the production domain

## Local setup

```bash
git clone https://github.com/guner-ucar/drk-aksesuar.git
cd drk-aksesuar
npm ci
cp .env.example .env
npm run build
npm start
```

The application listens on port `3000` unless `PORT` is set to another value.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `PORT` | Node.js application port |
| `MAIL_HOST` | SMTP server hostname |
| `MAIL_PORT` | SMTP server port |
| `MAIL_USERNAME` | SMTP account username |
| `MAIL_PASSWORD` | SMTP account password or application password |
| `MAIL_ENCRYPTION` | Set to `tls` for STARTTLS |
| `MAIL_FROM_ADDRESS` | Sender email address |
| `MAIL_FROM_NAME` | Sender display name |
| `CONTACT_RECIPIENTS` | Comma-separated internal recipients |
| `SEND_APPLICANT_CONFIRMATION` | Set to `false` to disable the external confirmation email |

Keep production values in the server or hosting panel. Do not commit the `.env` file.

## Production commands

```bash
npm ci
npm run check
npm start
```

`npm run check` runs the contact-service tests, creates the production frontend build and validates the server files.

The Node.js process should be managed by the server platform or a process manager such as systemd or PM2. The domain should proxy traffic to the configured application port. Both page routes and `/api/contact` must reach the Node.js process.

### Vercel

Vercel builds the Vite frontend and exposes the contact endpoint through `api/contact.js`. Add the mail settings from `.env.example` to the Vercel project's Production environment before deploying. The same contact service is shared by the Vercel function and the standalone Node.js server.

Example Nginx location:

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## Project structure

```text
src/                         React application
src/components/about/        About-page methodology components
src/technicalMethodology.js  Technical commerce content
server/                      Production server and email service
public/                      Static images, logos and metadata
dist/                        Generated production build
```

## Update workflow

The deployment server should track the `main` branch. A typical update is:

```bash
git pull origin main
npm ci
npm run check
# restart the Node.js process
```
