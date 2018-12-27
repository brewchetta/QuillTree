import React from 'react'

export default class PageContainer extends React.Component {

  state = {
    page: {},
    edit: false,
    content: ''
  }

  // Define User and Story
  storyId = parseInt(this.props.match.params.storyId)
  story = null
  user = null

  // Fetch page if it hasn't been yet
  handleFetchPage = () => {
    if (this.state.page.id && this.state.page.id === parseInt(this.props.match.params.pageId)) {
    } else if (this.story && this.user) {
      this.props.fetchPage(this.user.id, this.story.id, this.props.match.params.pageId)
      .then(page => this.setState({ page: page, content: page.content }))
    }
  }

  handleClickEdit = () => {
    this.setState({ edit: true })
  }

  handleClickSave = () => {
    this.setState({ edit: false })
  }

  handleChange = (event) => {
    this.setState({ content: event.target.value })
  }

  // Main render
  render() {
    // Redefine user and story
    this.story = this.props.stories.find(story => story.id === this.storyId)
    this.user = this.story ? this.props.users.find(user => user.id === this.story.user_id) : {}
    this.handleFetchPage()
    return (
      <div>
        {this.user ? <p>{this.user.name}</p> : <p>Loading</p> }
        {this.story ? <p>{this.story.title}</p> : <p>Loading</p> }
        <p>Page #{this.state.page.number}</p>
        <p>Image: {this.state.page.image}</p>

        { this.state.edit ? <textarea value={this.state.content} onChange={this.handleChange}/> : <p>Content: {this.state.page.content}</p> }

        { this.state.edit ? <button onClick={this.handleClickSave}>Save</button> : <button onClick={this.handleClickEdit}>Edit</button> }
      </div>
    )
  }
}
