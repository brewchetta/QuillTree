import React from 'react'
import StoryCards from './StoryCards'

const StoryIndex = (props) => {

  return (
    <div>
      <p>TODO: This should only display either the first X popular stories or else stories searched for</p>
      <StoryCards stories={props.stories} />
    </div>
  )

}

export default StoryIndex
