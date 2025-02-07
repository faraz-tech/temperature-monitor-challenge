import express from 'express';
import http from 'http';
import { router as temperatureRoutes, emitTemperatureReadings } from './routes/temperature.js';
import setupSocket from './socket.js';
import dotenv from 'dotenv';
import connectDB from './db/connection.js';
import cors from 'cors';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = setupSocket(server);

app.use(cors());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.json());

connectDB();

app.use('/api/temperature', temperatureRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

emitTemperatureReadings(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});