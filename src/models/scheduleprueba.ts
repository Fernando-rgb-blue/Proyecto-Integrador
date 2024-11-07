import { Schema, model, models } from 'mongoose';

const esquemaHorarioPrueba = new Schema({
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
const scheduleprueba = models.scheduleprueba || model('scheduleprueba', esquemaHorarioPrueba);

export default scheduleprueba;
