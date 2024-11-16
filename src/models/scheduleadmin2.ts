import { Schema, Document, model, models } from 'mongoose';

interface ICourse {
  course: string;
  professor: string;
  classroom: string;
  activity: string;
}

interface ITimeSlot {
  available: number;
  courses?: ICourse[];
}

interface ISchedule extends Document {
  lunes: ITimeSlot[];
  martes: ITimeSlot[];
  miercoles: ITimeSlot[];
  jueves: ITimeSlot[];
  viernes: ITimeSlot[];
}

const TimeSlotSchema = new Schema<ITimeSlot>({
  available: { type: Number, enum: [0, 1], default: 0 },
  courses: {
    type: [
      {
        course: { type: String, default: '', required: false },
        professor: { type: String, default: '', required: false },
        classroom: { type: String, default: '', required: false },
        activity: { type: String, default: '', required: false }
      }
    ],
    default: []
  }
});

const ScheduleSchema: Schema = new Schema({
  _id: { type: String, required: true },
  lunes: { type: [TimeSlotSchema], default: Array(14).fill({}) },
  martes: { type: [TimeSlotSchema], default: Array(14).fill({}) },
  miercoles: { type: [TimeSlotSchema], default: Array(14).fill({}) },
  jueves: { type: [TimeSlotSchema], default: Array(14).fill({}) },
  viernes: { type: [TimeSlotSchema], default: Array(14).fill({}) }
});

// Exportar el modelo con el nombre de la colección 'scheduleAdmin'
const Schedule = models.ScheduleAdmin2 || model<ISchedule>('ScheduleAdmin2', ScheduleSchema);
export default Schedule;
