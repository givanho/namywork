import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import app, { auth } from "./firebase";
import { useNavigation } from '@react-navigation/native';


import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  getAuth,
  sendPasswordResetEmail,

} from "firebase/auth";
import {getApp,initializeApp} from 'firebase/app';


const UserContext = createContext();

export function AuthContextProvider({ children }) {

    const apps = getApp();
  const auth = getAuth(apps);
  const [user, setUser] = useState({});



  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () =>{
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    signInWithPopup(auth, provider);
    
  };

  const logout = () => {
    return signOut(auth);
    
  };
const forgotPassword = (email) =>{
  return sendPasswordResetEmail(auth, email);
}
 

 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    
    });
    return () => {
      unsubscribe();
    };
  }, []);
  

  return (
    <UserContext.Provider
      value={{
        createUser,
        googleSignIn,
        user,
        logout,
        signIn,
        forgotPassword,
      }}
    >
     
      {children}
    </UserContext.Provider>
  );
}
//the end

export const UserAuth = () => {
  return useContext(UserContext);
};