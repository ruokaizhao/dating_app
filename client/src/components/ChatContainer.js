import React from 'react'
import ChatHeader from './ChatHeader'
import ChatList from './ChatList'
import MatchList from './MatchList'

function ChatContainer({ user, matchUsers, setMatchUsers }) {
  return (
    <div className="chat-container">
      <ChatHeader user={user} />
      <div>
        <button className="option">Matches</button>
        <button className="option">Chat</button>
      </div>
      
      <MatchList user={user} matchUsers={matchUsers} setMatchUsers={setMatchUsers} />
      <ChatList />


      
      

    </div>
  )
}

export default ChatContainer