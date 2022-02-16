import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FormContainer } from '../../components'
import { toast } from 'react-toastify'
import { authen } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Register = () => {
  // const auth = getAuth()
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
  }, [user, navigate])

  const [email, setEmail] = useState('')
  const [buttonLoading, setButtonLoading] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    setButtonLoading(true)
    console.log(email)
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    }

    await authen.sendSignInLinkToEmail(email, config)

    toast.success(
      `Verification Mail Sent to ${email},Click the link to complete your Registration`,
      {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    )

    window.localStorage.setItem('mercuryNewRegister', email)
    setEmail('')
    setButtonLoading(false)
  }

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your Email'
            value={email}
            required={true}
            autoFocus={true}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        {buttonLoading ? (
          <Button variant='primary' className='btn-raised mt-3' disabled>
            <Spinner
              as='span'
              animation='grow'
              size='sm'
              role='status'
              aria-hidden='true'
            />
            {'  '}
            Loading...
          </Button>
        ) : (
          <Button
            type='submit'
            disabled={buttonLoading}
            className='btn-raised mt-3'
            variant='primary'
          >
            Register
          </Button>
        )}
      </Form>
      <Row className='py-3'>
        <Col>
          Alreary Have an Account? <Link to='/login'>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default Register
