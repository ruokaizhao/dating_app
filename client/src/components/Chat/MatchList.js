import React, { useEffect } from 'react'

function MatchList({ user, matchUsers, setMatchUsers, setMatchChatDisplay, setRecipientId, setRecipientName, cable }) {

  function handleClick(id, name) {
    setMatchChatDisplay(2)
    setRecipientId(id)
    setRecipientName(name)
  }

  useEffect(() => {
    if (user.id) {
      cable.subscriptions.create
      (
        {
          channel: 'UserMatchChannel',
          user_id: user.id
        },
        {
          received: () => {
            fetch(`/api/users/${user.id}`)
            .then((r) => {
              if (r.ok) {
                r.json().then((data) => setMatchUsers(data))
              }
            })  
          }
        }
      )
    }    
  }, [user.id])

  useEffect(() => {
    if (user.id) {
      fetch(`/api/users/${user.id}`)
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => setMatchUsers(data))
        }
      })
    }    
  }, [user.id])

  return (
    <div className="match-list">
      {matchUsers.map((matchUser) => {
        return (
          <div key={matchUser.id} className="match-users" onClick={() => handleClick(matchUser.id, matchUser.first_name)}>
            <img className="profile-photo" src={matchUser.url1} alt="profile-photo" />
            <p>{matchUser.first_name}</p>
          </div>
          
        )
      })}

    </div>
  )
}

export default MatchList