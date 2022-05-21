import React, { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'
import ChatContainer from './Chat/ChatContainer'
import ChatHeader from './Chat/ChatHeader'

function Dashboard({ user, cable }) {
  const [characters, setCharacters] = useState([])
  const [lastDirection, setLastDirection] = useState(null)
  const [matchUsers, setMatchUsers] = useState([])

  function swiped(direction, id) {
    setLastDirection(direction)
    setTimeout(() => {
      setLastDirection(null)      
    }, 3000)
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
              r.json().then((data) => {
                setMatchUsers(data)                
              })
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
  console.log(characters)

  return (
    <div className="dashboard">      
      <ChatHeader user={user} />
      <div className="dashboard-body">
        <ChatContainer user={user} matchUsers={matchUsers} setMatchUsers={setMatchUsers} cable={cable} />
        <div className="swipe-container">
          <h4>Swipe right if like, left if dislike, up or down to pass</h4>  
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
    </div>
  )
}

export default Dashboard