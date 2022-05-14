import React, { useState } from 'react'
import Chat from './Chat'
import ChatHeader from './ChatHeader'
import ChatList from './ChatList'
import MatchList from './MatchList'

function ChatContainer({ user, matchUsers, setMatchUsers }) {
  const [matchChatDisplay, setMatchChatDisplay] = useState(0)
  const [recipientId, setRecipientId] = useState(null)
  const [recipientName, setRecipientName] = useState(null)

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
      recipientName={recipientName}  />}


      
      

    </div>
  )
}

export default ChatContainer