import React, { useEffect, useState } from 'react'
import ChatList from './ChatList'

function ChatLists({ user, matchUsers }) {
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
    <div>
      {listMessages.map((listMessage, index) => {
        return (
          <ChatList key={index} listMessage={listMessage} matchUsers={matchUsers} />
        )
      })}
    </div>
  )
}

export default ChatLists