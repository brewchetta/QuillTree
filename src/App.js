import React, { Component } from 'react';
import './App.css';
import UserList from './components/UserList'

const API = 'http://localhost:3000/api/v1'

class App extends Component {

  state = {
    users: [],
    userStories: []
  }

  // Initializers
  componentDidMount() { this.fetchAllUsers() }

  //State setter functions
  logState = (item) => {
    item ? console.log(`${item}: `, this.state[item]) : console.log('current state: ', this.state)
  }

  setAppState = (object) => { this.setState(object, this.logState) }
  
  setUsersState = (array) => {
    this.setState({ users: array }, () => this.logState('users'))
  }

  setUserStoriesState = (array) => {
    this.setState({ userStories: array }, () => this.logState('userStories'))
  }

  // Fetch from database functions
  fetchAllUsers = () => {
    return fetch(API + '/users').then(r=>r.json()).then(userData => this.setUsersState(userData))
  }

  fetchUserStories = (userID) => {
    return fetch(API + '/users/' + userID + '/stories')
    .then(r=>r.json())
    .then(storiesData => this.setUserStories(storiesData))
  }

  // Render
  render() {
    return (
      <UserList
      users={this.state.users}
      />
    );
  }
}

export default App;
