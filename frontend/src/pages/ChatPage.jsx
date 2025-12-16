import React from 'react'
import {useAuthStore} from "../store/useAuthStrore.js";

function ChatPage() {

  const {logout} = useAuthStore();

  return (
    <div className='z-10'>
      <p>ChatPage</p>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default ChatPage