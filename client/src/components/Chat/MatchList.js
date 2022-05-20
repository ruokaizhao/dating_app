import React, { useEffect, useState } from 'react'

function MatchList({ user, matchUser, showUnreadMessages, setShowUnreadMessages, setMatchChatDisplay, setRecipient }) {
  const [pairId, setPairId] = useState(null)

  useEffect(() => {
    if (user.id) {
      fetch(`/api/users/${user.id}/matches/${matchUser.id}`)
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => setPairId(data.pair_id))
        }
      })
    }    
  }, [user, matchUser, pairId, setPairId])

  function handleClick() {
    setShowUnreadMessages({...showUnreadMessages, [pairId]: false})
    setMatchChatDisplay(2)
    setRecipient(matchUser)
  }

  return (
    <div className="match-list">
      <div className="match-list-content">
        <img className="profile-photo" src={matchUser.url1} alt="profile" />
        <div>
            <h3>{matchUser.first_name}</h3>
            <p>{matchUser.about}</p>
        </div>
      </div>      
      <div>
        <button onClick={handleClick}>View Profile</button>
        <button onClick={handleClick}>Send Messages</button>
      </div>
    </div>
  )
}

export default MatchList