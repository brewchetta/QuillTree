import React from 'react'
import StoryPageOptions from './StoryPageOptions'
import LoadingMedium from '../LoadingMedium'
import StoryContainerDescription from './StoryContainerDescription'
import UnsplashContainer from '../Unsplash/UnsplashContainer'

const StoryContainer = (props) => {

  // Define User and Story
  const storyId = parseInt(props.match.params.storyId)
  const story = props.stories.find(story => story.id === storyId)
  const user = story ? props.users.find(user => user.id === story.user_id) : {}

  // For setting currentPhoto
  if (story && props.currentPhoto.url !== story.image) {
    const credit = {
      url: story.image,
      credit: story.image_credit,
      credit_link: story.image_credit_link
    }
    setTimeout(() => props.setAppState({ currentPhoto: credit }), 100)
  }

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

  const updateImage = (image) => {
    const updatedStory = {...story, image: image.url, image_credit: image.credit, image_credit_link: image.credit_link}
    props.fetchUpdateStory(updatedStory)
  }

  const handlePageSelect = (event) => {
    props.history.push(props.match.url + `/page/${event.target.value}`)
  }

  // Renders story if exists
  if (story) {
    return (
      <div className='image-right-text'>
        <img src={story.image} alt='' className='image-right story-container-bg' />

        <div className='image-right-text story-container-left'>
          {props.currentUser && story && props.currentUser.id === story.user_id ?
            <UnsplashContainer
            fetchUpdateStory={props.fetchUpdateStory}
            updateImage={updateImage}
             />
            : null}
          <StoryContainerDescription
          story={story}
          user={user}
          currentUserTrue={user === props.currentUser}
          fetchUpdateStory={props.fetchUpdateStory} />

          {renderPageStart()}

          {story.pages.length > 0 ? <StoryPageOptions handlePageSelect={handlePageSelect} pages={story.pages} /> : null }
        </div>

        <div className='story-container-right'>
          <img alt='' src={story.image} />
        </div>

      </div>
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
