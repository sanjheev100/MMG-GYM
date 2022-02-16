import React from 'react'
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Image,
  Button,
} from 'react-bootstrap'
import styles from '../../styles/Header.module.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import firebase from 'firebase/compat/app'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Drawer } from 'antd'
import { GiBiceps } from 'react-icons/gi'
import { AiFillAccountBook } from 'react-icons/ai'
import Biceps from '../../images/biceps.png'
const Header = () => {
  let dispatch = useDispatch()
  let navigate = useNavigate()

  let { user, drawer } = useSelector((state) => ({ ...state }))

  const logoutHandler = () => {
    firebase.auth().signOut()
    dispatch({
      type: 'LOGOUT',
      payload: null,
    })
    toast('Logged Out SuccessFully', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    navigate('/')
  }

  const dashboardRedirect = () => {
    navigate('/dashboard')
  }

  const handleSideBar = () => {
    dispatch({
      type: 'DRAWER_STATUS',
      payload: true,
    })
  }

  const handleSideBarClose = () => {
    dispatch({
      type: 'DRAWER_STATUS',
      payload: false,
    })
  }

  return (
    <header>
      <Navbar
        className={styles.Header}
        varaint='dark'
        expand='lg'
        style={{ minHeight: 70 }}
        collapseOnSelect
      >
        <Container>
          {user && user.token && (
            <Button onClick={handleSideBar} style={{ background: 'royalblue' }}>
              <i className='fa-solid fa-bars'></i>
            </Button>
          )}
          <Drawer
            visible={drawer}
            placement='left'
            onClose={handleSideBarClose}
            width={300}
            closable={false}
          >
            <div>
              <nav
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <ul className='nav '>
                  <h2 style={{ color: 'royalblue' }}>
                    MMG GYM <i className='fa-solid fa-dumbbell'></i>
                  </h2>
                  <li className='nav-item mb-2' style={{ width: '100%' }}>
                    <Link
                      style={{ textDecoration: 'none' }}
                      className='nav-link'
                      to='/add/customer'
                      onClick={handleSideBarClose}
                    >
                      <h3
                        style={{
                          color: '#5c3fcf',
                          borderRadius: '20px',
                          padding: '8px 8px 5px 5px',
                          fontSize: '1.2rem',
                          boxShadow: ' 2px 2px 2px 2px #B2BEB5',
                        }}
                        className='text-center'
                      >
                        <i className='fa-solid fa-user-plus'></i> Add Member
                      </h3>
                    </Link>
                  </li>

                  <li className='nav-item  mb-2' style={{ width: '100%' }}>
                    <Link
                      style={{ textDecoration: 'none' }}
                      className='nav-link'
                      to='/allcustomers'
                      onClick={handleSideBarClose}
                    >
                      <h3
                        style={{
                          color: '#5c3fcf',
                          borderRadius: '20px',
                          padding: '8px 8px 5px 5px',
                          fontSize: '1.2rem',
                          boxShadow: ' 2px 2px 2px 2px #B2BEB5',
                        }}
                        className='text-center'
                      >
                        <i className='fa-solid fa-users'></i> All Members
                      </h3>
                    </Link>
                  </li>
                  <li className='nav-item  mb-2' style={{ width: '100%' }}>
                    <Link
                      style={{ textDecoration: 'none' }}
                      className='nav-link'
                      to='/Paidcustomers'
                      onClick={handleSideBarClose}
                    >
                      <h3
                        style={{
                          color: '#5c3fcf',
                          borderRadius: '20px',
                          padding: '8px 8px 5px 5px',
                          fontSize: '1.2rem',
                          boxShadow: ' 2px 2px 2px 2px #B2BEB5',
                        }}
                        className='text-center'
                      >
                        <i className='fa-solid fa-indian-rupee-sign'></i> Paid
                        Members
                      </h3>
                    </Link>
                  </li>
                  <li className='nav-item  mb-2' style={{ width: '100%' }}>
                    <Link
                      style={{ textDecoration: 'none' }}
                      className='nav-link'
                      to='/Unpaidcustomers'
                      onClick={handleSideBarClose}
                    >
                      <h3
                        style={{
                          color: '#5c3fcf',
                          borderRadius: '20px',
                          padding: '8px 8px 5px 5px',
                          fontSize: '1.2rem',
                          boxShadow: ' 2px 2px 2px 2px #B2BEB5',
                          fontSize: '1.2rem',
                        }}
                        className='text-center'
                      >
                        <i className='fa-solid fa-ban'></i> Unpaid Members
                      </h3>
                    </Link>
                  </li>

                  {user && user.role === 'admin' && (
                    <li className='nav-item  mb-2' style={{ width: '100%' }}>
                      <Link
                        style={{ textDecoration: 'none' }}
                        className='nav-link'
                        to='/GymManager'
                        onClick={handleSideBarClose}
                      >
                        <h3
                          style={{
                            color: '#5c3fcf',
                            borderRadius: '20px',
                            padding: '8px 8px 5px 5px',
                            fontSize: '1.2rem',
                            boxShadow: ' 2px 2px 2px 2px #B2BEB5',
                            fontSize: '1.2rem',
                          }}
                          className='text-center'
                        >
                          <i className='fa-solid fa-user-check'></i> Gym Manager
                        </h3>
                      </Link>
                    </li>
                  )}

                  <li className='nav-item  mb-2' style={{ width: '100%' }}>
                    <Link
                      style={{ textDecoration: 'none' }}
                      className='nav-link'
                      to='/user/password'
                      onClick={handleSideBarClose}
                    >
                      <h3
                        style={{
                          color: '#5c3fcf',
                          borderRadius: '20px',
                          fontSize: '1.2rem',
                          padding: '8px 8px 5px 5px',
                          boxShadow: ' 2px 2px 2px 2px #B2BEB5',
                        }}
                        className='text-center'
                      >
                        <i className='fa-solid fa-key'></i> Password
                      </h3>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </Drawer>
          <Link
            to='/'
            style={{
              textDecoration: 'none',
              marginLeft: '20px',
            }}
            onClick={handleSideBarClose}
          >
            <div className={styles.title}>
              <h1
                style={{
                  color: 'white',
                  paddingTop: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                MMG GYM <GiBiceps />
              </h1>
            </div>
          </Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto py-sm-2' id='navItems'>
              {!user && (
                <Link
                  to='/login'
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                  }}
                >
                  <i className='fa fa-sign-in' aria-hidden='true'></i> Sign In
                </Link>
              )}

              {user && (
                <NavDropdown
                  style={{
                    bottom: 8,
                    border: '1px solid royalblue',
                    borderRadius: '10px',
                    background: 'white',
                    boxShadow: '0px 0px 10px 0px rgba(111, 113, 125, 0.5)',
                    marginTop: '15px',
                  }}
                  title={
                    <span className='my-auto' style={{ color: 'black' }}>
                      {user.email && user.email.split('@')[0]}
                    </span>
                  }
                  id='username'
                >
                  <NavDropdown.Item onClick={() => logoutHandler()}>
                    <i className='fa fa-sign-out' aria-hidden='true'></i> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
