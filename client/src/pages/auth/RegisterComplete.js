import React, { useState, useEffect } from 'react'
import { FormContainer } from '../../components'
import { Form, Button, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { authen } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { confettishow } from '../../common/confetti'
import { useSelector, useDispatch } from 'react-redux'
import { createOrUpdateUser } from '../../api/auth'

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [buttonLoading, setButtonLoading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

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

  const submitHandler = async () => {
    if (password.length < 6) {
      return toast.error(`Password must be 6 characters`)
    }

    if (confirmPassword !== password) {
      return toast.error(`Passwords are not matching`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }

    if (!email && !password) {
      return toast.error(`Email and Password is Necessary`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }

    setButtonLoading(true)
    try {
      const result = await authen.signInWithEmailLink(
        email,
        window.location.href
      )
      if (result.user.emailVerified) {
        //remove email from local storage
        window.localStorage.removeItem('mercuryNewRegister')
        let user = authen.currentUser
        await user.updatePassword(password)
        const idTokenResult = await user.getIdTokenResult()

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            })
          })
          .catch((error) => {
            toast.error(error, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          })

        // console.log(user, idTokenResult)

        navigate('/')

        setEmail('')
        setPassword('')
        //paper effect
        confettishow()
      } else {
        return toast.error('Email Not Verified Use different Mail', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
      setButtonLoading(false)
    } catch (error) {
      console.log(error)
      setButtonLoading(false)

      return toast.error(`${error.message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  useEffect(() => {
    setEmail(window.localStorage.getItem('mercuryNewRegister'))
  }, [])

  return (
    <FormContainer>
      <h1>Registration Complete</h1>
      <Form>
        <Form.Group controlId='email'>
          <Form.Label>
            <strong>Email Address</strong>{' '}
            {!window.localStorage.getItem('mercuryNewRegister')
              ? '(Enter the same mail)'
              : ''}
          </Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your Email'
            value={email}
            required={true}
            disabled={window.localStorage.getItem('mercuryNewRegister')}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter your password'
            value={password}
            required={true}
            autoComplete='on'
            autoFocus
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmpassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Re-Enter your password'
            value={confirmPassword}
            autoComplete='on'
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
      </Form>
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
          onClick={() => submitHandler()}
        >
          Complete Registration
        </Button>
      )}
    </FormContainer>
  )
}
export default RegisterComplete
