import { useState, useEffect } from "react"
import SingleComment from "./SingleComment"
import { Container, Col, Form, Row, Button, Spinner, Alert } from "react-bootstrap"

const CommentsList = (props) => {
  return (
    <>
      {/* spinner: loading */}
      {props.isLoading && (
        <div className="text-center mt-3">
          <Spinner variant="success" animation="border" />
        </div>
      )}

      {!props.isLoading && (
        // {/* comments */}
        <Container style={{}} className="mt-2">
          {/* title */}
          <Row>
            <Col>
              <h3 className="text-center">Reviews</h3>
            </Col>
          </Row>

          {/* reviews */}
          <Row className="flex-column flex-nowrap" style={{ height: "200px", overflowY: "auto" }}>
            {props.reviews.map((review) => {
              return (
                <Col key={review._id}>
                  <SingleComment key={review._id} review={review} />
                </Col>
              )
            })}

            {/* no reviews */}
            {props.reviews.length == 0 && props.isLoading == false && (
              <Alert variant="info">
                <p>No reviews found.</p>
              </Alert>
            )}
          </Row>
        </Container>
      )}
    </>
  )
}

export default CommentsList
