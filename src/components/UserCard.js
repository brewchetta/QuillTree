import React from 'react'

// This is a card for the UserList
const UserCard = (props) => {

  // Set props
  const user = props.user
  const stories = props.user.stories

  // Render prominent stories
  function renderStories() {
    return stories.map(story => {
      return <p key={story.id}>{story.title}</p>
    })
  }

  // Main render
  return (
    <div>
      <h3>{user.name}</h3>
      <p>This user has {user.stories.length} stories:</p>
      {renderStories()}
      <br/>
    </div>
  )
}

export default UserCard
