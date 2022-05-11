import React, { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'
import ChatContainer from './ChatContainer'

function Dashboard({ user }) {
  const [characters, setCharacters] = useState([])
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  useEffect(() => {
    fetch('/api/users')
    .then((r) => {
      if (r.ok) {
        r.json().then((data) => setCharacters(data))
      }
    })
  }, [])

  return (
    <div className="dashboard">
      <ChatContainer user={user} />
      <div className="swipe-container">
        <div className="card-container">
          {characters.map((character) =>
            <TinderCard className="swipe" key={character.id} onSwipe={(dir) => swiped(dir, character.first_name)} onCardLeftScreen={() => outOfFrame(character.first_name)}>
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