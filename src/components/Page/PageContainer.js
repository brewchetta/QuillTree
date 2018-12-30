import React from 'react'
import { Link } from 'react-router-dom'
import LoadingMedium from '../LoadingMedium'

export default class PageContainer extends React.Component {

  // Define User and Story
  storyId = parseInt(this.props.match.params.storyId)
  story = null
  user = null

  //Define initial state
  state = {
    page: {},
    edit: false
  }

  // Fetch page if it hasn't been loaded yet
  handleFetchPage = () => {
    const paramsPageNum = parseInt(this.props.match.params.pageNum)
    if (this.story && this.user && this.state.page.number !== paramsPageNum) {
      const pageId = this.story.pages.find(page => page.number === paramsPageNum).id
      this.props.fetchPage(pageId)
        .then(page => this.setState({ page: page, content: page.content }))
    }
  }

  // Starts edit mode
  handleClickEdit = () => {
    this.setState({ edit: true })
  }

  // Sends update request and changes back to read mode
  handleClickSave = () => {
    this.props.fetchUpdatePage(this.state.page).then(r => console.log(r))
    this.setState({ edit: false })
  }

  // Changes page's content
  handleChange = (event) => {
    this.setState({ page: {...this.state.page, content: event.target.value }})
  }

  // Determines whether there's another page and renders if able
  renderNextPage = () => {
    const pageNum = this.state.page.number
    const nextPage = pageNum ? this.story.pages.find(page => page.number === pageNum + 1) : null
    if (pageNum && nextPage) {
      return (
        <Link
        key={nextPage.id}
        to={`/stories/${this.story.id}/page/${nextPage.number}`}
        >Next Page</Link>
      )
    } else if (this.state.page.number) {
      return (
        <Link
        key={pageNum + 1}
        to={`/stories/${this.story.id}/page/${this.state.page.number}`}
        onClick={this.handleCreatePage}
        data-storyid={this.storyId}
        >New Page</Link>
      )
    }
  }

  // Creates new page upon clicking next page if it doesn't not exist
  handleCreatePage = (event) => {
    this.props.fetchCreatePage(event).then(page => this.props.history.push(`/stories/${this.storyId}/page/${page.number}`))
  }

  // Main render
  render() {
    console.log(this.props) // REMOVE THIS
    // Redefine user and story
    this.story = this.props.stories.find(story => story.id === this.storyId)
    this.user = this.story ? this.props.users.find(user => user.id === this.story.user_id) : {}
    this.handleFetchPage()
    if (this.state.page.id) {
      return (
        <div>
          {this.user ? <p>{this.user.name}</p> : <p>Loading</p> }
          {this.story ? <p>{this.story.title}</p> : <p>Loading</p> }
          <p>Page #{this.state.page.number}</p>
          <p>Image: {this.state.page.image}</p>

          { this.state.edit ? <textarea value={this.state.page.content} onChange={this.handleChange}/> : <p>Content: {this.state.page.content}</p> }

          { this.state.edit ? <button onClick={this.handleClickSave}>Save</button> : <button onClick={this.handleClickEdit}>Edit</button> }
          <br/>

          {this.renderNextPage()}
        </div>
      )
    } else {
      return <LoadingMedium />
    }

  }
}
