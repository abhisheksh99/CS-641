import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  height?: string;
  weight?: string;
  gender?: string;
}

interface AuthContextProps {
  user: UserProfile | null;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string, name: string, height: string, weight: string, gender: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Use a default empty object with type assertions for initial context value
const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.data();
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          height: userData?.height,
          weight: userData?.weight,
          gender: userData?.gender,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const login = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

  const signup = async (email: string, password: string, name: string, height: string, weight: string, gender: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (result.user) {
        await updateProfile(result.user, { displayName: name });
        
        
        await setDoc(doc(db, 'users', result.user.uid), {
          name,
          email,
          height,
          weight,
          gender,
          createdAt: new Date()
        });

        setUser({
          uid: result.user.uid,
          email: result.user.email,
          displayName: name,
          height,
          weight,
          gender,
        });
      }
    } catch (error) {
      console.error('Error in signup:', error);
      throw error;
    }
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextProps;
