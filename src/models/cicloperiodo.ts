import { Schema, model, models } from 'mongoose';

const esquemaCicloPeriodo = new Schema({
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

const cicloperiodo = models.cicloperiodo || model('cicloperiodo', esquemaCicloPeriodo);

export default cicloperiodo;
