import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
// @ts-ignore - getReactNativePersistence exists in React Native bundle
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
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

console.log('🔥 Inicializando Firebase...');
const app = initializeApp(firebaseConfig);
console.log('✅ Firebase app inicializada');

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
console.log('✅ Firebase Auth inicializada');

const db = getFirestore(app);
console.log('✅ Firestore inicializada');

export { app, auth, db };

