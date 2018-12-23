import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
      <NavLink
      to='/users'
      exact>Users</NavLink>
    </div>
  )
}

export default NavBar
