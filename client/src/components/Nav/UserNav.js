import React from 'react'
import { Link } from 'react-router-dom'
const UserNav = () => {
  return (
    <nav
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <ul className='nav '>
        <li className='nav-item mb-2'>
          <Link
            style={{ textDecoration: 'none' }}
            className='nav-link'
            to='/add/customer'
          >
            <h3>Add Member</h3>
          </Link>
        </li>
        <li className='nav-item  mb-2'>
          <Link
            style={{ textDecoration: 'none' }}
            className='nav-link'
            to='/allcustomers'
          >
            <h3>All Members</h3>
          </Link>
        </li>
        <li className='nav-item  mb-2'>
          <Link
            style={{ textDecoration: 'none' }}
            className='nav-link'
            to='/Paidcustomers'
          >
            <h3>Paid Members</h3>
          </Link>
        </li>
        <li className='nav-item  mb-2'>
          <Link
            style={{ textDecoration: 'none' }}
            className='nav-link'
            to='/Unpaidcustomers'
          >
            <h3>Unpaid Members</h3>
          </Link>
        </li>

        <li className='nav-item  mb-2'>
          <Link
            style={{ textDecoration: 'none' }}
            className='nav-link'
            to='/user/password'
          >
            <h3>Password</h3>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default UserNav
