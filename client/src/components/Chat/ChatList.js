import React from 'react'

function ChatList({ listMessage, matchUsers, user, setDisplayChat, setRecipient }) {

  const recipientId = 
    listMessage[0]['message']['sender_id'] === user.id ? 
    listMessage[0]['message']['recipient_id'] : 
    listMessage[0]['message']['sender_id']

  const recipient = matchUsers.find((matchUser) => matchUser.id = recipientId)

  function handleClick() {
    setDisplayChat(false)
    setDisplayChat(true)
    setRecipient(recipient)
  }



  return (
    <div className="chat-list" onClick={handleClick}>
      <img src={recipient.url1} className="profile-photo" alt="profile" />
      <p>{listMessage[listMessage.length - 1]['message']['content']}</p>
    </div>
  )
}

export default ChatList