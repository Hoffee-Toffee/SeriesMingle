<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Running locally with Docker

Install Docker Desktop for Windows. It must be running for Docker commands to work; the `sail up` helper starts it if needed. If using Ubuntu under WSL, enable **Settings > Resources > WSL Integration > Ubuntu** and select **Apply & restart**. Fully restart VS Code after setup so new terminals inherit the Docker CLI path. From a terminal in the project directory, install PHP dependencies on the host once, then start the Sail container:

```bash
composer install
if [ ! -f .env ]; then cp .env.example .env; fi
touch database/database.sqlite
sail up -d --build
sail npm ci
sail npm run build
```

On every container start, Compose runs `php artisan migrate --seed --force` before serving requests. This applies new migrations and reruns the Firebase transfer seeder without overwriting projects already in the local database. To run the same step manually, use `sail artisan migrate --seed --force`.

Open the app at [http://localhost:8000](http://localhost:8000). The application uses SQLite by default; the database file is stored in `database/database.sqlite`. Stop the container with `sail down`. On this Windows machine, `sail` is available in PowerShell, Git Bash, and Ubuntu on WSL. Docker Compose calls the service `laravel.test`; Docker gives its running container a generated name such as `seriesmingle-laravel.test-1`. Use `sail artisan ...` (which targets the Compose service), not `docker exec ...` with a guessed container name. Docker Desktop's WSL integration must be enabled before `docker` or `sail` can work inside WSL.

The frontend now uses Tailwind CSS v4, which targets Safari 16.4+, Chrome 111+, and Firefox 128+. See the [Tailwind upgrade guide](https://tailwindcss.com/docs/upgrade-guide#browser-requirements) if the app must support older browsers.

### Importing existing Firebase projects

Private Firebase/Firestore data cannot be read using only the Google sign-in credentials. Before starting the container, place a JSON export at `storage/app/firebase_export.json` with `users` and `projects` arrays. Each user should include their Firebase UID and email; projects should be keyed by their Firebase document IDs and retain their `user` (Firebase UID) field. The transfer seeder matches exported users by email to the signed-in Laravel account and preserves that Firebase UID so their projects remain associated. Keep the export private and do not commit it. If the Firestore project allows public reads, the seeder can also import public project documents automatically, but that alone cannot map Firebase Authentication users to local accounts.

### Google sign-in

Google sign-in requires OAuth credentials; they are not included with the project. In Google Cloud Console, create an OAuth client ID for a **Web application**, add `http://localhost:8000` as an authorized JavaScript origin, and add `http://localhost:8000/auth/google/callback` as an authorized redirect URI. Put the client ID and secret in the local `.env` file:

```dotenv
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback
```

Then refresh the app configuration with `sail artisan config:clear`. Keep the client secret private; do not commit `.env`. Without both values, the sign-in link returns to the login screen with a setup message.

### Reviewing React-to-Blade mappings

The migration mapper reads the original TSX components and SCSS color tokens and writes draft Blade templates, a Tailwind color map, and a JSON report without changing the live Laravel views:

```bash
php artisan convert:react-to-blade
```

By default, generated files are written to `storage/app/react-to-blade`. Use `--output=path` to choose another output directory or `--source=path` to select a different source directory containing `components/` and `styles/`. Install frontend dependencies first so the TypeScript parser and Sass compiler are available. The `tailwind-colors.json` file records source token names and values; `tailwind-colors.css` expresses the same values as Tailwind v4 `@theme` color variables. Both are reference artifacts and are not imported into the live stylesheet automatically.

Use `--apply` to have the mapper generate the live homepage and the React-matched login/signup views; map the authenticated headers, dashboard sections, project cards, and per-card ellipsis menus to the existing Livewire routes/actions; and install the original compiled page styles, default theme colors, and imported assets:

```bash
php artisan convert:react-to-blade --apply
```

Applying replaces the homepage and login/signup views, maps the dashboard and authenticated page headers, adds source-matching selector hooks to the existing Livewire project editor, and writes generated CSS/assets under `public/react-mapped/`. Login and signup use Laravel's real email/password and Google OAuth routes. The default command remains draft-only. The mapper reports source constructs it cannot safely translate; it will refuse to apply pages if it finds an unsupported mapping. Scheduler-driven preview entries and project-editor behavior remain intentionally deferred where Laravel has no matching implementation; no replacement schedule content is fabricated. Project routes require authentication and allow only the project owner or a shared project member.

For local visual testing only, set `LOCAL_AUTH_EMAIL` in `.env` to the email address of an existing local user, then visit `/__dev/auth`. This shortcut logs into that configured local account without a password and returns 404 unless `APP_ENV=local`; do not enable it in a deployed environment.

The mapper also compiles each source SCSS file into a CSS reference under `styles/` without rewriting its selectors or behavior; Sass warnings are recorded in the report. These references are not Tailwind translations. The report lists dynamic React expressions, event handlers, child components, and styles that still need deliberate migration.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

In addition, [Laracasts](https://laracasts.com) contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

You can also watch bite-sized lessons with real-world projects on [Laravel Learn](https://laravel.com/learn), where you will be guided through building a Laravel application from scratch while learning PHP fundamentals.

## Agentic Development

Laravel's predictable structure and conventions make it ideal for AI coding agents like Claude Code, Cursor, and GitHub Copilot. Install [Laravel Boost](https://laravel.com/docs/ai) to supercharge your AI workflow:

```bash
composer require laravel/boost --dev

php artisan boost:install
```

Boost provides your agent 15+ tools and skills that help agents build Laravel applications while following best practices.

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
