import React, { useEffect, useState } from 'react'
import ChatInput from './ChatInput'

function Chat({ user, recipientId, recipientName }) {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    fetch(`/api/users/${user.id}/message_history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sender_id: user.id,
        recipient_id: recipientId   
      })
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((data) => setMessages(data))
      }
    })
  }, [])





  return (
    <div>
      {messages.map((message, index) => {
        return (
          <p key={index}>{message.content}</p>
        )
      })}
      <ChatInput user={user} recipientId={recipientId} setMessages={setMessages} />
    </div>
  )
}

export default Chat