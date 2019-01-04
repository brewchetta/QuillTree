import React from 'react'
import StoryCard from './StoryCard'
import LoadingMedium from '../LoadingMedium'

export default class StoryIndex extends React.Component {

  state = {
    searchInput: ''
  }

  credit = {
    url: 'https://images.unsplash.com/photo-1464263703464-63a9642fcab2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1468&q=80',
    credit: 'Annie Sprat',
    credit_link: 'https://unsplash.com/@anniespratt'
  }

  componentDidMount() {
    if (this.props.currentPhoto !== this.credit) {
      setTimeout(() => this.props.setAppState({ currentPhoto: this.credit }), 100)
    }
  }

  // Renders 12 stories based on search input
  renderStories = () => {
    const searchInput = this.state.searchInput.toLowerCase()
    if (this.props.stories) {
      return this.props.stories
      .map(story => {
        return story.title.toLowerCase().includes(searchInput) ?
        <StoryCard key={story.id}
        user={this.props.users.find(user => user.id === story.user_id)}
        story={story} />
        : null
      })
      .filter(story => story !== null)
      .slice(0,12)
    }
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    if (this.props.stories.length) {
      return (
        <>
        <div className='image-right-text' style={{ 'marginBottom': '3em' }}>
          <div>

            <input type='text'
            name='searchInput'
            placeholder='Search Titles'
            value={this.state.searchInput}
            onChange={this.handleInput} />
          </div>


          <br/>

          {this.renderStories()}
        </div>

        <img className='image-right'
        alt='stories index'
        src='https://images.unsplash.com/photo-1464263703464-63a9642fcab2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1468&q=80' />
        </>
      )
    } else {
      return <LoadingMedium />
    }
  }

  // Photo credit: Annie Sprat | @anniespratt

}
