import React from 'react'

export default class LoginBar extends React.Component {

  state = {
    loginPopup: false,
    name: ''
  }

  // For controlled form
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  // For handling submit
  handleSubmit = (event) => {
    event.preventDefault()
    const foundUser = this.props.users.find(user => user.name === this.state.name)
    console.log(foundUser)
    if (foundUser) {
      this.setState({ loginPopup: false, name: '' })
      this.props.handleUserSignIn(foundUser)
    } else {
      alert('That username does not exist')
    }
  }

  // Determines whether the login popup is needed and then renders it
  renderPopup = () => {
    if (this.state.loginPopup) {
      return (
        <form className='login-popup' onSubmit={this.handleSubmit}>
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
