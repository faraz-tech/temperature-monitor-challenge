# Temperature Monitoring System

A comprehensive system for monitoring and managing temperature data with a full-stack implementation including frontend visualization, backend API, and n8n workflow automation.

## 🚀 Features

- Real-time temperature monitoring
- Data visualization dashboard
- MongoDB database for data storage
- n8n workflow automation
- RESTful API backend
- Responsive frontend interface

## 🛠️ Tech Stack

- **Frontend**: React/Vite (18+)
- **Backend**: Node.js, Express, SocketIO
- **Database**: MongoDB
- **Automation**: n8n
- **Containerization**: Docker

## 📋 Prerequisites

Before you begin, ensure you have installed:
- Docker
- Docker Compose
- Node.js (18+)
- npm

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/faraz-tech/temperature-monitor-challenge.git
   cd temperature-monitor-challenge
   ```

2. **Environment Setup**  
    Create .env files in both frontend and backend directories:  
    Backend (.env)
    ```bash
    MONGO_URI=mongodb://mongo:27017/temperature
    N8N_WEBHOOK_URL=http://n8n:5678/webhook/94342cd3-90d0-4ce1-b640-e40c7f65c9f0
    ```

    Frontend (.env):
    ```bash
    VITE_API_URL=http://localhost:5000
    ```

3. **Start the Application**    
    ```bash
    docker-compose up --build
    ```

## 📋 API Documentation

### Backend API Endpoints

#### GET /api/health  
Description: Health check endpoint.  
Response:  

    {
        "status": "ok",
        "timestamp": "string"
    }

### GET /api/temperature/latest  
Description: Fetch the latest temperature readings.  
Response:  

    [
        {
            "id": "string",
            "temperature": "number",
            "status": "string",
            "processedAt": "string"
        }
    ]

## Architecture Overview


## Processing Approach Options

### Preferred Approach: n8n Workflow Integration

#### Overview
The preferred approach for temperature processing is utilizing **n8n Workflow Integration**. This method demonstrates the ability to work with workflow automation tools and showcases an understanding of service integration.

#### Workflow Implementation using n8n

1. **Setup n8n Locally**  
   To begin, I set up a local environment for **n8n** using a Docker image. This allows for quick access to n8n on my local machine for testing and development.

   ```bash
   docker run --rm -d -p 5678:5678 n8nio/n8n
   ```

   After setting up and running the Docker container, I accessed the n8n interface by navigating to http://localhost:5678.

2. **Sign Up and Login**  
Upon accessing n8n for the first time, I signed up and logged in to my n8n account to start building workflows.

3. **Create New Workflow**  
After logging in, I created a new workflow by selecting the Create New Workflow button in the n8n dashboard.

4. **Webhook Setup**  
In the new workflow, I used the Webhook option to accept requests from the backend server. This allows for the temperature data to be received and processed within the workflow.

5. **Processing Temperature Data with Conditional Logic**  
After receiving the request, I used If/Else condition cards to evaluate the temperature. The workflow checks if the temperature is greater than 25°C.

- If the temperature is greater than 25°C, the workflow will respond with a "High Temperature" response.
- If the temperature is 25°C or lower, the workflow will respond with a "Low Temperature" response.

6. **Event Handling for Responses**  
Based on the conditions, I used the Events option to set up two distinct webhook responses:

- One for a "high temperature" response
- One for a "low temperature" response  
These events allow the system to send the appropriate response body based on the evaluated condition.





## 🌐 Services & Ports  
    Frontend: http://localhost:3000
    Backend API: http://localhost:5000
    MongoDB: localhost:27017
    n8n: http://localhost:5678

## 🛠️ Development

### Docker Development  
Build and run all services
```bash
docker-compose up --build
```
