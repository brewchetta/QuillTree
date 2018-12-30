import React from 'react'

const LoginBar = (props) => {

  const currentUser = props.currentUser
  const users = props.users

  if (currentUser) {
    return (
      <div className='navbar-right'>
        <p>I AM LINK TO USER PROFILE</p>
      </div>
    )
  } else {
    return (
      <div className='navbar-right'>
        <p>I AM LINK LOGIN / SIGNUP</p>
      </div>
    )
  }
}

export default LoginBar
