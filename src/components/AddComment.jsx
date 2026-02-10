import { useState, useEffect } from "react"
import { Container, Col, Form, Row, Button } from "react-bootstrap"

const initialReview = {
  rate: "5",
  comment: "",
}

const AddComment = (props) => {
  const [formValues, setFormValues] = useState(initialReview)

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h3 className="text-center">Write your review</h3>
          </Col>
        </Row>

        {/* best practice: row -> col */}
        <Form onSubmit={onFormSubmit({ props, formValues, setFormValues })}>
          <Row className="flex-column g-3">
            {/* review rate */}
            <Col>
              {/* review rate */}
              <Form.Group>
                <Form.Label>Choose rate</Form.Label>
                <Form.Select onChange={onRateChange({ formValues, setFormValues })} value={formValues.rate}>
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* review comment */}
            <Col>
              {/* review text */}
              <Form.Group>
                <Form.Label>Review</Form.Label>
                <Form.Control
                  as="textarea"
                  onChange={onCommentChange({ formValues, setFormValues })}
                  value={formValues.comment}
                  placeholder={`How did you find ${props.book.title}?`}
                  style={{ minHeight: "200px" }}
                />
              </Form.Group>
            </Col>

            {/* submit button */}
            <Col className="text-center">
              {/* submit review button */}
              <Button type="submit">Submit</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  )
}

const onCommentChange = (componentInfo) => {
  const { formValues, setFormValues } = componentInfo
  return (event) => {
    const newComment = event.target.value
    setFormValues({ ...formValues, comment: newComment })
  }
}

const onRateChange = (componentInfo) => {
  const { formValues, setFormValues } = componentInfo
  return (event) => {
    const newRate = event.target.value
    setFormValues({ ...formValues, rate: newRate })
  }
}

const onFormSubmit = (componentInfo) => {
  const { props, formValues, setFormValues } = componentInfo

  return (event) => {
    event.preventDefault()

    if (formValues.comment.trim() == "") {
      alert("Review cannot be empty")
      return
    }

    // the asin of the current book
    const bookAsin = props.book.asin

    const reviewToAdd = { ...formValues, elementId: bookAsin }

    const apiUrl = `https://striveschool-api.herokuapp.com/api/comments`

    const config = {
      method: "POST",
      body: JSON.stringify(reviewToAdd),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTg5ZTdlMzI4NzNjYjAwMTUwZjAyODMiLCJpYXQiOjE3NzA2NDU2MTEsImV4cCI6MTc3MTg1NTIxMX0.dxBrJ7LafrnYCgkejqiljle-4vTlI8xnM3Kmxn5z0I8",
      },
    }

    fetch(apiUrl, config)
      .then((response) => {
        if (response.ok) {
          alert("Review successfully added")
          setFormValues(initialReview)
          props.getReviews(bookAsin)
        } else {
          throw new Error("Error while adding review")
        }
      })
      .catch((err) => {
        console.log("error while saving", err)
      })
  }
}

export default AddComment
