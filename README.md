# All Star FC Website

Official website for All Star FC, a Helsinki-based Nepalese football club founded in 2010. The site presents the club's identity, teams, fixtures, sponsors, gallery, and contact information through a responsive static web experience.

## Project Overview

This repository contains a multi-page club website built with HTML, CSS, and JavaScript. Content is organized in reusable JavaScript data structures, while Firebase configuration is included for hosting, analytics, authentication, and Firestore-backed club features.

## Features

- Responsive public pages for home, about, teams, fixtures, gallery, sponsors, and contact
- Shared header, footer, and page rendering through JavaScript
- Multilingual content support for English, Finnish, and Nepali labels
- Firebase Hosting configuration with clean URLs, caching headers, and security headers
- Firebase setup documentation for deployment and project configuration
- SEO assets including `robots.txt`, `sitemap.xml`, Open Graph metadata, and social preview tags

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Firebase Hosting
- Firebase Authentication
- Cloud Firestore
- Firebase Analytics

## Project Structure

```text
all-star-fc-website/
  assets/
    css/
    images/
    js/
  firebase/
  index.html
  about.html
  teams.html
  fixtures.html
  gallery.html
  sponsors.html
  contact.html
  dashboard.html
  firebase.json
```

## Local Preview

From the project directory:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Deployment

The site is configured for Firebase Hosting. See `all-star-fc-website/FIREBASE_SETUP.md` and `all-star-fc-website/PUSH_AND_DEPLOY.md` for setup and deployment steps.

## Status

Active club website project. Future improvements may include expanded admin tools, richer media management, and additional fixture or sponsor workflows.
