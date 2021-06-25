import { createContext, useState, useEffect, ReactNode } from 'react';

import { firebase, auth } from '~/services';

type User = {
  id: string;
  name: string;
  icon: string;
};

type AuthContextType = {
  user: User | undefined;
  signIn: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextType);

type ProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: ProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userData => {
      if (userData) {
        const { displayName, photoURL, uid } = userData;
        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }
        setUser({
          id: uid,
          name: displayName,
          icon: photoURL,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    if (result.user) {
      const { displayName, photoURL, uid } = result.user;
      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.');
      }
      setUser({
        id: uid,
        name: displayName,
        icon: photoURL,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
