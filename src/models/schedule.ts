import mongoose, { Schema, Document } from 'mongoose';

// Definir la interfaz para los intervalos de tiempo
interface ITimeSlot {
  start: string; // Hora de inicio, ejemplo: '07:00 AM'
  end: string;   // Hora de fin, ejemplo: '08:00 AM'
}

// Definir la interfaz para el esquema de horarios de usuario
interface ISchedule extends Document {
  userId: string; // Identificador del usuario
  lunes: ITimeSlot[];      // Múltiples intervalos para lunes
  martes: ITimeSlot[];     // Múltiples intervalos para martes
  miercoles: ITimeSlot[];  // Múltiples intervalos para miércoles
  jueves: ITimeSlot[];     // Múltiples intervalos para jueves
  viernes: ITimeSlot[];    // Múltiples intervalos para viernes
}

// Definir el esquema del horario en Mongoose
const ScheduleSchema: Schema = new Schema({
  userId: { type: String, required: true }, // ID del usuario es obligatorio
  lunes: { type: [{ start: String, end: String }], default: [] },    // Los intervalos de lunes son opcionales, con array vacío por defecto
  martes: { type: [{ start: String, end: String }], default: [] },   // Los intervalos de martes son opcionales
  miercoles: { type: [{ start: String, end: String }], default: [] },// Los intervalos de miércoles son opcionales
  jueves: { type: [{ start: String, end: String }], default: [] },   // Los intervalos de jueves son opcionales
  viernes: { type: [{ start: String, end: String }], default: [] }   // Los intervalos de viernes son opcionales
});

// Exportar el modelo
export default mongoose.models.Schedule || mongoose.model<ISchedule>('Schedule', ScheduleSchema);
