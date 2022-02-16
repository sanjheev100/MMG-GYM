import React, { useState } from 'react'
import { UserNav, FormContainer } from '../../components'
import { toast } from 'react-toastify'
import { authen } from '../../firebase'
import { confettishow } from '../../common/confetti'
import { Button, Form, Spinner } from 'react-bootstrap'
const PasswordChange = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!password || password !== confirmPassword) {
      return toast.error('Empty or Password Does not Match', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
    setLoading(true)
    await authen.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false)
        toast.success('Password Updated', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setPassword('')
        setConfirmPassword('')
        confettishow()
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
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          <FormContainer>
            <h1 className='text-danger text-center'>Change Password</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId='password'>
                <Form.Label>
                  <strong>New Password</strong>
                </Form.Label>

                <Form.Control
                  type='password'
                  autoFocus={true}
                  placeholder='Enter your new password'
                  value={password}
                  disabled={loading}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
                <Form.Text className='text-muted '>
                  Password Must be 6 characters
                </Form.Text>
              </Form.Group>
              <Form.Group controlId='confirmPassword'>
                <Form.Control
                  type='password'
                  disabled={loading}
                  placeholder='Confirm password'
                  value={confirmPassword}
                  className='mt-3'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>

                {loading ? (
                  <Button
                    // variant='primary'
                    className='mt-2 btn-danger'
                    disabled
                  >
                    <Spinner
                      as='span'
                      animation='grow'
                      size='sm'
                      role='status'
                      aria-hidden='true'
                    />
                    {'  '}
                    Updating Password
                  </Button>
                ) : (
                  <Button
                    disabled={!password || password.length < 6}
                    type='submit'
                    className='mt-3 btn-primary'
                    style={{ borderRadius: 20 }}
                  >
                    <i className='fas fa-check'> </i> Change Password
                  </Button>
                )}
              </Form.Group>
            </Form>
          </FormContainer>
        </div>
      </div>
    </div>
  )
}

export default PasswordChange

//  {
//    loading ? (
//      'loading from login' //loader component
//    ) : (
//      <>
//        <h1 className='text-danger text-center'>Change Password</h1>
//        <Form onSubmit={handleSubmit}>
//          <Form.Group controlId='password'>
//            <Form.Label>
//              <strong>New Password</strong>
//            </Form.Label>

//            <Form.Control
//              type='password'
//              autoFocus={true}
//              placeholder='Enter your new password'
//              value={password}
//              disabled={loading}
//              onChange={(e) => setPassword(e.target.value)}
//            ></Form.Control>
//            <Form.Text className='text-muted '>
//              Password Must be 6 characters
//            </Form.Text>
//          </Form.Group>
//          <Form.Group controlId='confirmPassword'>
//            <Form.Control
//              type='password'
//              autoFocus={true}
//              disabled={loading}
//              placeholder='Confirm password'
//              value={confirmPassword}
//              className='mt-3'
//              onChange={(e) => setConfirmPassword(e.target.value)}
//            ></Form.Control>

//            {loading ? (
//              <Button
//                // variant='primary'
//                className='mt-2 btn-danger'
//                disabled
//              >
//                <Spinner
//                  as='span'
//                  animation='grow'
//                  size='sm'
//                  role='status'
//                  aria-hidden='true'
//                />
//                {'  '}
//                Loading...
//              </Button>
//            ) : (
//              <Button
//                disabled={!password || password.length < 6}
//                type='submit'
//                className='mt-2 btn-danger'
//                style={{ borderRadius: 20 }}
//              >
//                <i className='fas fa-check'> </i> Change Password
//              </Button>
//            )}
//          </Form.Group>
//        </Form>
//      </>
//    )
//  }
