import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, setLogLevel, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAuth, Auth } from "firebase/auth";
import { getAnalytics, Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYbFXjK-D2d34JQZg1mwwO_uwwsvc8-a0",
  authDomain: "portfolio-79b32.firebaseapp.com",
  projectId: "portfolio-79b32",
  storageBucket: "portfolio-79b32.firebasestorage.app",
  messagingSenderId: "167923842336",
  appId: "1:167923842336:web:df07eeb2907735c9de6b45",
  measurementId: "G-40006T3ZFZ"
};


// --- Firebase Initialization ---
let app: FirebaseApp;
let db: Firestore;
let storage: FirebaseStorage;
let auth: Auth;
let analytics: Analytics;

// Initialize Firebase only once
app = initializeApp(firebaseConfig);

// Get the different Firebase services from the single app instance
db = getFirestore(app);
auth = getAuth(app);
analytics = getAnalytics(app);
storage = getStorage(app);

// Enable detailed logging for debugging Firestore issues
setLogLevel('debug');

// Export all the services for use in other parts of your app
export { db, auth, app, analytics, storage };