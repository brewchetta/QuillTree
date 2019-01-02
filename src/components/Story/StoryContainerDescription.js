import React from 'react'
import { Link } from 'react-router-dom'

export default class StoryContainerDescription extends React.Component {

  state = {
    edit: false,
    title: this.props.story.title,
    description: this.props.story.description,
    image: this.props.story.image
  }

  // The typical handle change
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  // Sends changes to server to update
  handleSubmit = (event) => {
    event.preventDefault()
    if (this.state.edit) {
      const updatedStory = {...this.props.story,
        title: this.state.title,
        description: this.state.description,
        image: this.state.image
      }
      this.props.fetchUpdateStory(updatedStory)
    }

    this.setState({ edit: !this.state.edit })
  }

  handleCancel = () => {
    this.setState({ edit: !this.state.edit })
  }

  render() {
    // If the state is edit, renders forms
    if (this.state.edit) {
      return (
        <form onSubmit={this.handleSubmit}>
          <input name='title'
          className='story-container-input'
          type='text'
          value={this.state.title}
          onChange={this.handleChange} />

          <textarea name='description'
          className='story-container-input'
          value={this.state.description}
          onChange={this.handleChange} />

          <input name='image'
          className='story-container-input'
          type='text'
          value={this.state.image}
          onChange={this.handleChange}
          style={{width: '25em'}} />

          <button
          onClick={this.handleSubmit}>Save Changes</button>
          <button
          onClick={this.handleCancel}>Cancel</button>
        </form>
      )
    } else {
    // If state is not edit renders the usual stuff
      return (
        <>
        {this.props.currentUserTrue ?
          <button
          onClick={this.handleSubmit}
          className='edit-button'>✎</button>
          : null }
          <h2>{this.props.story.title}</h2>
          <Link
          to={`/users/${this.props.user.id}`}
          style={{ textDecoration: 'none', color: 'black' }}
          >by {this.props.user.name}</Link>
          <p>{this.props.story.description}</p>
          </>
        )
      }
    }
}
