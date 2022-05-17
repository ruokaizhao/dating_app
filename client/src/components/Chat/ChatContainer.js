import React, { useState } from 'react'
import Chat from './Chat'
import ChatHeader from './ChatHeader'
import ChatLists from './ChatLists'
import MatchList from './MatchList'

function ChatContainer({ user, matchUsers, setMatchUsers, cable }) {
  const [matchChatDisplay, setMatchChatDisplay] = useState(false)
  const [recipient, setRecipient] = useState({})
  const [messages, setMessages] = useState([])
  const [displayChat, setDisplayChat] = useState(false)

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
          matchUsers={matchUsers} 
          setDisplayChat={setDisplayChat}
          setRecipient={setRecipient} />
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