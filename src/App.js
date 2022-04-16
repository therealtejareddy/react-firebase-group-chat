import './App.css';
import React, {useState, useEffect} from 'react'
import Button from './Button';
import Channel from './Channel';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBorKECXzONSMvH13hDF-CzTXRO9XZvYZE",
  authDomain: "react-chatfire.firebaseapp.com",
  projectId: "react-chatfire",
  storageBucket: "react-chatfire.appspot.com",
  messagingSenderId: "264254550819",
  appId: "1:264254550819:web:897a2b54538a7118635296"
};

// Initialize Firebase


function App() {
  const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
  const [user, setUser] = useState(()=>auth.currentUser)
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, user => {
      if(user){
        setUser(user);
      }else {
        setUser(null);
      }
    })
  
    return subscribe
  }, [auth])
  
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider);
  } 

  const signout = async () => {
    await signOut(auth);
  }
  return (
    <div className="App">
      {user ? (
        <>
          "Welcome"
          <Button onClick={signout}>Sign Out</Button>
          <Channel user={user} db={db}></Channel>
        </>
      ) : <Button onClick={signInWithGoogle}>Sign In with Google</Button>}
    </div>
  );
}

export default App;
