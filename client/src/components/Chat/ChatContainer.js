import React, { useState } from 'react'
import Chat from './Chat'
import ChatLists from './ChatLists'
import MatchLists from './MatchLists'

function ChatContainer({ user, matchUsers, setMatchUsers, cable, chatContainerRef }) {
  const [matchChatDisplay, setMatchChatDisplay] = useState(0)
  const [recipient, setRecipient] = useState({})  
  const [showUnreadMessages, setShowUnreadMessages] = useState({})

  return (
    <div className="chat-container" ref={chatContainerRef}>
      <div>
        <button className="option" onClick={() => setMatchChatDisplay(0)}>Matches</button>
        <button className="option" onClick={() => setMatchChatDisplay(1)}>Chat Lists</button>
      </div>

      <div className="match-chat-list-container">
        {matchChatDisplay === 0
        &&
        <MatchLists
          user={user} 
          cable={cable}
          showUnreadMessages={showUnreadMessages}
          setShowUnreadMessages={setShowUnreadMessages}
          matchUsers={matchUsers} 
          setMatchUsers={setMatchUsers} 
          setMatchChatDisplay={setMatchChatDisplay}
          setRecipient={setRecipient} />}
        
        {matchChatDisplay === 1 
        &&
        <ChatLists 
          user={user} 
          cable={cable}
          showUnreadMessages={showUnreadMessages}
          setShowUnreadMessages={setShowUnreadMessages}
          matchUsers={matchUsers} 
          setMatchChatDisplay={setMatchChatDisplay}
          setRecipient={setRecipient} />}
        
        {matchChatDisplay === 2
        && 
        <Chat 
          user={user} 
          showUnreadMessages={showUnreadMessages}
          setShowUnreadMessages={setShowUnreadMessages}
          setMatchChatDisplay={setMatchChatDisplay}
          recipient={recipient}
          cable={cable} />}
      </div>
    </div>
  )
}

export default ChatContainer