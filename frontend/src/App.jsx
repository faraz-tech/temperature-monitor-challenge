import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Badge, ListGroup, Card } from 'react-bootstrap'
import './assets/css/App.css'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL;
const socket = io(API_URL);

function App() {

  const [currentTemperature, setCurrentTemperature] = useState({
    data: 'Loading...',
    status: 'Loading...',
    processedAt: 'Loading...'
  })
  const [recentReadings, setRecentReadings] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {

    const fetchRecentReadings = async () => {
      try {
        const response = await fetch(`${API_URL}/api/temperature/latest`)
        const data = await response.json()
        setRecentReadings(data)
        if (data.length > 0) {
          const latestReading = data[0]
          setCurrentTemperature({
            data: latestReading.temperature,
            status: latestReading.status,
            processedAt: timeAgo(new Date(latestReading.processedAt))
          })
        }
      } catch (error) {
        console.error('Error fetching recent readings:', error.message)
      }
    }

    fetchRecentReadings()

    const intervalId = setInterval(fetchRecentReadings, 2000);

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('new-reading', (newReading) => {
      setCurrentTemperature({
        data: newReading.temperature,
        status: newReading.status,
        processedAt: timeAgo(new Date(newReading.processedAt))
      });
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      clearInterval(intervalId);
    }

  }, [])

  const timeAgo = (date) => {
    const now = new Date()
    const seconds = Math.floor((now - date) / 1000)
    if (seconds < 60) return `${seconds} seconds ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} minutes ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} hours ago`
    const days = Math.floor(hours / 24)
    return `${days} days ago`
  }

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
                <span className="text-success fw-bold">{currentTemperature.status}</span> LAST UPDATED: {currentTemperature.processedAt}
              </p>
            </Col>
          </Row>
          <div className="position-absolute top-0 end-0 m-3">
            <span className={`dot ${isConnected ? 'bg-success' : 'bg-warning'}`}></span> Connected
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
                  <span>{reading.processedAt}</span>
                </div>
                <Badge bg={reading.status.toLowerCase() === 'normal' ? 'success' : 'warning'}>{reading.status}</Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default App
