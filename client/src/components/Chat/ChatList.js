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

  const newMessages = listMessage.filter((message) => message.message.created_at > message.message.last_read_at).length
  const numberOfUnReadMessages = newMessages === 100 ? "99+" : newMessages === 0 ? null : newMessages

  function handleClick() {
    setDisplayChat(true)
    setRecipient(recipient)
  }

  console.log(newMessages)

  return (
    <div className="chat-list" onClick={handleClick}>
      <div className="chat-list-img-name">
        <img src={recipient.url1} className="profile-photo" alt="profile" />
        <div>
          <h3>{recipient.first_name}</h3>
          <p>{listMessage[0]['message']['content']}</p>
        </div>
      </div>      
      <p className="unread-messages">{numberOfUnReadMessages}</p>      
    </div>
  )
}

export default ChatList