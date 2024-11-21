import { Schema, model, models } from 'mongoose';

const esquemaClassroom = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  capacity: {
    type: Number,
    required: false,
    min: 1 
  },
  description: {
    type: String,
    required: false, 
    maxlength: 1000
  }
}, {
  timestamps: true, 
  collection: 'classrooms' 
});

const classroom = models.classroom || model('classroom', esquemaClassroom);

export default classroom;
