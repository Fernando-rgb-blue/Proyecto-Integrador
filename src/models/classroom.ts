import { Document, Model, Schema, model, models } from 'mongoose';

interface IClassroom extends Document {
  name: string;
  capacity: number;
  description: string;
}

const esquemaClassroom = new Schema<IClassroom>({
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

const classroom: Model<IClassroom> = models.classroom || model<IClassroom>('classroom', esquemaClassroom);

export default classroom;
