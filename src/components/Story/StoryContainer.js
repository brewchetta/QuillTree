import React from 'react'
import StoryPageCards from './StoryPageCards'

const StoryContainer = (props) => {

  // Define User and Story
  const storyId = parseInt(props.match.params.storyId)
  const story = props.stories.find(story => story.id === storyId)
  const user = story ? props.users.find(user => user.id === story.user_id) : {}

  const handleCreatePage = (event) => {
    props.fetchCreatePage(event).then(page => props.history.push(`${props.match.url}/pages/${page.id}`))
  }

  // Renders either a link to start the story or a dropdown for pages
  const renderPageCount = () => {
    if (story.pages.length === 0) {
      return (
        <button
        onClick={handleCreatePage}
        data-userid={story.user_id}
        data-storyid={story.id}>Initialize Pages</button>
      )
    } else {
      return (
        <p>This story has pages</p>
      )
    }
  }

  // Renders story if exists
  if (story) {
    return (
      <div>
        <p>{story.title}</p>
        <p>by {user.name}</p>
        <p>{story.description}</p>
        <img src={story.image} alt={story.title} />
        <StoryPageCards pages={story.pages} story={story} />
        {renderPageCount()}
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
