import { Schema, Document, model, models } from 'mongoose';

// Definir la interfaz para el esquema de horarios
interface ITimeSlot {
  available: number; // 0 para no disponible, 1 para disponible
  course?: string;   // Curso asociado
  professor?: string; // Profesor asignado
  classroom?: string; // Aula asignada
  activity?: string;  // Actividad asociada
}

interface ISchedule extends Document {
  lunes: ITimeSlot[];       // Array de objetos para cada hora en lunes
  martes: ITimeSlot[];      // Array de objetos para cada hora en martes
  miercoles: ITimeSlot[];   // Array de objetos para cada hora en miércoles
  jueves: ITimeSlot[];      // Array de objetos para cada hora en jueves
  viernes: ITimeSlot[];     // Array de objetos para cada hora en viernes
}

// Definir el esquema para los slots de tiempo
const TimeSlotSchema = new Schema<ITimeSlot>({
  available: { type: Number, enum: [0, 1], default: 0 }, // 0 o 1
  course: { type: String, default: '' },                   // Curso
  professor: { type: String, default: '' },                // Profesor
  classroom: { type: String, default: '' },                // Aula
  activity: { type: String, default: '' }                  // Actividad
});

// Definir el esquema de Schedule
const ScheduleSchema: Schema = new Schema({
  _id: { type: String, required: true },  // Definir el _id como un campo obligatorio
  lunes: { type: [TimeSlotSchema], default: Array(14).fill({}) },       // 14 slots para horas en lunes
  martes: { type: [TimeSlotSchema], default: Array(14).fill({}) },      // Array para martes
  miercoles: { type: [TimeSlotSchema], default: Array(14).fill({}) },   // Array para miércoles
  jueves: { type: [TimeSlotSchema], default: Array(14).fill({}) },      // Array para jueves
  viernes: { type: [TimeSlotSchema], default: Array(14).fill({}) }      // Array para viernes
});

// Exportar el modelo con el nombre de la colección 'scheduleAdmin'
const Schedule = models.ScheduleAdmin || model<ISchedule>('ScheduleAdmin', ScheduleSchema);
export default Schedule;


