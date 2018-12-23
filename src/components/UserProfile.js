import React from 'react'
import UserStoryCards from './UserStoryCards'

export default class UserProfile extends React.Component {

  // Define userId
  userId = parseInt(this.props.match.params.userId)

  //Define user state
  state = {
    user: {name: null}
  }




  componentDidMount() {
    if (this.props.users.length === 0) {
      this.setUserDelayed()
    } else {
      this.setState({ user: this.users.find(u => u.id === this.userId) })
    }
  }

  setUser = () => {
    this.setState({
      user: this.props.users.find(u => u.id === this.userId)
    })
  }

  setUserDelayed = () => {
    if (!this.state.user || !this.state.user.name) {
      setTimeout(this.setUser, 1000)
      setTimeout(this.setUserDelayed, 1000)
    }
  }

  render() {
    console.log('User: ', this.state.user)
    if (this.state.user && this.state.user.name) {
      return (
        <>
        <h2>{this.state.user.name}</h2>
        <p>Wow! You've gotten to this page! Congratulations!</p>
        <UserStoryCards userStories={this.props.userStories} />
        </>
      )
    } else {
      return (<p>Loading</p>)
    }
  }
}
