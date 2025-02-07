import express from 'express';
import Temperature from '../models/Temperature.js';
import { generateRandomTemperature } from '../lib/utils.js';

const router = express.Router();

const emitTemperatureReadings = (io) => {
    setInterval(async () => {
      const temperature = generateRandomTemperature();
      const status = parseFloat(temperature) > 25 ? 'High' : 'Normal';
      const newReading = new Temperature({ temperature, status });
      await newReading.save();
  
      io.emit('new-reading', newReading);
    }, 5000);
};

router.get('/latest', async (req, res) => {
  try {
    const readings = await Temperature.find().sort({ time: -1 }).limit(5);
    res.status(200).json(readings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { router, emitTemperatureReadings };