# Push to GitHub + go live

I could not push or deploy for you from the sandbox — that needs your GitHub / Firebase credentials, which I don't (and shouldn't) have. But every code change is already saved in this folder and a clean git commit is prepared in `all-star-fc.bundle`. Pick **one** of the two paths below depending on what you already have set up.

---

## Path A — If you already have a GitHub repo for this site

(For example `github.com/ishworconnects/all-star-fc-website`.)

Open a terminal **on your own machine**, `cd` into your local clone of that repo, then:

```bash
# 1) Copy the updated files from this workspace folder into your repo.
#    Replace LEFT path with wherever Cowork saved this folder on your Mac/PC.
cp -r "<path-to-this-workspace-folder>/." .

# 2) Make sure the bundle file doesn't end up in your push.
rm -f all-star-fc.bundle

# 3) Stage, commit, and push.
git add -A
git commit -m "Add manager dashboard, fix auth, harden Firestore rules"
git push origin main
```

If GitHub Pages is enabled for this repo (Settings → Pages → Source: `main` / root), your live site updates within ~1 minute at:

**https://ishworconnects.github.io/**  *(the URL from your FIREBASE_SETUP.md)*

Do a hard refresh (Ctrl/Cmd+Shift+R) once the build finishes.

---

## Path B — If you DON'T have a GitHub repo yet

On your own machine, inside an empty folder:

```bash
# 1) Import the bundle I created (this gives you a ready-to-push repo).
git clone "<path-to-this-workspace-folder>/all-star-fc.bundle" all-star-fc-website
cd all-star-fc-website

# 2) Point it at a new GitHub repo you've just created under your account
#    (use the "Create a new repository" button on github.com, don't initialise it with a README).
git remote remove origin 2>/dev/null
git remote add origin git@github.com:YOUR-USERNAME/all-star-fc-website.git
git branch -M main
git push -u origin main
```

Then in the repo on GitHub: **Settings → Pages → Source = `main` / root**.

The live URL will be `https://YOUR-USERNAME.github.io/all-star-fc-website/` within ~1 minute.

---

## Path C — Firebase Hosting (fastest, cleanest URL)

`firebase.json` already points Hosting at this folder, and `.firebaserc` points at project `all-star-fc-website`. Once you've pushed the code (Path A or B), from your local copy run:

```bash
npm install -g firebase-tools    # one-time
firebase login                   # opens a browser to your Google account
firebase use all-star-fc-website
firebase deploy --only hosting
```

That gives you a live URL like:

- **https://all-star-fc-website.web.app/**
- **https://all-star-fc-website.firebaseapp.com/**

And, if you haven't yet, run the rules deploy too:

```bash
firebase deploy --only firestore:rules
```

---

## Before ANY of those URLs actually work for sign-in

The code change alone doesn't fix auth — the Firebase project has to be configured. Follow [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) steps 1 and 2 **once**:

1. Authentication → Sign-in method → enable **Email/Password**.
2. Authentication → Settings → Authorized domains → add your live URL(s).
3. Firestore Database → Create database → production mode → region `eur3`.
4. Firestore → Rules → publish the contents of `firebase/firestore.rules`.

Without these, the Sign in / Register form will come up but will show errors like "Email/password authentication is not enabled yet" or `firestore/permission-denied`. That would be a Firebase Console issue, not a code issue.

---

## What to do with `all-star-fc.bundle`

It's an 87 MB portable snapshot of the full commit. You should:

- Use it once for Path B, then **delete it**.
- Make sure it never gets committed (add `all-star-fc.bundle` to `.gitignore` before your first `git add -A`).

I wasn't able to remove the bundle from within the sandbox — this mount doesn't allow me to unlink files — so the cleanup is on you.
