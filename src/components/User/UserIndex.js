import React from 'react'
import UserCard from './UserCard'

class UserIndex extends React.Component {

  state = {
    searchInput: ''
  }

  // Renders all users
  renderUsers = () => {
    if (this.props.users) {
      return this.props.users
      .map(user => {
        return user.name.toLowerCase().includes(this.state.searchInput.toLowerCase()) ?
        <UserCard key={user.name} user={user} />
        : null
      })
      .filter(user => user !== null)
      .slice(0,5)
    }
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // Main render
  render() {
    return (
      <div>
        <div>
          <button onClick={()=>this.props.usersSort('alphabetically')}>Names A-Z</button>
          <button onClick={()=>this.props.usersSort('reverseAlphabetically')}>Names Z-A</button>
          <button onClick={()=>this.props.usersSort('mostStories')}>Most Stories</button>
          <button onClick={()=>this.props.usersSort('leastStories')}>Least Stories</button>
        </div>

        <input type='text'
        name='searchInput'
        placeholder='Search Users'
        value={this.state.searchInput}
        onChange={this.handleInput} />

        <h2>USER LIST</h2>
        {this.renderUsers()}
      </div>
    )
  }

}

export default UserIndex
