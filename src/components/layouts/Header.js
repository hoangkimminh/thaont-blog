import React from 'react'
import { Link } from 'react-router-dom'

import colors from '../../utils/colors'

const Header = () => {
  return (
    <nav
      className='navbar navbar-expand-lg navbar-dark static-top'
      style={{ backgroundColor: colors.background_peach, color: colors.title_warm }}
    >
      <div className='container'>
        <Link to='/'>
          <a className='navbar-brand font-weight-bold' href='#'>
            LITTLE CORNER OF MINE
          </a>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarResponsive'
          aria-controls='navbarResponsive'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item active'>
              <Link to='/'>
                <a className='nav-link' href='#'>
                  Home
                  <span className='sr-only'>(current)</span>
                </a>
              </Link>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#'>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
