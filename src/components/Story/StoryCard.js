import React from 'react'
import { Link } from 'react-router-dom'

// This is a card for the StoriesIndex
const StoryCard = (props) => {

  return (
    <Link
    to={`/stories/${props.story.id}`}
    key={props.story.id}
    className='story-index-story-container'>

      <h3 className='story-index-story-card'>
      {props.story.title}</h3>

      <p
      className='story-index-card-author'>
      {props.user.name}</p>

      {props.story.image ? <div className='story-index-card-image'><img alt={props.story.id} src={props.story.image} /></div> : null }

    </Link>
  )

}

export default StoryCard
