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
    type: String,
    required: true
  },
  processedAt: {
    type: Date,
    default: Date.now
  }
});

const Temperature = mongoose.model('Temperature', temperatureSchema);

export default Temperature;