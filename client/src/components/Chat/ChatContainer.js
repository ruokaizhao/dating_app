import React, { useEffect, useState } from 'react'
import Chat from './Chat'
import ChatHeader from './ChatHeader'
import ChatList from './ChatList'
import MatchList from './MatchList'

function ChatContainer({ user, matchUsers, setMatchUsers, cable }) {
  const [matchChatDisplay, setMatchChatDisplay] = useState(0)
  const [recipientId, setRecipientId] = useState(null)
  const [recipientName, setRecipientName] = useState(null)
  const [messages, setMessages] = useState([])

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
      
      {matchChatDisplay === 0 && 
      <MatchList 
        user={user} 
        cable={cable}
        matchUsers={matchUsers} 
        setMatchUsers={setMatchUsers} 
        setMatchChatDisplay={setMatchChatDisplay} 
        setRecipientId={setRecipientId} 
        setRecipientName={setRecipientName} />}

      {matchChatDisplay === 1 && 
      <ChatList />}

      {matchChatDisplay === 2 && 
      <Chat 
      user={user} 
      recipientId={recipientId} 
      recipientName={recipientName}
      messages={messages}
      cable={cable}
      setMessages={setMessages} />}


      
      

    </div>
  )
}

export default ChatContainer