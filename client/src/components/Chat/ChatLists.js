import React, { useEffect, useState } from 'react'
import ChatList from './ChatList'

function ChatLists({ user }) {
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

  console.log(listMessages)

  listMessages.map((e) => {
    console.log(e)
  })




  return (
    <div>
      {listMessages.map((listMessage, index) => {
        // <ChatList key={index} listMessage={listMessage} />
        <p>hhh</p>
      })}
    </div>
  )
}

export default ChatLists