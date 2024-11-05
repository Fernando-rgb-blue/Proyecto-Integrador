import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email requerido"]
  },

  password: {
    type: String,
    required: [true, "Contraseña requerida"]
  },

  fullname: {
    type: String,
    required: [true, "Nombre requerido"],
    minlength: [3, "mínimo 3 caracteres"],
    maxlength: [100, "máximo 100 caracteres"]
  },

  role: {
    type: String,
    enum: ['profesor', 'admin'],
    default: 'profesor'
  },

  image: {
    type: String,
    default: ""
  },

  office: {
    type: String,
    default: ""
  },

  areas: {
    type: String,
    default: "" 
  }
});

const User = models.User || model('User', userSchema);
export default User;
