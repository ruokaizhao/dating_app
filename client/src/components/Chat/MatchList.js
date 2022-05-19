import React, { useEffect } from 'react'

function MatchList({ user, matchUsers, setMatchUsers, cable }) {

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
    <div className="match-list">
      {matchUsers.map((matchUser) => {
        return (
          <div key={matchUser.id} className="match-users">
            <img className="profile-photo" src={matchUser.url1} alt="profile" />
            <div>
              <h3>{matchUser.first_name}</h3>
              <p>{matchUser.about}</p>
            </div>
          </div>          
        )
      })}

    </div>
  )
}

export default MatchList