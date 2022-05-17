import React, { useEffect, useState } from 'react'
import ChatList from './ChatList'

function ChatLists({ user, matchUsers, setDisplayChat, setRecipient }) {
  const [listMessages, setListMessages] = useState([])

  useEffect(() => {
    if (user.id) {
      fetch(`/api/users/${user.id}/message_histories`)
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => setListMessages(data))
        }
      })
    }    
  }, [user.id])



  return (
    <div className="chat-lists">
      {listMessages.map((listMessage, index) => {
        return (
          <ChatList 
            key={index} 
            listMessage={listMessage} 
            matchUsers={matchUsers} 
            user={user}
            setDisplayChat={setDisplayChat}
            setRecipient={setRecipient} />
        )
      })}
    </div>
  )
}

export default ChatLists