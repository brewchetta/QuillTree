import React from 'react'
import LoadingMedium from '../LoadingMedium'
import PagePreviousBtn from './PagePreviousBtn'
import PageNextBtn from './PageNextBtn'

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
    this.props.fetchUpdatePage(this.state.page)
    this.setState({ edit: false })
  }

  // Changes page's content
  handleChange = (event) => {
    this.setState({ page: {...this.state.page, content: event.target.value }})
  }

  // Creates new page upon clicking next page if it doesn't not exist
  handleCreatePage = (event) => {
    this.props.fetchCreatePage(event).then(page => this.props.history.push(`/stories/${this.storyId}/page/${page.number}`))
  }

  handleDelete = () => {
    this.props.history.push(`/stories/${this.storyId}`)
    this.props.fetchDeletePage(this.state.page.id)
  }

  // Main render
  render() {
    // Redefine user and story
    this.story = this.props.stories.find(story => story.id === this.storyId)
    this.user = this.story ? this.props.users.find(user => user.id === this.story.user_id) : {}
    // Fetch the individual page
    this.handleFetchPage()

    // Render page if page exists
    if (this.state.page.id) {
      return (
        <>
          <div className='image-right-text'>
            {this.user ? <p>{this.user.name}</p> : <p>Loading</p> }
            {this.story ? <p>{this.story.title}</p> : <p>Loading</p> }
            <p>Page #{this.state.page.number}</p>
            <p>Image: {this.state.page.image}</p>

            { this.state.edit ? <textarea value={this.state.page.content} onChange={this.handleChange}/> : <p>Content: {this.state.page.content}</p> }

            { this.state.edit ? <button onClick={this.handleClickSave}>Save</button> :
             this.user === this.props.currentUser ? <button onClick={this.handleClickEdit}>Edit Page</button> : null }
            <br/>

            {this.user === this.props.currentUser ? <button onClick={this.handleDelete}>Delete Page</button> : null }
            <br/>

            <PagePreviousBtn
            page={this.state.page}
            story={this.story} />

            <PageNextBtn
            page={this.state.page}
            story={this.story}
            handleCreatePage={this.handleCreatePage}
            currentUser={this.props.currentUser}
            user={this.user} />

          </div>
          <img alt={this.story.title} src={this.story.image} className='image-right' />
        </>
      )
    } else {
      return <LoadingMedium />
    }

  }
}
