import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';

// Import components
import NavBar from './components/NavBar'
import UserList from './components/User/UserList'
import UserProfile from './components/User/UserProfile'
import Home from './components/Home'
import StoryContainer from './components/Story/StoryContainer'
import StoryIndex from './components/Story/StoryIndex'

// Set API address
// TODO: change back to localhost at some point so it'll stop broadcasting across network
const API = 'http://192.168.1.7:3000/api/v1'

// App class
class App extends Component {

  state = {
    users: [],
    stories: [],
    userStories: [],
    userId: 0
  }

  // Initializers
  componentDidMount() {
    this.fetchAllUsers()
    this.fetchAllStories() }

  //State setter functions
  setAppState = (object) => { this.setState(object, this.logState) }

  setUserId = (id) => {
    this.setState({ userId: id }, () => this.fetchUserStories(id))
  }

  // Fetch from database functions
  fetchAllUsers = () => {
    return fetch(API + '/users').then(r=>r.json()).then(userData => this.setAppState({ users: userData }))
  }

  fetchAllStories = () => {
    return fetch(API + '/stories').then(r=>r.json()).then(storyData=> this.setAppState({ stories: storyData }))
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
          exact
          render={props => <UserProfile {...props}
          users={this.state.users}
          userStories={this.state.userStories}
          setUserId={this.setUserId} />}
          />

          <Route
          path='/'
          exact
          render={props => <Home {...props}
          users={this.state.users} />}
          />

          <Route
          path='/stories/:storyId'
          exact
          render={props => <StoryContainer {...props}
          users={this.state.users}
          stories={this.state.stories} />}
          />

          <Route
          path='/stories'
          exact
          render={props => <StoryIndex {...props}
          stories={this.state.stories} />}
          />
        </>
      </Router>
    );
  }
}

export default App;
