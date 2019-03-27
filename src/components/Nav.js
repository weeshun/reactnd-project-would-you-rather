import React from 'react'
import { NavLink } from 'react-router-dom'
//import { connect } from 'react-redux'

export default function Nav ({name, avatarURL}) {
  // console.log("*** NAV ***")
  // console.log("name: ", name)
  // console.log("avatarURL: ", avatarURL)
  return (
    (name === '')
    ? null
    :
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
          <div className='tinyavatar'>
           <img
             src={avatarURL}
             alt={`Avatar of ${name}`}
             className='tinyavatar'
           />
           </div>
        </li>
        <li>
          <NavLink to='/signout' activeClassName='active'>
            Logout
          </NavLink>
        </li>

      </ul>
    </nav>
  )
}
