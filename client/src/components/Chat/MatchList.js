import React, { useEffect } from 'react'

function MatchList({ user, matchUsers, setMatchUsers, setMatchChatDisplay, setRecipientId }) {

  function handleClick(id) {
    setMatchChatDisplay(2)
    setRecipientId(id)
  }

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
          <div key={matchUser.id} className="match-users" onClick={() => handleClick(matchUser.id)}>
            <img className="profile-photo" src={matchUser.url1} alt="profile-photo" />
            <p>{matchUser.first_name}</p>
          </div>
          
        )
      })}

    </div>
  )
}

export default MatchList