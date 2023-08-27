import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

   const signIn = (email, password) =>  {
    return signInWithEmailAndPassword(auth, email, password)
   }

  const logout = () => {
      return signOut(auth)
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
    <UserContext.Provider value={{ createUser, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
// import React, { createContext, useContext, useEffect, useState, useRef } from "react";

// import app, { auth } from "./firebase";
// import { useNavigation } from '@react-navigation/native';


// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
//   onAuthStateChanged,
//   signOut,
//   getAuth,
//   sendPasswordResetEmail,
//   updatePhoneNumber,
//   updateProfile

// } from "firebase/auth";
// import {getApp} from 'firebase/app';


// const UserContext = createContext();

// export function AuthContextProvider({ children }) {

//     const apps = getApp();
//   const auth = getAuth(apps);
//   const [user, setUser] = useState({});
//   const[errorfire, setErrorFire] = useState('')


//   const createUser = (email, password, displayName, photoURL) => {
//     return createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       return updateProfile(user, { displayName, photoURL })
//       .then(() => {
//         console.log('Profile update successful');
//         // Perform any additional actions
//       })
//       .catch((error) => {
//         console.log('Error updating profile:', error);
//       });
    
//   })
  
// }
  

//   const signIn = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const googleSignIn = () =>{
//     const provider = new GoogleAuthProvider(auth);
//     provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
//     signInWithPopup(auth, provider)
    
//   };

//   const logout = () => {
//     return signOut(auth);
    
//   };
// const forgotPassword = (email) =>{
//   return sendPasswordResetEmail(auth, email);
// }
 

 

// useEffect(() => {
//   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//     console.log(currentUser);
//     setUser(currentUser);
  
//   });
//   return () => {
//     unsubscribe();
//   };
// }, []);

//   return (
//     <UserContext.Provider
//       value={{
//         createUser,
//         googleSignIn,
//         user,
//         logout,
//         signIn,
//         forgotPassword,
//       }}
//     >
     
//       {children}
//     </UserContext.Provider>
//   );
// }


// export const UserAuth = () => {
//   return useContext(UserContext);
// };