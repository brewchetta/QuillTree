import React from 'react'
import { Link } from 'react-router-dom'

const UserStoryCards = (props) => {

  // Main render
  return (
    props.stories.map(story => {
      return (
        <Link key={story.id} to={`/stories/${story.id}`} className='user-story-card'>
          <h4>{story.title}</h4>
          { story.image ?
            <div className='user-story-card-image'>
              <img alt='story.id' src={story.image} />
            </div>
            : null
          }

        </Link>
      )
    })
  )
}

export default UserStoryCards
