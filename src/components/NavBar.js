import React from 'react'
import { NavLink } from 'react-router-dom'
import LoginBar from './LoginBar'

const NavBar = (props) => {
  return (
    <div className='navbar'>

      <div className='navbar-left'>

        <div>
        <NavLink
        to='/'
        exact
        style={{ fontSize: '1.1em', fontFamily: "'Allura', cursive" }}>
        QuillTree
        </NavLink>
        </div>

        <div>
        <NavLink
        to='/users'
        exact>Users</NavLink>
        </div>

        <div>
        <NavLink
        to='/stories'
        exact>Stories</NavLink>
        </div>

      </div>

      <LoginBar
      currentUser={props.currentUser}
      users={props.users}
      handleUserSignIn={props.handleUserSignIn} />

    </div>
  )
}

export default NavBar
