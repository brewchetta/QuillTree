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
  API = 'http://localhost:3000/api/v1'

  state = {
    users: [],
    stories: [],
    currentUser: null,
    currentPhoto: {}
  }

  // Initializers
  componentDidMount() {
    this.fetchAllUsers().then(this.setCurrentUserFromSession)
    this.fetchAllStories()
  }

  // Sets current user if current user persists in session
  setCurrentUserFromSession = () => {
    const currentUserName = sessionStorage.getItem('currentUser')
    if (currentUserName && this.state.users.length) {
      this.setState({ currentUser: this.state.users.find(user => user.name === currentUserName) })
    }
  }

  //State setter functions
  setAppState = (object, callback) => {
    console.log('object in setAppState: ', object)
    this.setState(object, callback)
  }

  // Fetches from database
  fetchAllUsers = () => {
    return fetch(this.API + '/users').then(r=>r.json()).then(userData => this.setState({ users: userData }))
  }

  fetchSingleUser = (id) => {
    return fetch(this.API + `/users/${id}`).then(r=>r.json())
  }

  fetchUpdateUser = (user) => {
    return fetch(this.API + `/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: user })
    })
    .then(r=>r.json())
    .then(updatedUser => {
      console.log('user returned: ', updatedUser)
      const newUsers = this.state.users.map(user => user.id === updatedUser.id ? updatedUser : user)
      this.setState({ users: newUsers, currentUser: updatedUser })
    })
  }

  fetchAllStories = () => {
    return fetch(this.API + '/stories').then(r=>r.json()).then(storyData=> this.setAppState({ stories: storyData }))
  }

  fetchSingleStory = (id) => {
    return fetch(this.API + `/stories/${id}`).then(r=>r.json())
  }

  fetchUpdateStory = (story) => {
    return fetch(this.API + `/stories/${story.id}`, {
      method: 'PATCH',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ story: story })
    })
    .then(r=>r.json())
    .then(updatedStory => {
      const newStories = this.state.stories.map(story => story.id === updatedStory.id ? updatedStory : story)
      this.setState({ stories: newStories})
    })
    .then(() => {
      this.fetchSingleUser(this.state.currentUser.id)
      .then(updatedUser => {
        const newUsers = this.state.users.map(user => user.id === updatedUser.id ? updatedUser : user)
        this.setState({ users: newUsers, currentUser: updatedUser })
      })
    })
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
      body: JSON.stringify({page: {story_id: storyID, content: '', content_2: '', image: '', image_credit: '', image_credit_link: ''}})
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
    if (user) { sessionStorage.setItem('currentUser', user.name) }
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
          users={this.state.users}
          currentPhoto={this.state.currentPhoto}
          setAppState={this.setAppState} />}
          />

          <Route
          exact
          path='/users'
          render={props => <UserIndex {...props}
          users={this.state.users}
          usersSort={this.usersSort}
          currentPhoto={this.state.currentPhoto}
          setAppState={this.setAppState} /> }
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
          currentUser={this.state.currentUser}
          fetchUpdateUser={this.fetchUpdateUser} />}
          />

          <Route
          path='/stories/:storyId'
          exact
          render={props => <StoryContainer {...props}
          users={this.state.users}
          stories={this.state.stories}
          fetchCreatePage={this.fetchCreatePage}
          currentUser={this.state.currentUser}
          fetchUpdateStory={this.fetchUpdateStory} />}
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

          <Footer currentPhoto={this.state.currentPhoto} />
        </>
      </Router>
    );
  }
}

export default App;
