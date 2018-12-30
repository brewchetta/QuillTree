import React from 'react'

export default class LoginBar extends React.Component {

  currentUser = this.props.currentUser
  users = this.props.users

  state = {
    loginPopup: false
  }

  render() {
    if (this.currentUser) {
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
}
