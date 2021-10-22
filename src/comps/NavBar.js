import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Connect from './Connect'
import { TeamContext } from '../GlobalContext'

const NavBar = () => {
  const { teamName } = useContext(TeamContext)

  return (
    <div class='flex justify-between items-center mx-auto px-4 my-10 max-w-5xl'>
      <Link style={{ textDecoration: 'none' }} to={`/team`}>
        <div
          class='flex-1 text-xl font-primary font-black tracking-wider '
          style={{ textDecoration: 'none' }}
        >
          {teamName}
        </div>
      </Link>
      <div class='flex-2 flex space-x-8'>
        {/* <Link style={{ textDecoration: 'none' }} to={`/community/arcade`}>
          <div class='flex-1 underline'>Arcade</div>
        </Link>
        <Link style={{ textDecoration: 'none' }} to={`/community/about`}>
          <div class='flex-1 underline'>About Us</div>
        </Link> */}
        <Connect />
      </div>
    </div>
  )
}

export default NavBar
