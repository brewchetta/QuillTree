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
        <Link className='user-index-card-story' to={`/stories/${story.id}`}>{story.title}</Link>
        <br/>
        </div>
      )
    }).slice(0,3)
  }

  // Main render
  return (
    <Link className='user-index-card' key={user.id} to={`/users/${user.id}`}>
    <h3>{user.name}</h3>
    <p>This user has started {user.stories.length} stories</p>
    {renderStories()}
    </Link>
  )
}

export default UserCard
