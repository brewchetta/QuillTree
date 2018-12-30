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
        exact>Home</NavLink>
        </div>

        <div>
        <NavLink
        to='/users'
        exact>Users</NavLink>
        <br/>
        </div>

        <div>
        <NavLink
        to='/stories'
        exact>Stories</NavLink>
        <br/>
        </div>

        <div>
        <NavLink
        to='/signup'
        exact>Sign Up</NavLink>
        <br/>
        </div>
      </div>

      <LoginBar
      currentUser={props.currentUser}
      users={props.users} />
    </div>
  )
}

export default NavBar
