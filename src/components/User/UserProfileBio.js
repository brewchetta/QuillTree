import React from 'react'

export default class UserProfileBio extends React.Component {


  state = {
    edit: false
  }


  render() {
    return (
      <p>{this.props.user.bio}</p>
    )
  }

}
