import React, { useState, useEffect } from 'react'
import { FormContainer } from '../../components'
import { Button, Row, Form, Col } from 'react-bootstrap'
import { authen } from '../../firebase'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    if (user && user.token) {
      navigate('/')
      toast.error('Already Logged In', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }, [user])

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    }
    await authen
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail('')
        setLoading(false)
        toast.success('Password Reset Link Sent', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
      .catch((error) => {
        setLoading(false)
        toast.error(error.message, {
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
  return (
    <FormContainer>
      {loading ? (
        'Loading'
      ) : (
        <>
          <h1>Password Reset</h1>
          <Form>
            <Form.Group controlId='email'>
              <Form.Label>
                <strong>Email Address</strong>
              </Form.Label>
              <Form.Control
                type='email'
                autoFocus={true}
                placeholder='Enter your Email'
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              onClick={(e) => handleForgotPassword(e)}
              type='button'
              className='mt-3 btn btn-primary'
              disabled={!email || email.length < 6}
            >
              Click to Receive Email With Link
            </Button>
          </Form>
        </>
      )}
    </FormContainer>
  )
}
export default ForgotPassword
