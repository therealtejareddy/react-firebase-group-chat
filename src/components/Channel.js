import React, {useState, useEffect, useRef} from 'react'
import {onSnapshot,query,collection, orderBy, limit, addDoc, serverTimestamp} from "firebase/firestore"
import Message from './Message';

function Channel({user=null, db=null}) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const inputRef = useRef();
    const dummy = useRef();

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
        dummy.current.scrollIntoView({ behavior: 'smooth' });

    }
  return (
    <div className='mt-14'>
        <div className='flex justify-center text-4xl font-semibold py-6'><h1>
            React⚛ Firebase🔥 Chat
        </h1></div>
        <hr></hr>
        <div>
        {
            messages.map(msg => (
                <Message key={msg.id} text={msg.text} pic={msg.photoURL} at={msg.createdAt} by={msg.displayName}/>
            ))
        }
            
        </div>
        <div ref={dummy}  className='pb-20'></div>
        <div className='fixed bottom-0 w-full'>
            <form onSubmit={handleSubmit} className="flex flex-row justify-between bg-gray-200 py-5 px-10">
                <input type="text" value={message} onChange={handleChange} ref={inputRef} placeholder="Type Your Message..." className="rounded-md outline-none w-full py-2 px-4"></input>
                <input type="submit" value="Send" disabled={!message} className="uppercase font-semibold text-sm py-2 px-4 ml-6 bg-blue-400 rounded-md cursor-pointer"></input>
            </form>
        </div>
    </div>
  )
}

export default Channel