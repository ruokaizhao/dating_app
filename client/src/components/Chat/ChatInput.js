import React, { useState } from 'react'

function ChatInput({ user, recipientId, messages, setMessages }) {
  const [chatInput, setChatInput] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea 
          name="chat_input" 
          value={chatInput}
          rows="5"
          onChange={(e) => setChatInput(e.target.value)} />
        <button className="secondary-button">Send</button>
      </form>
    </div>
  )
}

export default ChatInput