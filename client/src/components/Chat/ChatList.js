import React from 'react'

function ChatList({ listMessage, matchUsers }) {





  return (
    <div>
      <p>{listMessage[listMessage.length - 1]['message']['content']}</p>
    </div>
  )
}

export default ChatList