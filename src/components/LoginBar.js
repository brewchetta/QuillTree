import React from 'react'
import { Link } from 'react-router-dom'

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
    if (foundUser) {
      this.setState({ loginPopup: false, name: '' })
      this.props.handleUserSignIn(foundUser)
    } else {
      alert('That username does not exist')
    }
  }

  // For signing out
  handleLogout = () => {
    this.props.handleUserSignIn(null)
  }

  // For switching login state
  handleClickPopup = () => {
    this.setState({ loginPopup: !this.state.loginPopup }, ()=>this.refs.nameInput.focus())
  }

  // Determines whether the login popup is needed and then renders it
  renderPopup = () => {
    if (this.state.loginPopup) {
      return (
        <form className='login-popup' onSubmit={this.handleSubmit}>
          <label>Username: </label>
          <input
          ref='nameInput'
          type='text'
          name='name'
          value={this.state.name}
          onChange={this.handleChange}/>
          <button>Log In</button>
        </form>
      )
    }
  }

  render() {
    if (this.props.currentUser) {
      return (
        <div className='navbar-right'>
          <p>
          <Link
          to={`/users/${this.props.currentUser.id}`}
          className='navbar-link'>{this.props.currentUser.name}</Link> | <span className='login-button' onClick={this.handleLogout}>Log Out</span></p>
        </div>
      )
    } else {
      return (
        <div className='navbar-right'>
          <p>
          <span className='login-button' onClick={this.handleClickPopup}>Login | </span><Link to='/signup' className='navbar-link'>Signup</Link>
          </p>
          {this.renderPopup()}
        </div>
      )
    }
  }
}
