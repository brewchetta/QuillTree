import React from 'react'
import UserStoryCards from './UserStoryCards'

const UserProfile = (props) =>  {

  // Define User
  const userId = parseInt(props.match.params.userId)
  console.log('UserID: ', userId)

  const user = props.users.find(user => user.id === userId)
  console.log('User: ', user)

  if (user) {
    props.fetchUserStories(userId)
    return (
      <>
        <h2>{user.name}</h2>
        <p>Wow! You've gotten to this page! Congratulations!</p>
        <UserStoryCards userStories={props.userStories} />
      </>
    )
  } else {
    return (<p>Loading</p>)
  }
}

export default UserProfile
