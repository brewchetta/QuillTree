import React from 'react'
import UserCard from './UserCard'
import LoadingMedium from '../LoadingMedium'

class UserIndex extends React.Component {

  state = {
    searchInput: ''
  }

  credit = {
    url: 'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
    credit: 'Steven Kamenar',
    credit_link: 'https://unsplash.com/@skamenar'
  }

  // Sets photo credit
  componentDidMount() {
    if (this.props.currentPhoto !== this.credit) {
      setTimeout(() => this.props.setAppState({ currentPhoto: this.credit }), 100)
    }
    console.log('currentPhoto is: ', this.props.currentPhoto)
  }

  // Renders 12 users based on search input
  renderUsers = () => {
    const searchInput = this.state.searchInput.toLowerCase()
    if (this.props.users) {
      return this.props.users
      .map(user => {
        return user.name.toLowerCase().includes(searchInput) || user.stories.map(story=>story.title.toLowerCase().includes(searchInput)).includes(true) ?
        <UserCard key={user.name} user={user} />
        : null
      })
      .filter(user => user !== null)
      .slice(0,12)
    }
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // Main render
  render() {
    if (this.props.users.length) {
      return (
        <>
          <div className='image-right-text' style={{ 'marginBottom': '3em' }}>

            <input type='text'
            name='searchInput'
            placeholder='Search Users & Titles'
            value={this.state.searchInput}
            onChange={this.handleInput} />

            <div className='user-index-card-container'>
              {this.renderUsers()}
            </div>

          </div>

          <img className='image-right'
          alt='User Index' src='https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80' />
        </>
      )
    } else { return <LoadingMedium /> }

  }

}

export default UserIndex
