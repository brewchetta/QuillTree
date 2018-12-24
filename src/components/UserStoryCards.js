import React from 'react'
import { Link } from 'react-router-dom'

const UserStoryCards = (props) => {

  // Define props
  console.log('UserId', props.userId)
  const userId = props.userId

  // Fetch that user's stories
  // WARNING: This fetch moves on a constant loop every 200 milliseconds
  // setTimeout(() => props.fetchUserStories(props.userId), 200)

  // Main render
  return (
    props.stories.map(story => {
      return (
        <div key={story.id}>
          <Link
          to={`/stories/${story.id}`}
          exact
          >{story.title}</Link>
        </div>
      )
    })
  )
}

export default UserStoryCards
