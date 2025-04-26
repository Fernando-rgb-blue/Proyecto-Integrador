import { Document, Model, Schema, model, models } from 'mongoose';

interface IScheduleprueba extends Document {
  ciclo: string;
  seccion: string;
}

const esquemaHorarioPrueba = new Schema<IScheduleprueba>({
  ciclo: {
    type: String, 
    required: true,
    enum: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
  },
  seccion: {
    type: String,
    required: true,
    enum: ['A', 'B', 'C']
  }
}, {
  timestamps: true 
});
const scheduleprueba: Model<IScheduleprueba> = models.scheduleprueba || model<IScheduleprueba>('scheduleprueba', esquemaHorarioPrueba);

export default scheduleprueba;
