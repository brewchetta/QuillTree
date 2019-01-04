import React from 'react'
import UserStoryCards from './UserStoryCards'
import LoadingMedium from '../LoadingMedium'
import UserCreateNewStory from './UserCreateNewStory'
import UserProfileBio from './UserProfileBio'
import UnsplashContainer from '../Unsplash/UnsplashContainer'

const UserProfile = (props) =>  {

  // Define User
  const userId = parseInt(props.match.params.userId)
  const user = props.users.find(user => user.id === userId)

  // For pushing history in UserCreateNewStory
  const pushHistory = (newURL) => {
    props.history.push(newURL)
  }

  if (user && props.currentPhoto !== user.image) {
    console.log(user)
    const credit = {
      url: user.image,
      credit: user.image_credit,
      credit_link: user.image_credit_link
    }
    setTimeout(() => props.setAppState({ currentPhoto: credit }), 100)
  }

  const updateImage = image => {
    const updatedUser = {...user, image: image.url, image_credit: image.credit, image_credit_link: image.credit_link}
    console.log('updatedUser: ', updatedUser)
    props.fetchUpdateUser(updatedUser)
  }

  if (user) {
    return (
      <>
        <div className='user-profile'>

          <h2>{user.name}</h2>

          <UnsplashContainer
          fetchUpdateUser={props.fetchUpdateUser}
          updateImage={updateImage} />

          <UserProfileBio
          user={user}
          currentUserTrue={props.currentUser === user}
          fetchUpdateUser={props.fetchUpdateUser} />

          <UserCreateNewStory
          fetchCreateStory={props.fetchCreateStory}
          pushHistory={pushHistory}
          user={user}
          currentUser={props.currentUser} />

          <h3>Stories</h3>

          <div className='user-story-container'>
            <UserStoryCards
            stories={user.stories}
            userId={userId}
            delete={props.currentUser && props.currentUser.id === user.id}
            fetchDeleteStory={props.fetchDeleteStory} />
          </div>

        </div>

        <div className='image-right'>
          {user.image ? <img alt='user-profile' src={user.image} /> : null}
        </div>
      </>
    )
    // Photo: Jørgen Håland | @jhaland
  } else {
    return (<div className='user-profile'><LoadingMedium /></div>)
  }
}

export default UserProfile
