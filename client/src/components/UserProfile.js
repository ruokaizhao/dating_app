import React from 'react'
import { useNavigate } from 'react-router-dom'

function UserProfile({ user, setShowAuth, setIsEditingProfile }) {
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
      <img className="profile-photo" src={user.url1} alt="profile" /> 
      <div className="name-age">
        <h2>{user.first_name}, </h2>
        <h2>{result}</h2> 
      </div>          
      <p>Gender Identity: {user.show_gender ? user.gender_identity : 'I\'ll keep it as a secret'}</p> 
      <p>Gender Interest: {user.gender_interest}</p> 
      <p>Something about me: {user.about}</p>      
      <button onClick={handleClick}>Edit Profile</button>
    </div>  
  )
}

export default UserProfile