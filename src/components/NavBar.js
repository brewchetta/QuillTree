import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='navbar'>
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
  )
}

export default NavBar
