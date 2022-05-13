import React from 'react'
import ChatInput from './ChatInput'

function Chat({ user, recipientId }) {
  return (
    <div>
      <ChatInput user={user} recipientId={recipientId} />
    </div>
  )
}

export default Chat