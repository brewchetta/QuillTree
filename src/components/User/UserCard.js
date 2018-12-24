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
      return (
        <div key={story.id}>
        <Link to={`/stories/${story.id}`}>{story.title}</Link>
        <br/>
        </div>
      )
    })
  }

  // Main render
  return (
    <div>
      <Link key={user.id} to={`/users/${user.id}`}>{user.name}</Link>
      <p>This user has {user.stories.length} stories:</p>
      {renderStories()}
      <p>----------</p>
      <br/>
    </div>
  )
}

export default UserCard
