import React from 'react'
import { NavLink } from 'react-router-dom'
//import { connect } from 'react-redux'

export default function Nav ({name, avatarURL}) {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/add' activeClassName='active'>
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' activeClassName='active'>
            Leader Board
          </NavLink>
        </li>
        <li>
           Hello, {name}
        </li>
        <li>
           <img
             src={`{avatarURL}`}
             alt={`Avatar of ${name}`}
             className='tinyavatar'
           />
        </li>
        <li>
          <NavLink to='/login' activeClassName='active'>
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
