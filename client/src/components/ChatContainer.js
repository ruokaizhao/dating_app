import React from 'react'
import ChatHeader from './ChatHeader'
import ChatList from './ChatList'
import MatchList from './MatchList'

function ChatContainer({ user }) {
  return (
    <div className="chat-container">
      <ChatHeader user={user} />
      <div>
        <button className="option">Matches</button>
        <button className="option">Chat</button>
      </div>
      
      <MatchList />
      <ChatList />


      
      

    </div>
  )
}

export default ChatContainer