import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import products from '../products'
const Home = () => {
  return (
    <>
      <Container>
        <h1>latest products</h1>
        <Row>
          {products.map((product) => (
            <Col
              className='mb-3'
              sm={12}
              md={6}
              lg={4}
              xl={3}
              key={product._id}
            >
              <p>asbdu</p>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}

export default Home
