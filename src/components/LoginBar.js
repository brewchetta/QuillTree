import React from 'react'

export default class LoginBar extends React.Component {

  // Set current users and such for ease of access
  currentUser = this.props.currentUser
  users = this.props.users

  state = {
    loginPopup: false,
    name: ''
  }

  // For controlled form
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  // Determines whether the login popup is needed and then renders it
  renderPopup = () => {
    if (!this.state.loginPopup) {
      return (
        <form className='login-popup'>
          <label>Username: </label>
          <input type='text'
          name='name'
          value={this.state.name}
          onChange={this.handleChange}/>
          <button>Log In</button>

        </form>
      )
    }
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
          {this.renderPopup()}
        </div>
      )
    }
  }
}
