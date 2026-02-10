import { useState, useEffect } from "react"
import CommentsList from "./CommentsList"
import AddComment from "./AddComment"
import AIBookSummary from "./AIBookSummary"

import OpenAI from "../classes/OpenAI"

import { Container, Row, Col, Form, Alert } from "react-bootstrap"

const CommentArea = (props) => {

  const [reviews, setReviews] = useState([])
  const [bookSummary, setBookSummary] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingSummary, setIsLoadingSummary] = useState(true)

  useEffect(() => {
    // make sure the book exists
    if (props.selectedBook) {
      getReviews({ setIsLoading, setReviews })(props.selectedBook.asin)
      getBookSummaryFromTitle({ setIsLoadingSummary, setBookSummary })(props.selectedBook.title)
    }
  }, [props.selectedBook])


  return (
    <>
      {/* no book selected */}
      {!props.bookIsSelected && (
        <Alert variant="info">
          <p>No book selected yet</p>
        </Alert>
      )}

      {/* book selected */}
      {props.bookIsSelected && (
        <>
          <h2>{props.selectedBook.title}</h2>

          {/* AI summary */}
          <AIBookSummary isLoading={isLoadingSummary} bookSummary={bookSummary} />

          {/* leave your review */}
          <AddComment book={props.selectedBook} getReviews={getReviews({ props, setIsLoading, setReviews })} />

          {/* reviews for this book */}
          <CommentsList book={props.selectedBook} reviews={reviews} isLoading={isLoading} />
        </>
      )}
    </>
  )
}

const getReviews = (componentInfo) => {
  const { setIsLoading, setReviews } = componentInfo

  return (bookAsin) => {
    setIsLoading(true)

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
        setReviews(reviews)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setIsLoading(false)
      })
  }
}

const getBookSummaryFromTitle = (componentInfo) => {
  const { setIsLoadingSummary, setBookSummary } = componentInfo

  return async (bookTitle) => {
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
      setIsLoadingSummary(true)

      const openai = new OpenAI({ simplify: true })
      const data = await openai.ask(prompt)
      const aiSummary = data.message

      setBookSummary(aiSummary)
      setIsLoadingSummary(false)
    } catch (err) {
      console.error(err)
      setIsLoadingSummary(false)
    }
  }
}

export default CommentArea
