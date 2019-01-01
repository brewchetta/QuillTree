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
    this.setState({ page: {...this.state.page, [event.target.name]: event.target.value }})
  }

  // Creates new page upon clicking next page if it doesn't not exist
  handleCreatePage = (event) => {
    this.props.fetchCreatePage(event).then(page => this.props.history.push(`/stories/${this.storyId}/page/${page.number}`))
  }

  handleDelete = () => {
    this.props.history.push(`/stories/${this.storyId}`)
    this.props.fetchDeletePage(this.state.page)
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
          <div className='page-text'>

            <div className='page-header'>
              {this.user ? <p>{this.user.name}</p> : <p>Loading</p> }
              {this.story ? <p>{this.story.title}</p> : <p>Loading</p> }
              <p>Page #{(this.state.page.number * 2) - 1}</p>

              { this.state.edit ? <React.Fragment><p>Image:</p><input type='text' name='image' value={this.state.page.image} onChange={this.handleChange}/></React.Fragment> : null }

              { this.state.edit ? <button onClick={this.handleClickSave}>Save</button> :
               this.user === this.props.currentUser ? <button onClick={this.handleClickEdit}>Edit Pages</button> : null }

              {this.user === this.props.currentUser ? <button onClick={this.handleDelete}>Delete Pages</button> : null }
            </div>

            <div className='page-text-inner'>

              { this.state.edit ? <textarea maxLength={1800} name='content' value={this.state.page.content} onChange={this.handleChange}/> : <p>
              {this.state.page.content}
              {this.state.page.content ? <br/> : null}
              {this.state.page.content ? <br/> : null}
              <PagePreviousBtn
              edit={this.state.edit}
              page={this.state.page}
              story={this.story} />
              </p> }



            </div>

            <div className='page-text-inner'>

              { this.state.edit ? <textarea maxLength={1800} name='content_2' value={this.state.page.content_2} onChange={this.handleChange}/> : <p>
              {this.state.page.content_2}
              {this.state.page.content_2 ? <br/> : null}
              {this.state.page.content_2 ? <br/> : null}
              <PageNextBtn
              edit={this.state.edit}
              page={this.state.page}
              story={this.story} />
              </p> }

              <PageNextBtn
              edit={this.state.edit}
              page={this.state.page}
              story={this.story}
              handleCreatePage={this.handleCreatePage}
              currentUser={this.props.currentUser}
              user={this.user} />

            </div>

          </div>
          <img alt={this.story.title} src={this.page && this.page.image ? this.page.image : this.story.image} className='image-right' />
        </>
      )
    } else {
      return <LoadingMedium />
    }

  }
}
