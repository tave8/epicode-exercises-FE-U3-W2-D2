import { useState, useEffect } from "react"

import { Container, Col, Form, Row, Button, Spinner } from "react-bootstrap"
import { ArrowRight, Openai, Stars } from "react-bootstrap-icons"

const AIBookSummary = (props) => {
  return (
    <>
      <div>
        {/* book summary */}
        <p>{getBookSummaryComponent({ props })()}</p>

        {/* spinner */}
        {props.isLoading && (
          <div className="text-center mt-3">
            <Spinner variant="success" animation="grow" />
          </div>
        )}
      </div>
    </>
  )
}

const getBookSummaryComponent = (componentInfo) => {
  const { props } = componentInfo

  return () => {
    return (
      <>
        {/* AI symbol */}
        {!props.isLoading && <Stars />} {/* book summary */}
        {!props.isLoading && props.bookSummary}
      </>
    )
  }
}

export default AIBookSummary
