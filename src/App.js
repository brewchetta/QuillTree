import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
// Main Components
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
  API = 'http://192.168.1.2:3000/api/v1'

  state = {
    users: [],
    stories: [],
    currentUser: null
  }

  // Initializers
  componentDidMount() {
    this.fetchAllUsers()
    this.fetchAllStories() }

  //State setter functions
  setAppState = (object, callback) => {
    this.setState(object, callback)
  }

  // TODO PUT THIS IN ITS OWN COMPONENT
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
    return fetch(this.API + '/users').then(r=>r.json()).then(userData => this.setState({ users: userData }))
  }

  fetchSingleUser = (id) => {
    return fetch(this.API + `/users/${id}`).then(r=>r.json())
  }

  fetchAllStories = () => {
    return fetch(this.API + '/stories').then(r=>r.json()).then(storyData=> this.setAppState({ stories: storyData }))
  }

  fetchSingleStory = (id) => {
    return fetch(this.API + `/stories/${id}`).then(r=>r.json())
  }

  fetchCreateStory = (story) => {
    return fetch(this.API + '/stories', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({story: story})
    })
    .then(r => r.json())
    .then(story => {
      this.setState({ stories: [...this.state.stories, story] })
      return story
    })
    .then(story => {
      this.updateCurrentUser()
      return story
    })
  }

  fetchDeleteStory = (storyId) => {
    return fetch(this.API + `/stories/${storyId}`, { method: 'DELETE' })
    .then(r => r.json())
    .then(deletedStory => {
      const foundStory = this.state.stories.find(story => story.id === deletedStory.id)
      const storyIndex = this.state.stories.indexOf(foundStory)
      const newStories = [...this.state.stories]
      newStories.splice(storyIndex, 1)
      this.setState({ stories: newStories })
    })
    .then(this.updateCurrentUser)
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
    })
    .then(r=>r.json())
    .then(page=>{
      const newStories = [...this.state.stories.map(story => {
        return story.id === page.story_id ? {...story, pages: [...story.pages, page]} : story
      })]
      this.setState({ stories: newStories })
      return page
    })
  }

  fetchUpdatePage = (page) => {
    return fetch(this.API + `/pages/${page.id}`, {
      method: 'PATCH',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({page: page })
    }).then(r=>r.json())
  }

  fetchDeletePage = (page) => {
    return fetch(this.API + `/pages/${page.id}`, { method: 'DELETE' })
    .then(r => r.json())
    .then(deletedPage => this.fetchDeletePageCleanup(deletedPage))
  }

  fetchDeletePageCleanup = (deletedPage) => {
    const foundStory = this.state.stories.find(story => story.id === deletedPage.story_id)
    console.log('Story: ', foundStory)
    this.fetchSingleStory(foundStory.id)
    .then(fetchedStory => {
      const newStories = this.state.stories.map(story => story.id === fetchedStory.id ? fetchedStory : story)
      this.setState({ stories: newStories })

    })
  }

  // Handle user sign in attempts
  handleUserSignIn = (user) => {
    this.setState({ currentUser: user })
  }

  // Update user after user is refetched
  updateCurrentUser = () => {
    this.fetchSingleUser(this.state.currentUser.id)
    .then(fetchedUser => {
      const newUsers = this.state.users.map(user => {
        return user.id === fetchedUser.id ? fetchedUser : user
      })
      this.setState({ users: newUsers, currentUser: fetchedUser })
    })
  }

  // Render routes
  render() {
    return (
      <Router>
        <>
          <NavBar
          currentUser={this.state.currentUser}
          users={this.state.users}
          handleUserSignIn={this.handleUserSignIn} />

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
          API={this.API}
          currentUser={this.state.currentUser}
          setAppState={this.setAppState} /> }
          />

          <Route
          path='/users/:userId'
          exact
          render={props => <UserProfile {...props}
          users={this.state.users}
          fetchCreateStory={this.fetchCreateStory}
          fetchDeleteStory={this.fetchDeleteStory}
          currentUser={this.state.currentUser} />}
          />

          <Route
          path='/stories/:storyId'
          exact
          render={props => <StoryContainer {...props}
          users={this.state.users}
          stories={this.state.stories}
          fetchCreatePage={this.fetchCreatePage}
          currentUser={this.state.currentUser} />}
          />

          <Route
          path='/stories'
          exact
          render={props => <StoryIndex {...props}
          stories={this.state.stories}
          users={this.state.users} />}
          />

          <Route
          path='/stories/:storyId/page/:pageNum'
          exact
          render={props => <PageContainer {...props}
          users={this.state.users}
          stories={this.state.stories}
          fetchPage={this.fetchPage}
          fetchUpdatePage={this.fetchUpdatePage}
          fetchCreatePage={this.fetchCreatePage}
          fetchDeletePage={this.fetchDeletePage}
          currentUser={this.state.currentUser}  />}
          />

          <Footer />
        </>
      </Router>
    );
  }
}

export default App;
