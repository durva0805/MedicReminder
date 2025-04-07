import { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function useAuth() {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    user,
    loading,
    error,
    logout,
  };
}
