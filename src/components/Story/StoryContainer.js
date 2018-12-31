import React from 'react'
import StoryPageOptions from './StoryPageOptions'
import LoadingMedium from '../LoadingMedium'

const StoryContainer = (props) => {

  // Define User and Story
  const storyId = parseInt(props.match.params.storyId)
  const story = props.stories.find(story => story.id === storyId)
  const user = story ? props.users.find(user => user.id === story.user_id) : {}

  const handleCreatePage = (event) => {
    props.fetchCreatePage(event).then(page => props.history.push(`${props.match.url}/page/${page.number}`))
  }

  // Renders a link to start the story
  const renderPageStart = () => {
    if (story.pages.length === 0 && props.currentUser === user) {
      return (
        <button
        onClick={handleCreatePage}
        data-userid={story.user_id}
        data-storyid={story.id}>Initialize Pages</button>
      )
    }
  }

  const handlePageSelect = (event) => {
    props.history.push(props.match.url + `/page/${event.target.value}`)
  }

  // Renders story if exists
  if (story) {
    return (
      <>
      <img src={story.image} alt='' className='image-right' />
      <div className='image-right-text'>
        <p>{story.title}</p>
        <p className='edit-button'>✎</p>
        <p>by {user.name}</p>
        <p>{story.description}</p>
        {renderPageStart()}
        {story.pages.length > 0 ? <StoryPageOptions handlePageSelect={handlePageSelect} pages={story.pages} /> : null }
      </div>
      </>
    )
  } else {
    return (
      <div>
        <LoadingMedium />
      </div>
    )
  }
}

export default StoryContainer
