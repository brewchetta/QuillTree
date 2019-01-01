import React from 'react'

export default class UserProfileBio extends React.Component {


  state = {
    edit: false,
    bio: this.props.user.bio
  }

  // Handles edit button click
  handleClick = () => {
    if (this.state.edit) {
      const updatedUser = {...this.props.user, bio: this.state.bio}
      this.props.fetchUpdateUser(updatedUser)
    }

    this.setState({ edit: !this.state.edit })
  }

  // The ubiquitous handle change function
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  // Renders edit form if in edit mode
  renderBioDetails = () => {
    if (this.state.edit) {
      return (
        <form onSubmit={this.handleClick}>
          <textarea
          name='bio'
          value={this.state.bio}
          onChange={this.handleChange}
          autoFocus={true}
          maxLength={500} />

          {this.renderEditButton()}
        </form>
      )
    } else {
      return (
        <>
          <p>{this.props.user.bio}</p>
          {this.renderEditButton()}
        </>
      )
    }
  }

  // Renders edit button only if the user is signed into their profile
  renderEditButton = () => {
    return (
      this.props.currentUserTrue ?
      <button
      className='edit-button'
      onClick={this.handleClick}>✎</button>
      : null
    )
  }

  render() {
      return (
        <>
        {this.renderBioDetails()}
        </>
      )
  }

}
