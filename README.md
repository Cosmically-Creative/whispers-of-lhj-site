# Whispers of Love, Hope, and Joy Website

Website for Whispers of Love, Hope, and Joy, a nonprofit providing Christ-centered support, practical help, and healing community for survivors of domestic abuse in Northwest Iowa.

Designed and developed by [Cosmically Creative](https://cosmicallycreative.com).

## Technology

This is a static website built with:

- HTML
- CSS
- Vanilla JavaScript
- Self-hosted Karla and Newsreader fonts
- Apache `.htaccess` configuration

The website has no build process, package manager, database, or server-side application.

## Website Pages

- Home
- Get Help
- What We Do
- Talitha Koum
- Who We Are
- Get Involved
- Staying Safe
- Shop Church
- Website Privacy
- Accessibility
- Custom 404 page

## Project Structure

```text
/
├── accessibility/
├── css/
├── fonts/
├── get-help/
├── get-involved/
├── img/
├── privacy/
├── shop-church/
├── staying-safe/
├── talitha-koum/
├── what-we-do/
├── who-we-are/
├── .htaccess
├── 404.html
├── index.html
├── robots.txt
└── script.js
```

## Hosting

The public site is [https://whispersoflhj.org/](https://whispersoflhj.org/). `.htaccess` redirects `www.whispersoflhj.org` and `whispersoflhj.com` to that host and sends HTTP requests to HTTPS.

The production server should support Apache `.htaccess` directives for:

- HTTPS redirects
- Custom error documents
- Security headers
- Compression and browser caching
- Redirects from previous page URLs

## Benefit Brunch

The October 10, 2026 brunch stays up through the end of that Saturday, US Central time. At midnight, the announcement comes down on its own.

`/events/` then sends people home. The events page does that before it paints, and Apache redirects the URL with `noindex` so crawlers do not keep it. The date, place, and ticket copy can stay in `events/index.html`. After that night, the page is no longer served.

The cutoff is `2026-10-11T05:00:00Z` in `script.js` and `events/index.html`. `.htaccess` uses `20261011060000`, which follows the server clock and falls on the morning after the brunch in US time zones. For a later event, change those three together and replace the copy on the events page.

## Privacy

This repository must not contain credentials, private client documents, unapproved photographs, survivor information, or other confidential material.

Photographs and testimonials should only be published after Whispers confirms appropriate permission.

## Ownership

Website content © 2026 Whispers of Love, Hope & Joy, Inc.

Design and development by Cosmically Creative. All rights reserved.
