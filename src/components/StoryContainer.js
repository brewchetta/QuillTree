import React from 'react'
import StoryPageCards from './StoryPageCards'

const StoryContainer = (props) => {

  // Define User and Story
  const storyId = parseInt(props.match.params.storyId)
  const story = props.stories.find(story => story.id === storyId)

  if (story) {
    return (
      <div>
        <p>{story.title}</p>
        <p>{story.description}</p>
        <img src={story.image} alt={story.title} />
        <StoryPageCards pages={story.pages} />
      </div>
    )
  } else {
    return (
      <div>
        <h2>Loading</h2>
      </div>
    )
  }
}

export default StoryContainer
