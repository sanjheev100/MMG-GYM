import React from 'react'
import pagenotfoundImage from '../images/pagenotfound.jpg'
import { FormContainer } from '../components'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
const PageNotFound = () => {
  return (
    <>
      <FormContainer>
        <h1>Oops..! 404 Page Not Found</h1>
        <p>Looks like you came to wrong page on our server</p>
        <img src={pagenotfoundImage} height='300' width='300' alt='not found' />
        <br />
        <br />
        <br />
        <Link to='/'>
          <Button>Go Home</Button>
        </Link>
      </FormContainer>
    </>
  )
}

export default PageNotFound
