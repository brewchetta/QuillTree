import React from 'react'
import UserStoryCards from './UserStoryCards'
import LoadingMedium from '../LoadingMedium'
import UserCreateNewStory from './UserCreateNewStory'

const UserProfile = (props) =>  {

  // Define User
  const userId = parseInt(props.match.params.userId)
  const user = props.users.find(user => user.id === userId)

  // For pushing history in UserCreateNewStory
  const pushHistory = (newURL) => {
    props.history.push(newURL)
  }

  if (user) {
    return (
      <>
        <div className='user-profile'>
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
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
            delete={props.currentUser === user}
            fetchDeleteStory={props.fetchDeleteStory} />
          </div>
        </div>
        <div className='image-right'>
          <img alt='user-profile' src='https://images.unsplash.com/photo-1465795259008-cea85fb3a008?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80' />
        </div>
      </>
    )
    // Photo: Jørgen Håland | @jhaland
  } else {
    return (<div className='user-profile'><LoadingMedium /></div>)
  }
}

export default UserProfile
