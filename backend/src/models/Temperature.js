import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const temperatureSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4
  },
  temperature: {
    type: Number,
    required: true
  },
  status: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  processedAt: {
    type: Date
  }
});

const Temperature = mongoose.model('Temperature', temperatureSchema);

export default Temperature;