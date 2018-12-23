import React from 'react'
import { Link } from 'react-router-dom';

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
      <Link key={user.id} to={`/users/${user.id}`}>{user.name}</Link>
      <p>This user has {user.stories.length} stories:</p>
      {renderStories()}
      <br/>
    </div>
  )
}

export default UserCard
