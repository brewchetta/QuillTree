import React from 'react'

const UserCreateNewStory = (props) => {

  const createStory = () => {
    props.fetchCreateStory(props.user).then(response => console.log(response))
  }

  return (
    <button onClick={createStory}>Create New Story</button>
  )
}

export default UserCreateNewStory
