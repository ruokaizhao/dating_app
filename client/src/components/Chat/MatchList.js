import React, { useEffect, useState } from 'react'

function MatchList({ user, matchUser, showUnreadMessages, setPrevMatchChatDisplay, setShowUnreadMessages, chatContainerRef, swipeContainerRef, setMatchChatDisplay, setRecipient, setShowViewedUser }) {
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

  function handleViewProfileClick() {
    swipeContainerRef.current.classList.toggle('inactive')
    chatContainerRef.current.classList.toggle('active')
    setShowViewedUser(true)
    setRecipient(matchUser)
  }

  function handleSendMessageClick() {
    setShowUnreadMessages({...showUnreadMessages, [pairId]: false})
    setPrevMatchChatDisplay(0)
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
        <button onClick={handleViewProfileClick}>View Profile</button>
        <button onClick={handleSendMessageClick}>Messages</button>
      </div>
    </div>
  )
}

export default MatchList