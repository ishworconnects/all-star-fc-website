# Push to GitHub + go live

**Do all of this in a single terminal on your own machine, inside the `all-star-fc-website/` folder.** I deliberately do not run git from the sandbox anymore, so there is only ever one git repo and one set of files — the ones on your computer.

## 0. Clean up artifacts from the sandbox

Before anything else, delete these two things if you see them in the folder:

- `all-star-fc.bundle` — 87 MB leftover, safe to remove.
- `.git/` — if it exists and is broken/empty.

```bash
cd path/to/all-star-fc-website
rm -rf .git all-star-fc.bundle
```

## 1. Initialise git (first time only)

Skip this section if you already have a git repo here.

```bash
git init -b main
git config user.email "ishwor.kunwor93@gmail.com"
git config user.name  "Ishwor Kunwor"
echo "all-star-fc.bundle" >> .gitignore   # just in case it ever reappears
git add .
git commit -m "All Star FC: add manager dashboard, click-only gallery, fix auth"
```

## 2. Point at GitHub

Create an empty repository on github.com (no README, no license). Copy the SSH or HTTPS URL it gives you, then:

```bash
git remote add origin git@github.com:YOUR-USERNAME/all-star-fc-website.git
# or: git remote add origin https://github.com/YOUR-USERNAME/all-star-fc-website.git
git push -u origin main
```

## 3. Turn on GitHub Pages (optional)

In the GitHub repo: **Settings → Pages → Build and deployment → Source = Deploy from a branch → Branch = `main`, Folder = `/ (root)`**. Within a minute your site is live at:

```
https://YOUR-USERNAME.github.io/all-star-fc-website/
```

Add that URL to **Firebase Console → Authentication → Settings → Authorized domains**, otherwise signup/login will throw `auth/unauthorized-domain`.

## 4. Firebase Hosting (optional, recommended for a clean URL)

```bash
npm install -g firebase-tools     # one-time, if you don't have it
firebase login
firebase use all-star-fc-website
firebase deploy --only hosting
firebase deploy --only firestore:rules
```

Your site will be live at:

- https://all-star-fc-website.web.app/
- https://all-star-fc-website.firebaseapp.com/

## 5. Before signup/login actually works

The code alone doesn't fix auth — the Firebase project has to be configured. Follow **`FIREBASE_SETUP.md`** sections 1 and 2 once:

1. Authentication → Sign-in method → enable **Email/Password**.
2. Authentication → Settings → Authorized domains → add your live URL(s).
3. Firestore Database → create in production mode, region `eur3`.
4. Firestore → Rules → publish the contents of `firebase/firestore.rules`.

After that, register yourself as Manager from the website (your email `ishwor.kunwor93@gmail.com` is already in the allowlist), then `dashboard.html` opens the roster.
