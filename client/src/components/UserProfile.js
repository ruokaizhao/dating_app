import React from 'react'

function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <p>Name: {user.first_name}</p>
      <p>Date of birth: {user.dob_month}-{user.dob_day}-{user.dob_year}</p>
      
    </div>
  )
}

export default UserProfile