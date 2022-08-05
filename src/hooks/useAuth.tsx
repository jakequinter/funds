import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import initFirebase from '@/lib/auth/initFirebase';
import { removeTokenCookie, setTokenCookie } from '@/lib/auth/tokenCookies';

initFirebase();

type AuthContextType = {
  user: any;
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
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async user => {
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
    // removeTokenCookie();
    auth
      .signOut()
      .then(() => {
        router.push('/');
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

export function useAuth() {
  return useContext(AuthContext);
}
