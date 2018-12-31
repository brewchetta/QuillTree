import React from 'react'

export default class UserCreate extends React.Component {

  state = {
    name: '',
    bio: ''
  }

  // State change on input
  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // Handle submit functions
  handleSubmit = (event) => {
    event.preventDefault()
    console.log('-----Creating-----')
    this.fetchUserSubmit(this.state)
    .then(newUser => { this.props.setAppState({currentUser: newUser}); return newUser })
    .then(newUser => this.props.history.push(`/users/${newUser.id}`))
    .then(() => this.props.fetchAllUsers())
    .catch(response=> console.log(response))
  }

  fetchUserSubmit = (inputObject) => {
    return fetch(this.props.API + '/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user: inputObject})
    }).then(r=>r.json())
  }

  // Main render
  render() {
    console.log(this.props)
    if (!this.props.currentUser) {
      return (
        <div>
        <form onSubmit={this.handleSubmit} className='image-right-text'>

        <h3>Sign Up</h3>

        <label name='name'>Name</label>

        <input type='text'
        name='name'
        onChange={this.handleInput}
        value={this.state.name} />
        <br/>

        <label name='bio'>Biography</label>
        <br/>

        <textarea
        name='bio'
        onChange={this.handleInput}
        value={this.state.bio} />
        <br/>

        <button onClick={this.handleSubmit}>Submit</button>

        </form>
        <div className='image-right'>
          <img alt='scissors' src='https://images.unsplash.com/photo-1517419044068-b406d7e6972d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1537&q=80' />
        </div>
        </div>
      )
    } else {
      return (
        <div className='image-right-text'>
          <p>You're already sign in</p>
          <p>Go write some stories!</p>
          <div className='image-right'>
          <img alt='scissors' src='https://images.unsplash.com/photo-1517419044068-b406d7e6972d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1537&q=80' />
          </div>
        </div>
      )
    }
  }

// Photo credit: Gerrie van der Walt | @gitfo

}
