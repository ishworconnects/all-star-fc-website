# Firebase Auth Setup (All Star FC)

This website now uses Firebase for secure portal signup/login.

## 1. Create Firebase project
- Go to [Firebase Console](https://console.firebase.google.com/).
- Create/select your project.
- Add a Web App and copy its config values.

## 2. Enable Authentication
- Open `Authentication` -> `Sign-in method`.
- Enable `Email/Password`.
- Open `Authentication` -> `Settings` -> `Authorized domains`.
- Make sure these domains are listed when you test:
  - `localhost`
  - `127.0.0.1`
  - `ishworconnects.github.io`
  - `all-star-fc-website.web.app`
  - `all-star-fc-website.firebaseapp.com`

## 3. Enable Firestore
- Open `Firestore Database`.
- Create database in production mode.
- Set collection name to `club_users` (default in this project), or change `profileCollection` in `assets/js/firebase-config.js`.

## 4. Apply security rules
- In Firestore Rules, paste contents of:
  - `firebase/firestore.rules`
- Publish rules.

## 5. Add project config
- Edit `assets/js/firebase-config.js`:
  - `apiKey`
  - `authDomain`
  - `projectId`
  - `appId`
  - (optional) `storageBucket`, `messagingSenderId`
  - (optional) `managerAllowlist` with approved manager emails
- For GitHub Pages, this is a public web-app config, not a server secret.
- In Google Cloud Console, restrict the API key to your Firebase web app referrers, for example:
  - `https://ishworconnects.github.io/*`
  - `http://127.0.0.1:*/*` for local testing
- If GitHub already flagged an older key value, rotate the key in Google Cloud and update this file with the new restricted key.

## 6. Test portal
- Open `index.html` or any site page with the header portal.
- Create a test account and verify:
  - Signup creates Firebase Auth user
  - Registration profile is saved in Firestore `club_users/{uid}`
  - Stored fields include safe profile values such as `uid`, `name`, `email`, `role`, `status`, `registrationSource`, `registrationSubmittedAt`, and `lastLoginAt`
  - Passwords stay in Firebase Auth only and are not stored in Firestore
  - Login checks role correctly
  - If a profile document is ever missing, login restores it for the same account
