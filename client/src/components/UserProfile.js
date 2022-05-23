import React from 'react'
import { useNavigate } from 'react-router-dom'

function UserProfile({ user, setShowAuth, setIsEditingProfile, showViewedUser, setShowViewedUser }) {
  const navigate = useNavigate()

  let currentDate = new Date();
  let dateOfBirth = new Date(user.dob_year + "-" + user.dob_month + "-" + user.dob_day);
  let difference = Math.abs(currentDate - dateOfBirth);
  let result = Math.round(difference / (1000 * 3600 * 24 *365));


  function handleClick() {
    setIsEditingProfile(true)
    setShowAuth(false)    
    navigate('/onboarding')
  }

  return (
    <div className="user-profile"> 
      {showViewedUser 
      ? 
      <div className="close-icon" onClick={() => setShowViewedUser(false)}>ⓧ</div>
      :
      <button id="me-close-icon" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      }
      <img className="profile-photo" src={user.url1} alt="profile" /> 
      <div className="name-age-button">
        <div className="name-age">
          <h2>{user.first_name}, </h2>
          <h2>{result}</h2> 
        </div>  
        {!showViewedUser && <button onClick={handleClick}>Edit Profile</button>}  
      </div>            
      <p id="p1">Gender Identity: {user.show_gender ? user.gender_identity : 'I\'ll keep it as a secret'}</p> 
      <p id="p2">Gender Interest: {user.gender_interest}</p> 
      <p id="p3">{user.about}</p>      
    </div>  
  )
}

export default UserProfile