import React from 'react'

const UserProfile = ({match, users}) => {

  const user = users.find(user => user.id === parseInt(match.params.userId))
  // const stories = user.stories

  if (user) {
    return (
      <>
      <h2>{user.name}</h2>
      <p>Wow! You've gotten to this page! Congratulations!</p>
      </>
    )
  } else {
    return (
      <p>No user yet</p>
    )
  }
}

export default UserProfile
