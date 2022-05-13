import React, { useState } from 'react'

function ChatInput({ user, recipientId }) {
  const [chatInput, setChatInput] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
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