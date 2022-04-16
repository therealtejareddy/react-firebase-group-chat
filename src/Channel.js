import React, {useState, useEffect, useRef} from 'react'
import {onSnapshot,query,collection, orderBy, limit, addDoc, serverTimestamp} from "firebase/firestore"

function Channel({user=null, db=null}) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const inputRef = useRef();
    const bottomListRef = useRef();

    const { uid, displayName, photoURL } = user;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);
    
    useEffect(() => {
      if(db){
          const colRef = collection(db, 'messages');
          const q = query(colRef,orderBy('createdAt'), limit(100));
          onSnapshot(q,snapshot => {
              const data = snapshot.docs.map(doc => ({
                  ...doc.data(),
                  id: doc.id
              }))
              setMessages(data)
          })
          
      }

    }, [db])
    const handleChange = (e) => {
        setMessage(e.target.value);
    }
    const handleSubmit = e => {
        e.preventDefault();
        const colRef = collection(db, 'messages');;
        addDoc(colRef,{
            text: message,
            createdAt: serverTimestamp(),
            uid, displayName, photoURL
        })
        setMessage('')
        bottomListRef.current.scrollIntoView({ behavior: 'smooth' });

    }
  return (
    <div>
    <ul>
    {
        messages.map(msg => (
            <li key={msg.id}>{msg.displayName}{msg.text}</li>
        ))
    }
    </ul>
    <div ref={bottomListRef}></div>
    <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={handleChange} ref={inputRef}></input>
        <input type="submit" value="Send" disabled={!message}></input>
    </form>
    </div>
  )
}

export default Channel