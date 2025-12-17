import React from 'react'
import {useChatStore} from "../store/useChatStore.js";
import BorderAnimatedContainer from '../components/BorderAnimationContainer.jsx';
import PofileHeader from '../components/PofileHeader.jsx';
import ActiveTabSwitch from '../components/ActiveTabSwitch.jsx';
import ChatsList from '../components/ChatsList.jsx';
import ContactList from '../components/ContactList.jsx';
import ChatContainer from '../components/ChatContainer.jsx';
import NoConversationPlaceholder from '../components/NoConversationPlaceholder.jsx';

function ChatPage() {

  const {activeTab,selectedUser} = useChatStore();

  return (
    <div className='relative w-full max-w-6xl h-[650px]'>

      <BorderAnimatedContainer>
        {/* left side */}
        <div className='w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col'>
          <PofileHeader />
          <ActiveTabSwitch />
          

          <div className='flex-1 overflow-auto p-4 space-y-2'>
            {activeTab === "chats" ? <ChatsList /> :<ContactList />}
          </div>

        </div>


        {/* right side */}
        <div className='flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm'>
          {selectedUser ? <ChatContainer />:<NoConversationPlaceholder />}
        </div>

      </BorderAnimatedContainer>
      
    </div>
  );
}

export default ChatPage