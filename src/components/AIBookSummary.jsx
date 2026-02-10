import { Component } from "react"
import { Container, Col, Form, Row, Button, Spinner } from "react-bootstrap"
import { ArrowRight, Openai, Stars } from 'react-bootstrap-icons'

class AIBookSummary extends Component {

  getBookSummaryComponent() {
    return (
      <>
        {/* AI symbol */}
        {!this.props.isLoading && <Stars/>}{" "}
        {/* book summary */}
        {!this.props.isLoading && this.props.bookSummary}
      </>
    ) 
  } 

  render() {
    return (
      <>
        <div>
          {/* book summary */}
          <p>{this.getBookSummaryComponent()}</p>

          {/* spinner */}
          {this.props.isLoading && (
            <div className="text-center mt-3">
              <Spinner variant="success" animation="grow" />
            </div>
          )}
        </div>
      </>
    )
  }
}

export default AIBookSummary
