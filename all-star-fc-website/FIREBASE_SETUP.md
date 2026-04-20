# All Star FC — Auth, Database, and Manager Dashboard Setup

The portal in this site uses **Firebase Authentication** (Email/Password) for sign-in and **Cloud Firestore** for the registration database. There's also a manager-only dashboard at `dashboard.html` that lists every registered user and lets a manager change roles or approve pending accounts.

You only need to do this checklist once per Firebase project. After that, every code change is just a redeploy.

---

## 1. Firebase project basics (one-time)

In the [Firebase Console](https://console.firebase.google.com/) for project **`all-star-fc-website`**:

1. **Authentication → Sign-in method**
   - Enable **Email/Password**.
2. **Authentication → Settings → Authorized domains**
   - Add every domain you'll test or ship from:
     - `localhost`
     - `127.0.0.1`
     - `ishworconnects.github.io` (GitHub Pages)
     - `all-star-fc-website.web.app`
     - `all-star-fc-website.firebaseapp.com`
3. **Firestore Database → Create database**
   - Start in **production mode** (locked rules — we'll publish ours next).
   - Pick a region close to Helsinki (e.g. `eur3` / `europe-west`).

If you see auth working in the browser but Firestore writes failing with `permission-denied`, it's almost always one of these three steps that's missing.

---

## 2. Publish the Firestore security rules (CRITICAL)

The rules in `firebase/firestore.rules` were rewritten so **managers can read the full roster and approve/edit other users**. Without publishing them, the dashboard will load with `permission-denied`.

Two ways to publish:

### Option A — Console (no CLI)
1. Open **Firestore → Rules**.
2. Paste the contents of `firebase/firestore.rules` from this repo.
3. Click **Publish**.

### Option B — Firebase CLI (recommended)
```bash
npm install -g firebase-tools         # one-time
firebase login
firebase use all-star-fc-website
firebase deploy --only firestore:rules
```

Re-run the `deploy` command any time `firebase/firestore.rules` changes.

---

## 3. Bootstrap the first manager (chicken-and-egg)

The new rules say "only managers can read other users." So the very first manager has to either:

**Easiest path:** Sign up through the website with an email already in the `managerAllowlist` in `assets/js/firebase-config.js`. The current allowlist is:
- `allstarfc.helsinki@gmail.com`
- `ishwor.kunwor93@gmail.com` ← your account
- `ishwor.kunwor1993@gmail.com`
- `ishwor.kunwor13@gmail.com`
- `ishworxptr@gmail.com`

Steps:
1. Open the site and click **Register** in the header.
2. Use one of the allowlisted emails, pick **Manager** as the role, choose a strong password.
3. The site creates the Firebase Auth user **and** writes `club_users/{uid}` with `role: "manager"`, `status: "active"`.

If you ever need to promote someone who already exists:
1. Open **Firestore → Data → club_users → {their uid}**.
2. Edit the `role` field to `"manager"` and `status` to `"active"`.
3. They can now log in and use `dashboard.html`.

---

## 4. Deploy the website

The site is plain HTML/CSS/JS — no build step. Deploy it however you already deploy.

### Firebase Hosting
```bash
firebase deploy --only hosting
```
The `firebase.json` in this repo already points hosting at the project root.

### GitHub Pages
Just push to the branch GitHub Pages serves from (probably `main` or `gh-pages`). The cache-busting query strings in the HTML files were bumped to `v=20260419a` so users will pull the new JS on first visit.

---

## 5. Manual test plan

Run these in order in a real browser (Chrome / Firefox). All five should pass before you call it done.

### A. Anonymous visitor sees the portal
1. Open `index.html` (locally via `python3 -m http.server` or via your hosting URL).
2. Header shows **Log in** and **Register** buttons.
3. Open DevTools → Console. There should be **no red errors**. Acceptable warnings: nothing related to `firebase` or `allStarPortal`.

### B. Register a new player
1. Click **Register** → fill form with a new email + password, role = **Player**.
2. Submit. Status line should turn green: "Account created. You can now log in."
3. In Firebase Console → **Authentication → Users**, the new email appears.
4. In **Firestore → club_users**, a new doc exists with `role: "player"`, `status: "active"`.

### C. Log in as that player
1. Click **Log in**, leave Role on **Auto-detect**, enter the same credentials.
2. Status: "Login successful as Player."
3. Header replaces the Login/Register buttons with a **session chip** showing the player's name + "Player" + Sign out.
4. **No** "Manager dashboard" link appears (correct — they're not a manager).

### D. Log in as a manager → dashboard works
1. Sign out, then log in with a manager account (one from the allowlist that you've registered).
2. Header chip now shows the role **Manager** and a **Manager dashboard** link.
3. Click **Manager dashboard** → `dashboard.html` opens.
4. The roster table lists every `club_users` doc with role and status dropdowns.
5. Change a player's status from `active` to `pending`, click **Save**. Row shows "Saved." and the change is reflected in Firestore Console.

### E. Non-manager cannot read the dashboard
1. Sign out, log in as the player.
2. Manually navigate to `dashboard.html`.
3. Page shows "Only users with the Manager role can access this dashboard." (the JS check) and the underlying Firestore query returns `permission-denied` (the rules check) — defense in depth.

If A–E all pass, auth + registration + dashboard are working in production.

---

## 6. Common errors & where to look

| Symptom in browser | Likely fix |
|---|---|
| "Portal auth is not configured yet" | `assets/js/firebase-config.js` is missing or `apiKey` is blank. |
| `auth/operation-not-allowed` | Enable **Email/Password** in Firebase Auth (step 1). |
| `auth/unauthorized-domain` | Add the current domain in Authentication → Settings → Authorized domains. |
| `firestore/permission-denied` on signup | Rules from `firebase/firestore.rules` not published. Re-do step 2. |
| Dashboard loads but says "Could not load roster: permission-denied" | Your account's `club_users` doc doesn't have `role: "manager"` and `status: "active"`. Fix it in Firestore Console. |
| Header still shows old Log in / Register after login | Hard-refresh (Cmd/Ctrl+Shift+R) — the cached `site.js` is stale. The new `?v=20260419a` cache-buster prevents this on subsequent deploys. |

---

## 7. Files touched in this update

- `assets/js/firebase-config.js` — added `ishwor.kunwor93@gmail.com` to manager allowlist.
- `firebase/firestore.rules` — managers can now read all `club_users` and update other users' role/status.
- `assets/js/site.js`:
  - Login form's Role field is now optional (Auto-detect default), so role mismatch no longer locks people out.
  - `window.allStarPortal` API exposed for session subscriptions.
  - `onAuthStateChanged` listener keeps session in sync across page reloads.
  - New `setupSessionChip()` shows logged-in user + Sign out + Manager link in header.
  - New `renderDashboard()` powers the manager roster page.
- `assets/css/styles.css` — appended styles for the session chip and dashboard table.
- `dashboard.html` — new manager-only page.
- All HTML pages — bumped JS/CSS query strings to `v=20260419a` so the new code is fetched.
