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
    .then(this.props.fetchAllUsers)
    .then(() => this.props.history.push('/users'))
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
    })
  }

  // Main render
  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        <br/>
        <label name='name'>Name</label>

        <input type='text'
        name='name'
        onChange={this.handleInput}
        value={this.state.name} />
        <br/>

        <label name='bio'>Biography</label>

        <input type='text'
        name='bio'
        onChange={this.handleInput}
        value={this.state.bio} />
        <br/>

        <button onClick={this.handleSubmit}>Submit</button>

      </form>
    )
  }

}
