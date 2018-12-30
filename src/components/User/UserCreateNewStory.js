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
    console.log('submitted')
    event.preventDefault()
    const title = this.state.title
    const newStory = {...this.state, user_id: this.props.user.id}
    if (title.length) {
      this.props.fetchCreateStory(newStory)
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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

        <button onClick={this.handleSubmit}>Create</button>

      </form>
    )
  }
}
