import React from 'react'

function ChatHeader({ user }) {
  return (
    <div className="chat-header">
      <div className="chat-header-photo-name">
        <img className="profile-photo" src={user.url1} alt="profile" />
        <h1>{user.first_name}</h1>    
      </div>
      <div className="menu-icon">
        <div></div>
        <div></div>
        <div></div>
      </div>

    </div>
  )
}

export default ChatHeader