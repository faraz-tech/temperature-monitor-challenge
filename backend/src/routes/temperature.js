import express from 'express';
import Temperature from '../models/Temperature.js';
import { generateRandomTemperature } from '../lib/utils.js';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const emitTemperatureReadings = (io) => {
    setInterval(async () => {
      const temperature = generateRandomTemperature();
      const id = uuidv4();
      const timestamp = new Date().toISOString();
      try {
        const response = await axios.post(process.env.N8N_WEBHOOK_URL, {
            id: id, 
            temperature: parseFloat(temperature), 
            timestamp: timestamp
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const { success, reading } = response.data;

        if (success) {
          const newReading = new Temperature({
              id: reading.id,
              temperature,
              status: reading.status
          });

          await newReading.save();

          io.emit('new-reading', newReading);

        } else {
            console.error('n8n Webhook Response: Failed to process');
        }
      } catch (error) {
        console.error('Error sending temperature to n8n webhook:', error.message);
      }
    }, 5000);
};

router.get('/latest', async (req, res) => {
  try {
    const readings = await Temperature.find().sort({ processedAt: -1 }).limit(5);
    res.status(200).json(readings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { router, emitTemperatureReadings };