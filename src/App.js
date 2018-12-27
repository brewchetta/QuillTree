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
// Page
import PageContainer from './components/Page/PageContainer'


// App class
class App extends Component {

  // Set API address
  // TODO: change back to localhost at some point so it'll stop broadcasting across network
  // IMPORTANT: Be certain to change this in StoryContainer as well
  API = 'http://192.168.1.6:3000/api/v1'

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
      : sortType === 'reverseAlphabetically' ? this.sortReverseAlphabetically()
      : sortType === 'mostStories' ? this.sortMostStories()
      : sortType === 'leastStories' ? this.sortLeastStories()
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

  sortReverseAlphabetically = () => {
    const sortedUsers = [...this.state.users].sort((a,b) => {
      const aName = a.name.toLowerCase()
      const bName = b.name.toLowerCase()
      return aName < bName ? 1 : aName > bName ? -1 : 0
    })
    this.setState({ users: sortedUsers })
  }

  sortMostStories = () => {
    const sortedUsers = [...this.state.users].sort((a,b) => {
      return b.stories.length - a.stories.length
    })
    this.setState({ users: sortedUsers })
  }

  sortLeastStories = () => {
    const sortedUsers = [...this.state.users].sort((a,b) => {
      return a.stories.length - b.stories.length
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

  fetchPage = (pageID) => {
    return fetch(this.API + `/pages/${pageID}`)
    .then(r=>r.json())
  }

  fetchCreatePage = (event) => {
    const storyID = event.target.dataset.storyid
    return fetch(this.API + `/pages`, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({page: {story_id: storyID, content: '', image: ''}})
    }).then(r=>r.json())
  }

  fetchUpdatePage = (page) => {
    return fetch(this.API + `/pages/${page.id}`, {
      method: 'PATCH',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({page: page })
    }).then(r=>r.json())
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
          stories={this.state.stories}
          fetchCreatePage={this.fetchCreatePage} />}
          />

          <Route
          path='/stories'
          exact
          render={props => <StoryIndex {...props}
          stories={this.state.stories} />}
          />

          <Route
          path='/stories/:storyId/pages/:pageId'
          exact
          render={props => <PageContainer {...props}
          users={this.state.users}
          stories={this.state.stories}
          fetchPage={this.fetchPage}
          fetchUpdatePage={this.fetchUpdatePage}  />}
          />

          <Footer />
        </>
      </Router>
    );
  }
}

export default App;
