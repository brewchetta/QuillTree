import React from 'react'

const UserProfile = ({match, users, userStories}) => {
  // Define user
  const user = users.find(user => user.id === parseInt(match.params.userId))

  // Sets userStories based on user
  // TODO fetch stories
  if (user) { console.log(`TODO: fetch stories for ${user.name}`) }

  // Render for user's story cards
  const renderStoryCards = () => {
    return user && user.stories.length > 0
    ? user.stories.map(story => <div key={story.id}><p>{story.title}</p></div>)
    : <p>No stories yet!</p>
  }

  if (user) {
    return (
      <>
        <h2>{user.name}</h2>
        <p>Wow! You've gotten to this page! Congratulations!</p>
        {renderStoryCards()}
      </>
    )
  } else {
    return (
      <p>404: That user does not exist!</p>
    )
  }
}

export default UserProfile
