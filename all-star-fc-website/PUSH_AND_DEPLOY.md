# Push to GitHub + go live on Firebase

This is the only deployment path you need. Run everything from a single terminal on your own machine, inside the `all-star-fc-website/` folder.

## 0. Clean up sandbox artifacts (one time)

These two items shouldn't ship and they may still be in the folder:

```bash
cd path/to/all-star-fc-website
rm -rf .git all-star-fc.bundle
```

`.git/` only needs to go if it's the broken sandbox copy. If you've already initialised git on your machine, leave it alone.

## 1. Initialise git (skip if already done)

```bash
git init -b main
git config user.email "ishwor.kunwor93@gmail.com"
git config user.name  "Ishwor Kunwor"
echo "all-star-fc.bundle" >> .gitignore
echo ".firebase/"        >> .gitignore
git add .
git commit -m "All Star FC: sponsors page, training schedule, hosting polish"
```

## 2. Push to GitHub

Create an empty repo on github.com (no README, no license), then:

```bash
git remote add origin git@github.com:YOUR-USERNAME/all-star-fc-website.git
git push -u origin main
```

## 3. Deploy to Firebase Hosting

You only need to do `npm install -g firebase-tools` and `firebase login` once per machine.

```bash
firebase use all-star-fc-website
firebase deploy --only hosting,firestore:rules
```

Live URLs after a successful deploy:

- https://all-star-fc-website.web.app/
- https://all-star-fc-website.firebaseapp.com/

## 4. One-time Firebase project setup

The site code can't fix this — it has to happen in the [Firebase Console](https://console.firebase.google.com/) for project `all-star-fc-website`. Follow `FIREBASE_SETUP.md` once for:

1. **Authentication → Sign-in method** → enable **Email/Password**.
2. **Authentication → Settings → Authorized domains** → add:
   - `all-star-fc-website.web.app`
   - `all-star-fc-website.firebaseapp.com`
   - your GitHub Pages URL if you mirror there
3. **Firestore Database** → create in production mode, region `eur3`.
4. **Firestore → Rules** → already published by step 3 above (`firebase deploy --only firestore:rules`).

## 5. Custom domain (optional)

If you buy a domain like `allstarfc.fi`:

1. Firebase Console → **Hosting → Add custom domain**.
2. Follow the DNS verification steps Firebase gives you (TXT then A records).
3. Add the new domain to **Authentication → Settings → Authorized domains** so login keeps working.
4. Update `og:url` and `sitemap.xml` in the repo to use the custom domain.

## 6. What ships in this version

| File / page | What it does |
|---|---|
| `index.html` | Hero, ticker, club profile, fixtures snapshot, executive committee, sponsors strip |
| `about.html` | Full club story, values, honours, executive committee |
| `teams.html` | Senior squad as compact text list (22 players, no photos) |
| `fixtures.html` | Tournament schedule **+ weekly training schedule** with venue map link |
| `gallery.html` | Tournament folders — photos hidden until clicked |
| `sponsors.html` | **NEW** dedicated sponsors + 3-tier sponsorship + become-a-partner CTA |
| `contact.html` | Contact form + join CTA |
| `dashboard.html` | Manager-only roster admin (noindex) |
| `404.html` | Branded not-found page |
| `sitemap.xml` + `robots.txt` | Search engine indexing + sitemap |
| `firebase.json` | Hosting config with cache headers, security headers, clean URLs, 404 rewrite |

## 7. Smoke test before deploying

Run a quick local server and click through every page:

```bash
python3 -m http.server 8080
# then open http://localhost:8080/index.html
```

Check, in order:
1. Header has Sponsors in the nav.
2. Footer shows 4 columns + a copyright strip.
3. `sponsors.html` shows 3 sponsor cards, 3 tier cards, and a "Become an All Star FC partner" CTA.
4. `fixtures.html` shows a "Training week" section with 4 day cards and a "Venue: Talin Liikuntapuisto" link.
5. `teams.html` lists 22 players as a clean text grid with no photos.
6. `dashboard.html` (after logging in as manager) shows the roster table.

If any of those fail, do not deploy — fix locally first.
