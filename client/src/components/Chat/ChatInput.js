import React, { useState } from 'react'

function ChatInput({ user, recipientId, messages, setMessages }) {
  const [chatInput, setChatInput] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (chatInput !== '') {
      fetch(`/api/users/${user.id}/create_message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sender_id: user.id,
          recipient_id: recipientId,
          content: chatInput
        })
      })
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setChatInput('')
            setMessages([...messages, data])
          })
        }
      })
    }    
  }

  return (
    <div className="chat-input">
      <form onSubmit={handleSubmit}>
        <textarea 
          name="chat_input" 
          value={chatInput}
          rows="2"
          onChange={(e) => setChatInput(e.target.value)} />
        <button className="secondary-button">Send</button>
      </form>
    </div>
  )
}

export default ChatInput