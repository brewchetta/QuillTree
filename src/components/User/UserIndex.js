import React from 'react'
import UserCard from './UserCard'

const UserIndex = (props) => {

  // Renders all users
  const renderUsers = () => {
    if (props.users) {
      return props.users.map(user => {
        return <UserCard key={user.name} user={user} />
      })
    }
  }

  // Main render
  return (
    <div>
    <h2>USER LIST</h2>
    {renderUsers()}
    </div>
  )
}

export default UserIndex
