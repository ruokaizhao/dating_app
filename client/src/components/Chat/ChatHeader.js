import React from 'react'

function ChatHeader({ user }) {
  return (
    <div className="chat-header">
      <img className="profile-photo" src={user.url1} alt="profile-photo" />
      <h1>{user.first_name}</h1>
    </div>
  )
}

export default ChatHeader