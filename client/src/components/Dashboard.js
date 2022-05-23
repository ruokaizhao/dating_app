import React, { useEffect, useRef, useState } from 'react'
import TinderCard from 'react-tinder-card'
import ChatContainer from './Chat/ChatContainer'
import ChatHeader from './Chat/ChatHeader'
import UserProfile from './UserProfile'

function Dashboard({ user, cable, setShowAuth, showViewedUser, setShowViewedUser }) {
  const [characters, setCharacters] = useState([])
  const [lastDirection, setLastDirection] = useState(null)
  const [matchUsers, setMatchUsers] = useState([])
  const [recipient, setRecipient] = useState({})  
  const chatContainerRef = useRef(null)
  const swipeContainerRef = useRef(null)

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
  }, [user.id, user.gender_identity, user.gender_interest])

  return (
    <div className="dashboard">  
      <ChatHeader 
        user={user} 
        chatContainerRef={chatContainerRef} 
        swipeContainerRef={swipeContainerRef} 
        setShowAuth={setShowAuth} 
      />
      <div className="dashboard-body">
        <ChatContainer 
          user={user} 
          chatContainerRef={chatContainerRef} 
          swipeContainerRef={swipeContainerRef}
          matchUsers={matchUsers} 
          setMatchUsers={setMatchUsers} 
          cable={cable} 
          recipient={recipient} 
          setRecipient={setRecipient} 
          setShowViewedUser={setShowViewedUser} 
        />     
        <div className="swipe-container" ref={swipeContainerRef}>
          {showViewedUser 
          ? 
          <UserProfile user={recipient} showViewedUser={showViewedUser} setShowViewedUser={setShowViewedUser} />
          :
          <>          
            <div className="card-container">          
              {characters.map((character) =>
                <TinderCard className="swipe" key={character.id} onSwipe={(direction) => swiped(direction, character.id)}>
                  <div style={{ backgroundImage: "url(" + character.url1 + ")" }} className="card">
                    <h3>{character.first_name}</h3>
                  </div>
                </TinderCard>
              )}
            </div>
            {lastDirection ? <h2 className="swipe-info">You swiped {lastDirection}</h2> : null}
          </>}         
        </div>      
      </div>
    </div>
  )
}

export default Dashboard