import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const CreatePool = () => {
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <Container>
        <Row>
          <Col>
            <h2 className="font-poppins dark:text-white text-center text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
              Create Pool
            </h2>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default CreatePool
