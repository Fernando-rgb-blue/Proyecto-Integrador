import { Schema, Document, model, models } from 'mongoose';

// Definir la interfaz para el esquema de horarios de usuario
interface ISchedule extends Document {
  userId: string;           // Identificador del usuario
  lunes: number[];          // Array de 0 o 1 para cada hora en lunes
  martes: number[];         // Array de 0 o 1 para cada hora en martes
  miercoles: number[];      // Array de 0 o 1 para cada hora en miércoles
  jueves: number[];         // Array de 0 o 1 para cada hora en jueves
  viernes: number[];        // Array de 0 o 1 para cada hora en viernes
}

// Definir el esquema del horario en Mongoose
const ScheduleSchema: Schema = new Schema({
  userId: { type: String, required: true },       // ID del usuario es obligatorio
  lunes: { type: [Number], default: Array(15).fill(0) },       // 14 slots para horas (de 07:00 AM a 08:00 PM)
  martes: { type: [Number], default: Array(15).fill(0) },      // Array de 14 booleanos para martes
  miercoles: { type: [Number], default: Array(15).fill(0) },   // Array de 14 booleanos para miércoles
  jueves: { type: [Number], default: Array(15).fill(0) },      // Array de 14 booleanos para jueves
  viernes: { type: [Number], default: Array(15).fill(0) }      // Array de 14 booleanos para viernes
});

// Exportar el modelo
const Schedule = models.Schedule || model<ISchedule>('Schedule', ScheduleSchema);
export default Schedule;
