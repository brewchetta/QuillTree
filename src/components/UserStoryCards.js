import React from 'react'

const UserStoryCards = (props) => {

  return (
    props.userStories.length > 0
    ? props.userStories.map(story => <div key={story.id}><p>{story.title}</p></div>)
    : <p>No stories yet!</p>
  )

}

export default UserStoryCards
