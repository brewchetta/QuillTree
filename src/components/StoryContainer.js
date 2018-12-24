import React from 'react'

const StoryContainer = (props) => {

  // Define User and Story
  const storyId = parseInt(props.match.params.storyId)
  const story = props.stories.find(story => story.id === storyId)
  console.log(story)
  console.log(storyId)

  if (story) {
    return (
      <div>
        <p>Yes</p>
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
