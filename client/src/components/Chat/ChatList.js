import React from 'react'

function ChatList({ listMessage, matchUsers, user, setDisplayChat, setRecipient }) {


  if (listMessage.length === 0) {
    return null
  }

  const recipientId = 
    listMessage[0]['message']['sender_id'] === user.id ? 
    listMessage[0]['message']['recipient_id'] : 
    listMessage[0]['message']['sender_id']

  const recipient = matchUsers.find((matchUser) => matchUser.id === recipientId)

  function handleClick() {
    setDisplayChat(true)
    setRecipient(recipient)
  }

  return (
    <div className="chat-list" onClick={handleClick}>
      <img src={recipient.url1} className="profile-photo" alt="profile" />
      <div>
        <h3>{recipient.first_name}</h3>
        <p>{listMessage[listMessage.length - 1]['message']['content']}</p>
      </div>
      
    </div>
  )
}

export default ChatList