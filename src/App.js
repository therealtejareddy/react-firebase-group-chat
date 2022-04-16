import './App.css';
import React, {useState, useEffect} from 'react'
import Button from './components/Button';
import Channel from './components/Channel';

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
    <div className="h-screen">
      {user ? (
        <div>
          <div className='flex fixed top-0 h-14 w-full bg-gradient-to-r from-sky-300 to-blue-500 shadow px-16 items-center justify-between'>
            
            <span><h1 className='text-2xl font-semibold'>⚛🔥❤ Chat</h1></span>
            <Button onClick={signout}>Sign Out</Button>
          </div>
          <Channel user={user} db={db}></Channel>
        </div>
      ) : (
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
          <div className='flex justify-center text-4xl font-semibold py-6'><h1>
              React⚛ Firebase🔥 Chat
          </h1></div>
          <Button onClick={signInWithGoogle}>Sign In with Google</Button>
        </div>
      )}
    </div>
  );
}

export default App;
