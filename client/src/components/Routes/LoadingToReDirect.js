import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
const LoadingToReDirect = () => {
  const [count, setCount] = useState(5)

  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount)
    }, 1000)

    count === 0 && navigate('/')
    return () => clearInterval(interval)
  }, [count, navigate])
  return (
    <Container className='p-5 text-center'>
      <p>Redirecting You in {count} seconds</p>
    </Container>
  )
}

export default LoadingToReDirect
