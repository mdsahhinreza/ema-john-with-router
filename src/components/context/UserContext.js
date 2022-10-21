import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../Firebase/Firebase.init";

export const AuthContext = createContext();
const auth = getAuth(app);

const UserContext = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState({});
  const createUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const signUpWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unSubscribe();
  }, []);

  const authInfo = {
    createUser,
    user,
    setUser,
    signUpWithGoogle,
    signIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
