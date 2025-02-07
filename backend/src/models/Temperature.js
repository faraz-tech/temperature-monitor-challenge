import mongoose from 'mongoose';

const temperatureSchema = new mongoose.Schema({
  temperature: {
    type: String,
    required: true
  },
  status: {
    type: String
  },
  time: {
    type: Date,
    default: Date.now
  }
});

const Temperature = mongoose.model('Temperature', temperatureSchema);

export default Temperature;