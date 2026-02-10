import { useState, useEffect } from "react"

import { Card } from "react-bootstrap"

// bookIsSelected si deriva dall null o meno di selectedBook. semplificare logica

const SingleBook = (props) => {
  const selectedBookExists = props.selectedBook !== null
  const isThisBookSelected = selectedBookExists && props.book.asin === props.selectedBook.asin

  return (
    <Card style={{ width: "18rem", height: "500px" }} className={isThisBookSelected ? "selected-card" : ""} key={props.book.asin}>
      <Card.Img
        variant="top"
        src={props.book.img}
        onClick={() => {
          props.updateSelectedBook(props.book)
        }}
      />
      <Card.Body>
        <Card.Title>{props.book.title}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default SingleBook
