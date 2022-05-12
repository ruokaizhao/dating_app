import React, { useEffect } from 'react'

function MatchList({ user, matchUsers, setMatchUsers }) {

  useEffect(() => {
    fetch(`/api/users/${user.id}`)
    .then((r) => {
      if (r.ok) {
        r.json().then((data) => setMatchUsers(data))
      }
    })
  }, [])

  return (
    <div>
      {matchUsers.map((matchUser) => {
        return (
          <p key={matchUser.id}>{matchUser.first_name}</p>
        )
      })}

    </div>
  )
}

export default MatchList