import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  getAuth,
  GoogleAuthProvider,
  onIdTokenChanged,
  signInWithPopup,
  User,
} from 'firebase/auth';

import { removeTokenCookie, setTokenCookie } from '@/lib/auth/tokenCookies';
import initFirebase from '@/lib/firebase/initFirebase';

type AuthContextType = {
  user: User | null;
  authenticated: boolean;
  signInWithGoogle: () => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  authenticated: false,
  signInWithGoogle: () => null,
  signOut: () => null,
});

type AuthProviderType = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderType) => {
  const app = initFirebase();
  const auth = getAuth(app);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async user => {
      if (user) {
        const token = await user.getIdToken();

        setTokenCookie(token);
        setUser(user);
      } else {
        removeTokenCookie();
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const signInWithGoogle = async () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(result => {
        setUser(result.user);
        return user;
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
