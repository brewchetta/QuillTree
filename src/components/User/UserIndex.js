import React from 'react'
import UserCard from './UserCard'
import LoadingMedium from '../LoadingMedium'

class UserIndex extends React.Component {

  state = {
    searchInput: ''
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
        <div className='user-index'>

          <div>
            <button onClick={()=>this.props.usersSort('alphabetically')}>Names A-Z</button>
            <button onClick={()=>this.props.usersSort('reverseAlphabetically')}>Names Z-A</button>
            <button onClick={()=>this.props.usersSort('mostStories')}>Most Stories</button>
            <button onClick={()=>this.props.usersSort('leastStories')}>Least Stories</button>
          </div>

          <input type='text'
          name='searchInput'
          placeholder='Search Users & Titles'
          value={this.state.searchInput}
          onChange={this.handleInput} />

          <div className='user-index-card-container'>
            {this.renderUsers()}
          </div>

          <img alt='forest' src='https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80' />

        </div>
      )
    } else { return <LoadingMedium /> }

  }
  // Photo Credit: Steven Kamenar | @skamenar

}

export default UserIndex
