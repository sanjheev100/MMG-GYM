import { Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  deleteUser,
  getAllDBUsers,
  removeManager,
  updateManager,
} from '../../api/users'
import { FormContainer } from '../../components'

const GymManager = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAllUsers()
  }, [])

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    if (user.role === 'admin') {
      // toast.success('Welcome to Admin Dashboard')
    } else if (user.role === 'manager') {
      // toast.success('Welcome to Manager ')
    } else {
      // toast.error('You are not authorized to access this page')
      dispatch({ type: 'LOGOUT', payload: null })
      navigate('/login')
      return
    }
  }, [user])

  const loadAllUsers = () => {
    setLoading(true)
    getAllDBUsers(user.token)
      .then((res) => {
        setUsers(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.err, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
  }

  const handleChangeManger = (userId, role) => {
    if (user.role != 'admin') {
      toast.error('You are not authorized to access this option')
      return
    }
    var payload = {
      id: userId,
      role: role,
    }
    updateManager(user.token, payload)
      .then((res) => {
        setLoading(false)
        toast.success('Manager updated successfully')
        loadAllUsers()
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.err, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
  }

  const handleDelete = (id) => {
    if (user.role != 'admin') {
      toast.error('You are not authorized to access this option')
      return
    }
    let answer = window.confirm('Are you sure you want to delete this user?')
    if (answer) {
      setLoading(true)
      deleteUser(user.token, id)
        .then((res) => {
          setLoading(false)
          toast.success('User Deleted successfully')
          loadAllUsers()
        })
        .catch((err) => {
          setLoading(false)
          toast.error(err.response.data.err, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        })
    }
  }
  // updateManager
  return (
    <div>
      <FormContainer>
        Gym Manager
        <br />
        <div>
          <br />
          {users.map((user) => (
            <>
              <div key={user._id} className='alert alert-primary'>
                {user.name} -- {user.role}
                {user.role == 'manager' ? (
                  <>
                    {!loading ? (
                      <Tooltip title='Remove Manager Rights'>
                        <span className='float-end mx-2'>
                          <i
                            className='fa-solid fa-user-check  text-danger'
                            aria-hidden='true'
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              handleChangeManger(user._id, user.role)
                            }
                          ></i>
                        </span>
                      </Tooltip>
                    ) : (
                      ''
                    )}
                  </>
                ) : (
                  <>
                    {!loading ? (
                      <Tooltip title='Add Manager Rights'>
                        <span className='float-end mx-2'>
                          <i
                            className='fa-solid fa-user-plus text-success'
                            aria-hidden='true'
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              handleChangeManger(user._id, user.role)
                            }
                          ></i>
                        </span>
                      </Tooltip>
                    ) : (
                      ' '
                    )}
                  </>
                )}
                {!loading ? (
                  <Tooltip title='Delete This User Permanentely'>
                    <span className='float-end mx-2'>
                      <i
                        className='fa fa-trash  text-danger'
                        aria-hidden='true'
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDelete(user._id)}
                      ></i>
                    </span>
                  </Tooltip>
                ) : (
                  ''
                )}
              </div>
            </>
          ))}
        </div>
      </FormContainer>
    </div>
  )
}

export default GymManager
