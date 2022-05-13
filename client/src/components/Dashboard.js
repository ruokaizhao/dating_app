import React, { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'
import ChatContainer from './ChatContainer'

function Dashboard({ user }) {
  const [characters, setCharacters] = useState([])
  const [lastDirection, setLastDirection] = useState()
  const [matchUsers, setMatchUsers] = useState([])

  function swiped(direction, id) {
    setLastDirection(direction)
    if (direction === 'right' || direction === 'left') {
      fetch('/api/matches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user.id,
          browsed_user_id: id,
          liked: direction === 'right' ? true : false
        })
      })
      .then((r) => {
        if (r.ok) {
          fetch(`/api/users/${user.id}`)
          .then((r) => {
            if (r.ok) {
              r.json().then((data) => setMatchUsers(data))
            }
          })
        }
      })
    }
  }

  useEffect(() => {
    if (user.id) {
      fetch(`/api/users/${user.id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          gender_identity: user.gender_identity,
          gender_interest: user.gender_interest
        })
      })
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => setCharacters(data))
        }
      })
    }    
  }, [user.id])

  return (
    <div className="dashboard">
      <ChatContainer user={user} matchUsers={matchUsers} setMatchUsers={setMatchUsers} />
      <div className="swipe-container">
        <div className="card-container">
          {characters.map((character) =>
            <TinderCard className="swipe" key={character.id} onSwipe={(direction) => swiped(direction, character.id)}>
              <div style={{ backgroundImage: "url(" + character.url1 + ")" }} className="card">
                <h3>{character.first_name}</h3>
              </div>
            </TinderCard>
          )}
        </div>
        {lastDirection ? <h2 className="swipe-info">You swiped {lastDirection}</h2> : <h2 className='infoText' />}
      </div>
    </div>
  )
}

export default Dashboard