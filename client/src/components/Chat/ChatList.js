import React from 'react'

function ChatList({ listMessage }) {





  return (
    <div>
      <p>{listMessage[-1].message.content}</p>
    </div>
  )
}

export default ChatList