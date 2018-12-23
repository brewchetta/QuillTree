import React from 'react'
import UserStoryCards from './UserStoryCards'

const UserProfile = (props) =>  {

  // Define User
  const userId = parseInt(props.match.params.userId)
  const user = props.users.find(user => user.id === userId)

  if (user) {
    return (
      <>
        <h2>{user.name}</h2>
        <p>{user.bio}</p>
        <h3>Stories</h3>
        <UserStoryCards
        stories={user.stories}
        userId={userId} />
      </>
    )
  } else { return <p>Loading</p> }
}

export default UserProfile
