import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';

// Import components
import NavBar from './components/NavBar'
import UserList from './components/UserList'
import UserProfile from './components/UserProfile'
import Home from './components/Home'

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

  setUsers = (array) => {
    this.setState({ users: array }, () => this.logState('users'))
  }

  setUserStories = (array) => {
    this.setState({ userStories: array })
  }

  // Fetch from database functions
  fetchAllUsers = () => {
    return fetch(API + '/users').then(r=>r.json()).then(userData => this.setUsers(userData))
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
          render={props => <UserList {...props} users={this.state.users} setUserStories={this.setUserStories} /> }
          />

          <Route
          path='/users/:userId'
          render={props => <UserProfile {...props}
          users={this.state.users}
          userStories={this.state.userStories}
          fetchUserStories={this.fetchUserStories} />}
          />

          <Route
          path='/'
          exact
          render={props => <Home {...props}
          users={this.state.users} />}
          />
        </>
      </Router>
    );
  }
}

export default App;
