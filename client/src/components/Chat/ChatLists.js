import React, { useEffect, useState } from 'react'
import ChatList from './ChatList'

function ChatLists({ user, matchUsers, setDisplayChat, setRecipient, cable, showUnreadMessages, setShowUnreadMessages }) {
  const [listMessages, setListMessages] = useState([])
  

  useEffect(() => {
    if (user.id) {
      fetch(`/api/users/${user.id}/message_histories`)
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setListMessages(data)
            data.forEach((listMessage) => {
              setShowUnreadMessages({
                ...showUnreadMessages, [listMessage[0].message.pair_id]: true
              })
            })
          })
        }
      })
    }    
  }, [user.id])

  useEffect(() => {
    if (user.id) {
      cable.subscriptions.create
      (
        {
          channel: 'ChatlistsChannel',
          user_id: user.id
        },
        {
          received: () => {
            fetch(`/api/users/${user.id}/message_histories`)
            .then((r) => {
              if (r.ok) {
                r.json().then((data) => setListMessages(data))
              }
            })
          }
        }
      )
    }    
  }, [user.id, setListMessages, cable.subscriptions])



  return (
    <div className="chat-lists">
      {listMessages.map((listMessage, index) => {
        return (
          <ChatList 
            key={index} 
            listMessage={listMessage} 
            matchUsers={matchUsers} 
            user={user}
            showUnreadMessages={showUnreadMessages}
            setShowUnreadMessages={setShowUnreadMessages}
            setDisplayChat={setDisplayChat}
            setRecipient={setRecipient} />
        )
      })}
    </div>
  )
}

export default ChatLists