import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDV2a5fUmYT5auX7lc2f2ZWoAGyf2lKFWc",
  authDomain: "swasthya-42ae5.firebaseapp.com",
  projectId: "swasthya-42ae5",
  storageBucket: "swasthya-42ae5.firebasestorage.app",
  messagingSenderId: "271708715566",
  appId: "1:271708715566:web:b1e23f2dd289915c1cbdbf",
  measurementId: "G-P3RZMGVLY6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { app, auth };
