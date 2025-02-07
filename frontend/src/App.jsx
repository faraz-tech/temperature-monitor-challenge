import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Badge, ListGroup, Card } from 'react-bootstrap'
import './assets/css/App.css'

function App() {

  const recentReadings = [
    { temperature: '22°C', status: 'NORMAL', time: '2 minutes ago' },
    { temperature: '23°C', status: 'NORMAL', time: '2 minutes ago' },
    { temperature: '24°C', status: 'NORMAL', time: '2 minutes ago' },
    { temperature: '25°C', status: 'HIGH', time: '2 minutes ago' },
    { temperature: '26°C', status: 'HIGH', time: '2 minutes ago' }
  ];

  const currentTemperature = {
    data: '22°C',
    status: 'NORMAL',
    time: '2 seconds ago'
  };

  return (
    <Container className="mt-5">
      <Card className="mb-5">
        <Card.Body className="position-relative">
          <Card.Title className="display-8">Temperature Monitor</Card.Title>
          <Row className="d-flex justify-content-between align-items-center">
            <Col className="text-center">
              <h6 className="fw-bold">Current Temperature</h6>
              <h2 className="fw-bold">{currentTemperature.data}</h2>
              <p>
                <span className="text-success fw-bold">{currentTemperature.status}</span> LAST UPDATED: {currentTemperature.time}
              </p>
            </Col>
          </Row>
          <div className="position-absolute top-0 end-0 m-3">
            <span className="dot bg-success"></span> Connected
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title className="fw-bold">Recent Readings</Card.Title>
          <hr/>
          <ListGroup>
            {recentReadings.map((reading, index) => (
              <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center mb-2 bg-light border">
                <div>
                  <h4 className="fw-bold">{reading.temperature}</h4>
                  <span>{reading.time}</span>
                </div>
                <Badge bg={reading.status === 'NORMAL' ? 'success' : 'warning'}>{reading.status}</Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default App
