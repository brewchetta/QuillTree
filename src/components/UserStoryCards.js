import React from 'react'

const UserStoryCards = (props) => {

  // Fetch that user's stories
  // WARNING: This fetch moves on a constant loop every 200 milliseconds
  // setTimeout(() => props.fetchUserStories(props.userId), 200)

  return (
    props.stories.length > 0
    ? props.stories.map(story => <div key={story.id}><p>{story.title}</p></div>)
    : null
  )
}

export default UserStoryCards
