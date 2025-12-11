import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp, getApps, getApp } from 'firebase/app';
// @ts-ignore - getReactNativePersistence exists in React Native bundle
import { getReactNativePersistence, initializeAuth, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAoWmYiI4UlZsyyElRHQbT-vMHPbEBzbZs",
  authDomain: "midulcefelisa-8a76f.firebaseapp.com",
  projectId: "midulcefelisa-8a76f",
  storageBucket: "midulcefelisa-8a76f.firebasestorage.app",
  messagingSenderId: "196874288667",
  appId: "1:196874288667:web:d734b3c3b132ddb32682be",
  measurementId: "G-J9BZ6EZMLR"
};

// Evitar múltiples inicializaciones de Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Inicializar Auth con manejo de errores
let auth;
try {
  auth = getAuth(app);
} catch (error) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
}

const db = getFirestore(app);

export { app, auth, db };

