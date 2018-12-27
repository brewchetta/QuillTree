import React from 'react'

export default class PageContainer extends React.Component {

  // Define User and Story
  storyId = parseInt(this.props.match.params.storyId)
  story = {}
  user = {}

  // Main render
  render() {
    // Redefine user and story
    this.story = this.props.stories.find(story => story.id === this.storyId)
    this.user = this.story ? this.props.users.find(user => user.id === this.story.user_id) : {}

    return (
      <div>
        
        <p>TEST</p>
      </div>
    )
  }
}
