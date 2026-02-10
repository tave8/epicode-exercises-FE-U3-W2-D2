import { Component } from "react"
import { Card } from "react-bootstrap"

// bookIsSelected si deriva dall null o meno di selectedBook. semplificare logica

class SingleBook extends Component {
  render() {
    const selectedBookExists = this.props.selectedBook !== null
    const isThisBookSelected = (selectedBookExists) && (this.props.book.asin === this.props.selectedBook.asin)
    return (
      <Card style={{ width: "18rem", height: "500px" }} className={isThisBookSelected ? "selected-card" : ""} key={this.props.book.asin}>
        <Card.Img variant="top" src={this.props.book.img} onClick={() => {this.props.updateSelectedBook(this.props.book)}} />
        <Card.Body>
          <Card.Title>{this.props.book.title}</Card.Title>
        </Card.Body>
      </Card>
    )
  }
}

export default SingleBook
