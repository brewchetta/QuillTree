import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';

// Import components
import NavBar from './components/NavBar'
import UserList from './components/UserList'
import UserProfile from './components/UserProfile'

// Set API address
// (change back to localhost at some point so it'll stop broadcasting across network)
const API = 'http://192.168.1.6:3000/api/v1'

// App class
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

  // Render routes
  render() {
    return (
      <Router>
        <>
          <NavBar />

          <Route
          exact path='/users'
          render={props => <UserList {...props} users={this.state.users} /> }
          />

          <Route
          path='/users/:userId'
          render={props => <UserProfile {...props} users={this.state.users} />}
          />
        </>
      </Router>
    );
  }
}

export default App;
