import { useState, useEffect } from "react"

import { Container, Col, Form, Row, Button, Spinner } from "react-bootstrap"

const SingleComment = (props) => {
  return (
    <>
      <Row className="border-bottom py-2">
        {/* review  */}
        <Col>
          {props.review.rate} | {props.review.comment}{" "}
        </Col>

        {/* actions */}
        <Col className="text-end">
          <Button variant="danger" className="fs-6" onClick={handleDeleteComment({ props })} size="sm">
            Delete
          </Button>
        </Col>
      </Row>
    </>
  )
}

const handleDeleteComment = (componentInfo) => {
  const { props } = componentInfo

  return async (event) => {
    console.log(event)
    // const commentId = this.props.review._id
    // const apiUrl = `https://striveschool-api.herokuapp.com/api/comments/${commentId}`
    // const reviewToDelete = {
    // }
    // const config = {
    //   method: "POST",
    //   body: JSON.stringify(reviewToDelete),
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization:
    //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTczMmNiMjg1ZTNiMTAwMTViNWVkNzgiLCJpYXQiOjE3NjkxNTU3NjMsImV4cCI6MTc3MDM2NTM2M30.BxSnAzs-jRVXg8PvTmmmQNOcI4pkhyHK6ADl2JGsKzk",
    //   },
    // }
    // fetch(apiUrl, config)
    //   .then((response) => {
    //     if (response.ok) {
    //       alert("Review successfully added")
    //       this.setState({
    //         formValues: initialReview,
    //       })
    //     } else {
    //       throw new Error("Error while adding review")
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("error while saving", err)
    //   })
  }
}

export default SingleComment
