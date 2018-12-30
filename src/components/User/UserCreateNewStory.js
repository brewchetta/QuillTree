import React from 'react'

export default class UserCreateNewStory extends React.Component {

  state = {
    title: '',
    image: '',
    description: ''
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.fetchCreateStory(this.props.user).then(response => console.log(response))
  }

  render() {
    return (
      <form onSubmit={this.createStory}>
        <h3>Start New Story</h3>

        <label>Title: </label>
        <input
        name='title'
        type='text'
        value={this.state.title}
        onChange={this.handleChange} />
        <br/>
        <br/>

        <label>Image URL: </label>
        <input
        name='image'
        type='text'
        value={this.state.image}
        onChange={this.handleChange} />
        <br/>
        <br/>

        <label>Description: </label>
        <input
        name='description'
        type='text'
        value={this.state.description}
        onChange={this.handleChange} />
        <br/>
        <br/>
        
      </form>
    )
  }
}
