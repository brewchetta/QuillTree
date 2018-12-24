import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';

// Import components
import NavBar from './components/NavBar'
import Home from './components/Home'
import Footer from './components/Footer.js'
// User
import UserIndex from './components/User/UserIndex'
import UserProfile from './components/User/UserProfile'
import UserCreate from './components/User/UserCreate'
// Story
import StoryIndex from './components/Story/StoryIndex'
import StoryContainer from './components/Story/StoryContainer'


// App class
class App extends Component {

  // Set API address
  // TODO: change back to localhost at some point so it'll stop broadcasting across network
  API = 'http://192.168.1.7:3000/api/v1'

  state = {
    users: [],
    stories: [],
    currentUser: {}
  }

  // Initializers
  componentDidMount() {
    this.fetchAllUsers()
    this.fetchAllStories() }

  //State setter functions
  setAppState = (object) => { this.setState(object, this.logState) }

  // users sorter
  usersSort = (sortType) => {
    return (
      sortType === 'alphabetically' ? this.sortAlphabetically()
      : null
    )
  }

  sortAlphabetically = () => {
    const sortedUsers = [...this.state.users].sort((a,b) => {
      const aName = a.name.toLowerCase()
      const bName = b.name.toLowerCase()
      return aName > bName ? 1 : aName < bName ? -1 : 0
    })
    this.setState({ users: sortedUsers })
  }

  // Fetches from database
  fetchAllUsers = () => {
    return fetch(this.API + '/users').then(r=>r.json()).then(userData => this.setAppState({ users: userData }))
  }

  fetchAllStories = () => {
    return fetch(this.API + '/stories').then(r=>r.json()).then(storyData=> this.setAppState({ stories: storyData }))
  }

  // Render routes
  render() {
    return (
      <Router>
        <>
          <NavBar />

          <Route
          path='/'
          exact
          render={props => <Home {...props}
          users={this.state.users} />}
          />

          <Route
          exact
          path='/users'
          render={props => <UserIndex {...props}
          users={this.state.users}
          usersSort={this.usersSort} /> }
          />

          <Route
          exact
          path='/signup'
          render={props => <UserCreate {...props}
          users={this.state.users}
          fetchAllUsers={this.fetchAllUsers}
          API={this.API} /> }
          />

          <Route
          path='/users/:userId'
          exact
          render={props => <UserProfile {...props}
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

          <Footer />
        </>
      </Router>
    );
  }
}

export default App;
