import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email requerido"]
  },

  password: {
    type: String,
    required: [true, "Contraseña requerido"]
  },

  fullname: {
    type: String,
    unique: false,
    required: [true, "Nombre requerido"],
    minlength: [3, "mínimo 3 caracteres"], // Corregido aquí
    maxlength: [20, "máximo 20 caracteres"] // Corregido aquí
  },
});

const User = models.User || model('User', userSchema);
export default User;
