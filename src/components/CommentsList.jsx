import { Component } from "react"
import SingleComment from "./SingleComment"
import { Container, Col, Form, Row, Button, Spinner, Alert } from "react-bootstrap"

class CommentsList extends Component {
  render() {
    return (
      <>
        {/* spinner: loading */}
        {this.props.isLoading && (
          <div className="text-center mt-3">
            <Spinner variant="success" animation="border" />
          </div>
        )}

        {!this.props.isLoading && (
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
              {this.props.reviews.map((review) => {
                return (
                  <Col key={review._id}>
                    <SingleComment key={review._id} review={review} />
                  </Col>
                )
              })}

              {/* no reviews */}
              {this.props.reviews.length == 0 && this.props.isLoading == false && (
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
}

export default CommentsList
