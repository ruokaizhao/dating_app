import React, { useState } from 'react'
import Chat from './Chat'
import ChatHeader from './ChatHeader'
import ChatList from './ChatList'
import MatchList from './MatchList'

function ChatContainer({ user, matchUsers, setMatchUsers, cable }) {
  const [matchChatDisplay, setMatchChatDisplay] = useState(false)
  const [recipient, setRecipient] = useState({})
  const [messages, setMessages] = useState([])
  const [displayChat, setDisplayChat] = useState(false)

  function handleClick(option) {
    setMatchChatDisplay(option)
  }

  return (
    <div className="chat-container">
      <ChatHeader user={user} />
      <div>
        <button className="option" onClick={() => handleClick(0)}>Matches</button>
        <button className="option" onClick={() => handleClick(1)}>Chat</button>
      </div>

      <div className="match-chat-list-container">
        {matchChatDisplay 
        ? 
        <ChatList />
        :
        <MatchList 
          user={user} 
          cable={cable}
          matchUsers={matchUsers} 
          setMatchUsers={setMatchUsers} 
          setDisplayChat={setDisplayChat}
          setRecipient={setRecipient} />}

        {displayChat && 
        <Chat 
          user={user} 
          setDisplayChat={setDisplayChat}
          recipient={recipient} 
          messages={messages}
          cable={cable}
          setMessages={setMessages} />}  
      </div>
    </div>
  )
}

export default ChatContainer