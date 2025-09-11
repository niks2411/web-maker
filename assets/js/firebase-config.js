/*
  Firebase Web SDK setup (Compat API for simplicity with existing code)
  1) Create a Firebase project at https://console.firebase.google.com
  2) Add a Web App and copy the config object below
  3) Enable Firestore and (optionally) Email/Password Authentication
  4) Replace the firebaseConfig placeholders with your actual keys
*/

// Replace with your Firebase project's config
window.firebaseConfig = {
  apiKey: "AIzaSyBK5IJu_wngMLV-X4fyMEbBcWAet8uo_Ng",
  authDomain: "website-ec4ba.firebaseapp.com",
  projectId: "website-ec4ba",
  storageBucket: "website-ec4ba.firebasestorage.app",
  messagingSenderId: "699605577109",
  appId: "1:699605577109:web:8b72eee1d156a416b39a9c",
  measurementId: "G-1F0NEDKC3W"
};

// Initialize Firebase app (idempotent)
(function initFirebaseOnce(){
  if (!window.firebase || !window.firebase.initializeApp) {
    console.error("Firebase SDK not loaded. Ensure the <script> CDN tags are included before this file.");
    return;
  }
  if (!window.firebase.apps || !window.firebase.apps.length) {
    window.firebase.initializeApp(window.firebaseConfig);
  }
  // Expose Firestore and Auth
  window.db = window.firebase.firestore();
  window.firebaseAuth = window.firebase.auth();
})();

// Helper to get server-like timestamp
window.fireTS = function(){
  return window.firebase.firestore.FieldValue.serverTimestamp();
};
