import React from 'react'

const UnsplashButton = (props) => {

  return (
      <button onClick={props.handleToggleForm}>{props.formOpen ? 'Cancel' : 'Change Image'}</button>
  )
}

export default UnsplashButton
