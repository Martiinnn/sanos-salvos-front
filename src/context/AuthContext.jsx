import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { firebaseAuth } from '../lib/firebase';

const AuthContext = createContext(null);

function mapFirebaseUser(user) {
  if (!user) return null;
  return {
    id: user.uid,
    email: user.email || '',
    username: user.displayName || (user.email ? user.email.split('@')[0] : ''),
    full_name: user.displayName || '',
    phone: user.phoneNumber || '',
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(mapFirebaseUser(currentUser));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
    setUser(mapFirebaseUser(res.user));
    return mapFirebaseUser(res.user);
  };

  const register = async (data) => {
    const res = await createUserWithEmailAndPassword(firebaseAuth, data.email, data.password);
    const displayName = data.full_name?.trim() || data.username?.trim() || data.email.split('@')[0];
    if (displayName) {
      await updateProfile(res.user, { displayName });
    }
    const refreshedUser = firebaseAuth.currentUser;
    setUser(mapFirebaseUser(refreshedUser));
    return mapFirebaseUser(refreshedUser);
  };

  const logout = async () => {
    await signOut(firebaseAuth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
