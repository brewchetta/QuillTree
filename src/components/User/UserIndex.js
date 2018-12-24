import React from 'react'
import UserCard from './UserCard'

class UserIndex extends React.Component {

  state = {
    searchInput: ''
  }

  // Renders all users
  renderUsers = () => {
    if (this.props.users) {
      return this.props.users.slice(0,49).map(user => {
        return user.name.toLowerCase().includes(this.state.searchInput.toLowerCase()) ?
        <UserCard key={user.name} user={user} />
        : null
      })
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
        <button onClick={this.props.usersSort}>A-Z</button>
        <button>Most Stories</button>
        <button>Least Stories</button>
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
