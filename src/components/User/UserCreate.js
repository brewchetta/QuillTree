import React from 'react'

export default class UserCreate extends React.Component {

  state = {
    name: '',
    bio: ''
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <form onSubmit={(event) => this.props.userSubmit(event, this.state)}>

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

        <button onClick={(event) => this.props.userSubmit(event, this.state)}>Submit</button>

      </form>
    )
  }

}
