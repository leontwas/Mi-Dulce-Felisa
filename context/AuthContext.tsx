import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { auth, db } from '../config/firebaseConfig';
import { AuthContextType, User } from '../types';

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  resetPassword: async () => {}
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'Usuario',
          email: firebaseUser.email || ''
        };
        setUser(userData);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Intentar cargar datos adicionales desde Firestore
    try {
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (userDoc.exists()) {
        const userDataFromFirestore = userDoc.data();
        const userData: User = {
          id: firebaseUser.uid,
          name: userDataFromFirestore.name || firebaseUser.displayName || 'Usuario',
          email: firebaseUser.email || '',
          phone: userDataFromFirestore.phone || undefined,
          address: userDataFromFirestore.address || undefined
        };
        setUser(userData);
      } else {
        // Si no existe el documento en Firestore, usar datos básicos
        const userData: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'Usuario',
          email: firebaseUser.email || ''
        };
        setUser(userData);
      }
    } catch {
      const userData: User = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || 'Usuario',
        email: firebaseUser.email || ''
      };
      setUser(userData);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const register = async (email: string, password: string, name: string, phone?: string, address?: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const userData: User = {
      id: firebaseUser.uid,
      name: name,
      email: firebaseUser.email || '',
      phone: phone,
      address: address
    };

    // Guardar datos adicionales en Firestore
    await setDoc(doc(db, 'users', firebaseUser.uid), {
      name,
      email: firebaseUser.email,
      phone: phone || null,
      address: address || null,
      createdAt: new Date()
    });

    setUser(userData);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);