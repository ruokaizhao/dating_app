import React from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'

function UserProfile({ user, showAuth, setShowAuth, setIsEditingProfile, setUser }) {
  const navigate = useNavigate()

  function handleClick() {
    setIsEditingProfile(true)
    setShowAuth(false)    
    navigate('/onboarding')
  }

  return (
    <>
      <NavBar user={user} color={true} showAuth={showAuth} setUser={setUser} />
      <div className="user-profile">
        <section>
          <img className="profile-photo" src={user.url1} alt="profile" />
          <button onClick={handleClick}>Edit Profile</button>
        </section>
        <section>
          <p>Name: {user.first_name}</p>
          <p>Date of birth: {user.dob_month}-{user.dob_day}-{user.dob_year}</p>  
          <p>Gender Identity: {user.show_gender ? user.gender_identity : 'I\'ll keep it as a secret'}</p> 
          <p>Gender Interest: {user.gender_interest}</p> 
          <p>Email: {user.email}</p>
          <p>Something about me: {user.about}</p> 
        </section>      
      </div>
    </>    
  )
}

export default UserProfile