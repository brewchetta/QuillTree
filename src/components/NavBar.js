import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
      <NavLink
      to='/signup'
      exact>Sign Up</NavLink>
      <br/>

      <NavLink
      to='/users'
      exact>Users</NavLink>
      <br/>

      <NavLink
      to='/stories'
      exact>Stories</NavLink>
      <br/>

      <NavLink
      to='/'
      exact>Home</NavLink>
    </div>
  )
}

export default NavBar
