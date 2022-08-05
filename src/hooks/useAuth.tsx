import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from 'firebase/auth';

import initFirebase from '@/lib/firebase/initFirebase';
import { removeTokenCookie, setTokenCookie } from '@/lib/auth/tokenCookies';

initFirebase();

type AuthContextType = {
  user: User | null;
  authenticated: boolean;
  signInWithGoogle: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  authenticated: false,
  signInWithGoogle: () => null,
  signOut: () => null,
});

type AuthProviderType = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderType) => {
  const auth = getAuth();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const token = await user.getIdToken();

        setTokenCookie(token);
        setUser(user);
      } else {
        removeTokenCookie();
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const signInWithGoogle = async () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(result => {
        setUser(result.user);
      })
      .catch(error => {
        console.log('ERROR', error);
      });
  };

  const signOut = () => {
    removeTokenCookie();

    auth
      .signOut()
      .then(() => {
        router.push('/');

        setUser(null);
      })
      .catch(error => console.log(error));
  };

  return (
    <AuthContext.Provider
      value={{ user, authenticated: !!user, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};