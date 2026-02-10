import { Container, Row, Col } from "react-bootstrap"
import Alert from "react-bootstrap/Alert"
 
function Welcome(props) {
  return (
    <Container style={{ marginTop: props.marginTop || 0 }}>
      <Row>
        <Col>
          <Alert variant="success" className="d-flex flex-column justify-content-center" style={{ minHeight: "200px" }}>
            <Alert.Heading className="text-center">Welcome to EpiBooks babe!</Alert.Heading>
            <p className="text-center">Here you will find the MOST BEST books in the world!</p>
          </Alert>
        </Col>
      </Row>
    </Container>
  )
}

export default Welcome
