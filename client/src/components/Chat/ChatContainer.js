import React, { useState } from 'react'
import Chat from './Chat'
import ChatHeader from './ChatHeader'
import ChatLists from './ChatLists'
import MatchLists from './MatchLists'

function ChatContainer({ user, matchUsers, setMatchUsers, cable }) {
  const [matchChatDisplay, setMatchChatDisplay] = useState(false)
  const [recipient, setRecipient] = useState({})  
  const [displayChat, setDisplayChat] = useState(false)
  const [showUnreadMessages, setShowUnreadMessages] = useState({})

  return (
    <div className="chat-container">
      <ChatHeader user={user} />
      <div>
        <button className="option" onClick={() => setMatchChatDisplay(false)}>Matches</button>
        <button className="option" onClick={() => setMatchChatDisplay(true)}>Chat</button>
      </div>

      <div className="match-chat-list-container">
        {matchChatDisplay 
        ? 
        <ChatLists 
          user={user} 
          cable={cable}
          showUnreadMessages={showUnreadMessages}
          setShowUnreadMessages={setShowUnreadMessages}
          matchUsers={matchUsers} 
          setDisplayChat={setDisplayChat}
          setRecipient={setRecipient} />
        :
        <MatchLists
          user={user} 
          cable={cable}
          setDisplayChat={setDisplayChat}
          showUnreadMessages={showUnreadMessages}
          setShowUnreadMessages={setShowUnreadMessages}
          matchUsers={matchUsers} 
          setMatchUsers={setMatchUsers} 
          setRecipient={setRecipient} />}

        {displayChat && 
        <Chat 
          user={user} 
          showUnreadMessages={showUnreadMessages}
          setShowUnreadMessages={setShowUnreadMessages}
          setDisplayChat={setDisplayChat}
          recipient={recipient}
          cable={cable} />}  
      </div>
    </div>
  )
}

export default ChatContainer