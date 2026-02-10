import { useState, useEffect } from "react"
import { Container, Row, Col, Form } from "react-bootstrap"
import SingleBook from "./SingleBook"

const BookList = (props) => {
  const [userSearch, setUserSearch] = useState("")

  // ad ogni cambiamento di stato e props, il metodo render del componente viene eseguito
  return (
    <Container style={{ marginTop: props.marginTop || 0 }}>
      {/* search */}
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="search"
                // freccina sotto -> collego il valore dello stato al valore dell'input
                value={userSearch}
                onChange={(event) => {
                  setUserSearch(event.target.value)
                }}
                placeholder="Search here..."
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>

      {/* books */}
      <Row className="row-cols-1 row-cols-lg-2 g-3">{searchBooks({userSearch, props})}</Row>
    </Container>
  )
}

const searchBooks = (componentInfo) => {
  const { userSearch, props } = componentInfo

  const userSearchLowercase = userSearch.toLowerCase()
  
  // the books that the match the search pattern
  const filteredBooks = props.books.filter((book) => {
    const bookTitle = book.title.toLowerCase()
    const isBookSearched = bookTitle.includes(userSearchLowercase)
    return isBookSearched
  })

  return filteredBooks.map((book) => {
    return (
      <Col key={book.asin} className="d-flex justify-content-center">
        <SingleBook book={book} selectedBook={props.selectedBook} updateSelectedBook={props.updateSelectedBook} />
      </Col>
    )
  })
}

export default BookList
