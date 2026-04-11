# Firebase Auth Setup (All Star FC)

This website now uses Firebase for secure portal signup/login.

## 1. Create Firebase project
- Go to [Firebase Console](https://console.firebase.google.com/).
- Create/select your project.
- Add a Web App and copy its config values.

## 2. Enable Authentication
- Open `Authentication` -> `Sign-in method`.
- Enable `Email/Password`.

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

## 6. Test portal
- Open `contact.html`.
- Create a test account and verify:
  - Signup creates Firebase Auth user
  - Role record is saved in Firestore `club_users/{uid}`
  - Login checks role correctly
