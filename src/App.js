import React, { Component } from 'react';
import './App.css';
import UserList from './components/UserList'

const API = 'http://localhost:3000/api/v1'

class App extends Component {

  state = {
    users: [],
    stories: []
  }

  // Initializers
  componentDidMount() {
    this.fetchAllUsers().then(response=> {
      this.setState({ users: response }, ()=> console.log(this.state.users))
    })
  }

  // Fetch from database functions
  fetchAllUsers = () => {
    return fetch(API + '/users').then(r=>r.json())
  }

  // Props
  setAppState = (object) => { this.setState(object) }

  // Render
  render() {
    return (
      <UserList users={this.state.users} />
    );
  }
}

export default App;
