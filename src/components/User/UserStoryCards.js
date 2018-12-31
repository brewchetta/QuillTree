import React from 'react'
import { Link } from 'react-router-dom'

const UserStoryCards = (props) => {

  // Main render
  return (
    props.stories.map(story => {
      return (
        <React.Fragment key={story.id}>
          <Link to={`/stories/${story.id}`} className='user-story-card'>
            <h4>{story.title}</h4>
            { story.image ?
              <div className='user-story-card-image'>
                <img alt='story.id' src={story.image} />
              </div>
              : null
            }
          </Link>
          {props.delete === true ? <button>You can delete</button> : null}
        </React.Fragment>
      )
    })
  )
}

export default UserStoryCards
