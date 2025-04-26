import { Document, Model, Schema, model, models } from 'mongoose';

interface ICicloperiodo extends Document {
  ciclo: string;
  seccion: string;
  anio: number;
  periodo: string;
}

const esquemaCicloPeriodo = new Schema<ICicloperiodo>({
  ciclo: {
    type: String, 
    required: true,
    enum: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
  },
  seccion: {
    type: String,
    required: true,
    enum: ['A', 'B', 'C']
  },
  anio: {
    type: Number,
    required: true
  },
  periodo: {
    type: String,
    required: true,
    enum: ['I', 'II']  // "I" para ciclos impares y "II" para ciclos pares
  }
}, {
  timestamps: true,
  collection: 'cicloperiodo'  // Nombre personalizado de la colección en la base de datos
});

const cicloperiodo: Model<ICicloperiodo> = models.cicloperiodo || model<ICicloperiodo>('cicloperiodo', esquemaCicloPeriodo);

export default cicloperiodo;
