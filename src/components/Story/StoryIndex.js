import React from 'react'
import StoryCards from './StoryCards'
import LoadingMedium from '../LoadingMedium'

const StoryIndex = (props) => {


  if (props.stories.length) {
    return (
      <div className='image-right-text'>
        <p>TODO: This should only display either the first X popular stories or else stories searched for</p>
        <StoryCards stories={props.stories} />
      </div>
    )
  } else {
    return <LoadingMedium />
  }


}

export default StoryIndex
