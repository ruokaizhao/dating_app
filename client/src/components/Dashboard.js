import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'
import ChatContainer from './ChatContainer'

const characters = [
  {
    name: 'Richard Hendricks',
    url: 'https://i.imgur.com/oPj4A8u.jpeg'
  },
  {
    name: 'Erlich Bachman',
    url: 'https://i.imgur.com/oPj4A8u.jpeg'
  },
  {
    name: 'Monica Hall',
    url: 'https://i.imgur.com/oPj4A8u.jpeg'
  },
  {
    name: 'Jared Dunn',
    url: 'https://i.imgur.com/oPj4A8u.jpeg'
  },
  {
    name: 'Dinesh Chugtai',
    url: 'https://i.imgur.com/oPj4A8u.jpeg'
  }
]

function Dashboard() {
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <div className="dashboard">
      <ChatContainer />
      <div className="swipe-container">
        <div className="card-container">
          {characters.map((character) =>
            <TinderCard className="swipe" key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
              <div style={{ backgroundImage: "url(" + character.url + ")" }} className="card">
                <h3>{character.name}</h3>
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