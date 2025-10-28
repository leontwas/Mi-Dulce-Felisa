import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDLNZ61EzAzVs6O-ZunCj72b8QLkU1zEQc",
  authDomain: "midulcefelisa.firebaseapp.com",
  projectId: "midulcefelisa",
  storageBucket: "midulcefelisa.firebasestorage.app",
  messagingSenderId: "429147326957",
  appId: "1:429147326957:web:ef7cd0f97b39d4497b7fe4",
  measurementId: "G-DTN8ZK2W4V"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
