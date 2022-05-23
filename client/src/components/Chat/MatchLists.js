import React, { useEffect } from 'react'
import MatchList from './MatchList'

function MatchLists({ user, matchUsers, setMatchUsers, cable, showUnreadMessages, setShowUnreadMessages, setMatchChatDisplay, setRecipient, setShowViewedUser }) {

  useEffect(() => {
    if (user.id) {
      cable.subscriptions.create
      (
        {
          channel: 'UserMatchChannel',
          user_id: user.id
        },
        {
          received: (matchUser) => {
            setMatchUsers([...matchUsers, matchUser])
          }
        }
      )
    }    
  }, [user.id, setMatchUsers, cable.subscriptions, matchUsers])

  useEffect(() => {
    if (user.id) {
      fetch(`/api/users/${user.id}`)
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => setMatchUsers(data))
        }
      })
    }    
  }, [user.id, setMatchUsers])

  return (
    <div className="match-lists">
      {matchUsers.map((matchUser) => {
        return (
          <MatchList 
            key={matchUser.id} 
            user={user} 
            setShowViewedUser={setShowViewedUser}
            matchUser={matchUser}
            setMatchChatDisplay={setMatchChatDisplay}
            setRecipient={setRecipient}
            showUnreadMessages={showUnreadMessages}
            setShowUnreadMessages={setShowUnreadMessages} />        
        )
      })}
    </div>
  )
}

export default MatchLists