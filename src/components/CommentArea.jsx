import { Component } from "react"
import CommentsList from "./CommentsList"
import AddComment from "./AddComment"
import AIBookSummary from "./AIBookSummary"

import OpenAI from "../classes/OpenAI"

import { Container, Row, Col, Form, Alert } from "react-bootstrap"

class CommentArea extends Component {
  state = {
    reviews: [],
    bookSummary: "",
    isLoading: true,
    isLoadingSummary: true,
  }

  getReviews = (bookAsin) => {
    this.setState({
      isLoading: true,
    })

    const url = `https://striveschool-api.herokuapp.com/api/comments/${bookAsin}`
    const config = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTg5ZTdlMzI4NzNjYjAwMTUwZjAyODMiLCJpYXQiOjE3NzA2NDU2MTEsImV4cCI6MTc3MTg1NTIxMX0.dxBrJ7LafrnYCgkejqiljle-4vTlI8xnM3Kmxn5z0I8",
      },
    }

    fetch(url, config)
      .then((resp) => {
        if (resp.ok) {
          return resp.json()
        } else {
          throw Error("error while fetching reviews")
        }
      })
      .then((data) => {
        const reviews = data
        this.setState({
          reviews,
          isLoading: false,
        })
      })
      .catch((err) => {
        console.error(err)
        this.setState({
          isLoading: false,
        })
      })
  }

  getBookSummaryFromTitle = async (bookTitle) => {
    // console.log(bookTitle)
    const prompt =
      `I give you the title of a book.` +
      `Your task is to summarize this book.` +
      `Max 100 characters. Be concise and neutral.` +
      `Title:` +
      `"""` +
      `${bookTitle}` +
      `"""`
    try {
      this.setState({ isLoadingSummary: true })

      const openai = new OpenAI({ simplify: true })
      const data = await openai.ask(prompt)
      const aiSummary = data.message

      this.setState({
        bookSummary: aiSummary,
      })

      this.setState({ isLoadingSummary: false })
    } catch (err) {
      console.error(err)
      this.setState({ isLoadingSummary: false })
    }
  }

  componentDidMount() {
    // this.getReviews(this.props.book.asin)
  }

  componentDidUpdate(prevProps, prevState) {
    const prevSelectedBook = prevProps.selectedBook
    const currSelectedBook = this.props.selectedBook
    let selectedBookWasChanged = false

    // before null, after book
    if (prevSelectedBook === null) {
      selectedBookWasChanged = currSelectedBook !== null
    }
    // before book, after another book
    else {
      selectedBookWasChanged = prevSelectedBook.asin !== currSelectedBook.asin
    }

    if (selectedBookWasChanged) {
      // this.updateSelectedBook()
      console.log("selected book was changed")
      // console.log(prevProps, this.props)
      this.getReviews(this.props.selectedBook.asin)
      this.getBookSummaryFromTitle(this.props.selectedBook.title)
    }
  }

  render() {
    return (
      <>
        {/* no book selected */}
        {!this.props.bookIsSelected && (
          <Alert variant="info">
            <p>No book selected yet</p>
          </Alert>
        )}

        {/* book selected */}
        {this.props.bookIsSelected && (
          <>
            <h2>{this.props.selectedBook.title}</h2>

            {/* AI summary */}
            <AIBookSummary isLoading={this.state.isLoadingSummary} bookSummary={this.state.bookSummary} />

            {/* leave your review */}
            <AddComment book={this.props.selectedBook} getReviews={this.getReviews} />

            {/* reviews for this book */}
            <CommentsList book={this.props.selectedBook} reviews={this.state.reviews} isLoading={this.state.isLoading} />
          </>
        )}
      </>
    )
  }
}

export default CommentArea
