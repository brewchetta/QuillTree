import React from 'react'

// This is a card for the UserList
const UserCard = (props) => {
  // Set user so it takes up less room
  const user = props.user

  // Main render
  return (
    <div>
      <h3>{user.name}</h3>
      <p>(THIS IS A USER CARD) This user has {user.stories.length} stories</p>
    </div>
  )
}

export default UserCard
