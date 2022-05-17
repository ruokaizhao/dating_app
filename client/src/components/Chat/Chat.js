import React, { useEffect, useState, useRef } from 'react'
import ChatInput from './ChatInput'

function Chat({ user, recipient, cable, setDisplayChat }) {
  const [messages, setMessages] = useState([])
  const endMessageRef = useRef(null)

  useEffect(() => {
    endMessageRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    return function () {
      fetch('/api/matches', {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user.id,
          browsed_user_id: recipient.id,
          last_read_at: Date()
        })
      })
    }
  }, [user.id, recipient.id])

  useEffect(() => {
    if (user.id) {
      fetch(`/api/users/${user.id}/message_history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sender_id: user.id,
          recipient_id: recipient.id,
          // page: 1   
        })
      })
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => setMessages(data))
        }
      })
    }    
  }, [user.id, recipient.id, setMessages])

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
                recipient_id: recipient.id   
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
  }, [user.id, cable.subscriptions, recipient.id, setMessages])

  return (
    <div className="chat-display">
      <div className="chat-display-header">
        <p>{recipient.first_name}</p>
        <div className="close-icon" onClick={() => setDisplayChat(false)}>ⓧ</div>
      </div>     

      <div className="message-list">
        {messages.map((message, index) => {
          return (            
            message.sender_id === user.id 
            ? 
            <div className="sender_message-card" key={index}>
              <p>{message.content}</p>
              <img className="chat-photo" src={user.url1} alt="chat-img" />              
            </div>
            :
            <div className="recipient-message-card" key={index}>
              <img className="chat-photo" src={recipient.url1} alt="chat-img" />
              <p>{message.content}</p>
            </div>                      
          )
        })}
        <div ref={endMessageRef} />
      </div>

      <ChatInput user={user} recipientId={recipient.id} messages={messages} setMessages={setMessages} cable={cable} />
    </div>
  )
}

export default Chat