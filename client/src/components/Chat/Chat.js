import React, { useEffect } from 'react'
import ChatInput from './ChatInput'

function Chat({ user, recipientId, recipientName, cable, messages, setMessages }) {

  useEffect(() => {
    if (user.id) {
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
    }    
  }, [user.id])

  useEffect(() => {
    if (user.id) {
      cable.subscriptions.create
      (
        {
          channel: 'ChatsChannel',
          user_id: user.id
        },
        {
          received: () => {
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
          }
        }
      )
    }
  }, [user.id])




  return (
    <div>
      {messages.map((message, index) => {
        return (
          <p key={index}>{message.content}</p>
        )
      })}
      <ChatInput user={user} recipientId={recipientId} messages={messages} setMessages={setMessages} cable={cable} />
    </div>
  )
}

export default Chat