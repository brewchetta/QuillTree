import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
      <NavLink
      to='/users'
      exact>Users</NavLink>
      <br/>
      <NavLink
      to='/'
      exact>Home</NavLink>
    </div>
  )
}

export default NavBar
