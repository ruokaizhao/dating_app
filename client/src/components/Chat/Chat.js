import React, { useEffect, useState, useRef } from 'react'
import ChatInput from './ChatInput'

function Chat({ user, recipient, cable, setMatchChatDisplay, showUnreadMessages, setShowUnreadMessages, prevMatchChatDisplay }) {
  const [messages, setMessages] = useState([])
  const [pairId, setPairId] = useState(null)
  const endMessageRef = useRef(null)  

  useEffect(() => {
    endMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages])

  useEffect(() => {
    return function () {
      if (pairId) {
        setShowUnreadMessages({...showUnreadMessages, [pairId]: true})
      }      
      fetch('/api/matches', {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user.id,
          browsed_user_id: recipient.id,
          last_read_at: Date()
        })
      })
    }
  }, [user.id, recipient.id, pairId])

  useEffect(() => {
    if (user.id) {
      fetch(`/api/users/${user.id}/message_history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sender_id: user.id,
          recipient_id: recipient.id,
          // page: 1   
        })
      })
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setMessages(data)
            setPairId(data[0]['pair_id'])
          })
        }
      })
    }    
  }, [user.id, recipient.id, setMessages])

  useEffect(() => {    
    if (user.id) {
      cable.subscriptions.create
      (
        {
          channel: 'ChatsChannel',
          user_id: user.id,
          recipient_id: recipient.id
        },
        {
          received: (message) => {
            setMessages([...messages, message])
          }
        }
      )
    }
  }, [user.id, cable.subscriptions, recipient.id, setMessages, messages])

  // It's important to add messages in the dependency array, this had been bothering me for days! If messages is not in the dependency array, when component first
  // renders, after user.id gets value, the line 28 useEffect starts fetch data and setMessages(data), but during this time, message is still with its initial value,
  // which is [], and when you access messages in received(data), it is [], and for reasons beyond my understanding, the data within received stays unchanged unless
  // the useEffect wrapping it gets re-called. So now, when you use messages to setMessages([...messages, data]), the messages will always be [], and setMessages
  // will make messages become [data]. To solve this, messages needs to be added in the dependency array, in doing so, after line 28 useEffect sets messages with
  // data coming from backend, the change of messages will cause the useEffect wrapping received re-run, so now, when messages is accessed within received, it's the
  // correct value. And setMessages within received will change the messages, causing the useEffect wrapping received re-run again, which causes the value of messages
  // within received always be the correct value.  

  return (
    <div className="chat-display">
      <div className="chat-display-header">
        <h3>{recipient.first_name}</h3>
        <div className="close-icon" onClick={() => setMatchChatDisplay(prevMatchChatDisplay)}>ⓧ</div>
      </div>  
      <div className="message-list">
        {messages.map((message, index) => {
          return (            
            message.sender_id === user.id 
            ? 
            <div className="sender_message-card" key={index}>
              <p>{message.content}</p>
              <img className="chat-photo" src={user.url1} alt="chat-img" />              
            </div>
            :
            <div className="recipient-message-card" key={index}>
              <img className="chat-photo" src={recipient.url1} alt="chat-img" />
              <p>{message.content}</p>
            </div>                      
          )
        })}
        <div ref={endMessageRef} />
      </div>
      <ChatInput user={user} recipientId={recipient.id} messages={messages} setMessages={setMessages} cable={cable} />
    </div>
  )
}

export default Chat