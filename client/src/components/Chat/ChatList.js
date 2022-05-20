import React, { useEffect, useState } from 'react'

function ChatList({ listMessage, matchUsers, user, setDisplayChat, setRecipient, showUnreadMessages, setShowUnreadMessages }) {
  const [lastReadAt, setLastReadAt] = useState('')

  const pair_id = listMessage[0]['message']['pair_id']

  const recipientId = 
    listMessage[0]['message']['sender_id'] === user.id ? 
    listMessage[0]['message']['recipient_id'] : 
    listMessage[0]['message']['sender_id']

  const recipient = matchUsers.find((matchUser) => matchUser.id === recipientId)

  const newMessages = lastReadAt ? listMessage.filter((message) => message.message.created_at > lastReadAt).length : listMessage.length
  const numberOfUnReadMessages = newMessages === 100 ? "99+" : newMessages

  useEffect(() => {
    if (user.id) {
      fetch(`/api/users/${user.id}/matches/${recipientId}`)
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => setLastReadAt(data.last_read_at))
        }
      })
    }    
  }, [user.id, recipientId, setLastReadAt, listMessage, showUnreadMessages])

  function handleClick() {
    setShowUnreadMessages({...showUnreadMessages, [pair_id]: false})
    setDisplayChat(true)
    setRecipient(recipient)
  }

  return (
    <div className="chat-list" onClick={handleClick}>
      <div className="chat-list-img-name">
        <img src={recipient.url1} className="profile-photo" alt="profile" />
        <div>
          <h3>{recipient.first_name}</h3>
          <p>{listMessage[0]['message']['content']}</p>
        </div>
      </div> 
      {showUnreadMessages[pair_id] && newMessages !== 0 && <p className="unread-messages">{numberOfUnReadMessages}</p>}     
            
    </div>
  )
}

export default ChatList