import React from 'react'
import { Link } from 'react-router-dom'

const UserStoryCards = (props) => {

  // Main render
  return (
    props.stories.map(story => {
      return (
        <div key={story.id}>
          <Link
          to={`/stories/${story.id}`}
          >{story.title}</Link>
        </div>
      )
    })
  )
}

export default UserStoryCards
