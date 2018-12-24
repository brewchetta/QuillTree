import React from 'react'
import { Link } from 'react-router-dom'

const StoryCards = (props) => {

  const renderStoryCards = () => {
    return props.stories.map(story => {
      return (
        <div key={story.id}>
          <br/>
          <Link to={`/stories/${story.id}`}
          >{story.title}</Link>
        </div>
      )
    })
  }

  return (
    <>
      {renderStoryCards()}
    </>
  )

}

export default StoryCards
