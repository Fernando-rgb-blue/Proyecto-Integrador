import { Schema, models, model, Document, Model } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  fullname: string;
  role: string;
  status: string;
  image: string;
  office: string;
  areas: string;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: [true, "Email requerido"]
  },

  password: {
    type: String,
    default: "informatica2025",
    required: false
  },

  fullname: {
    type: String,
    required: [true, "Nombre requerido"],
    minlength: [3, "mínimo 3 caracteres"],
    maxlength: [100, "máximo 100 caracteres"]
  },

  role: {
    type: String,
    enum: ['profeC', 'profeN', 'admin', 'directorE', 'directorD'],
    default: 'profesor'
  },

  status: {
    type: String,
    enum: ['activo', 'inactivo'],
    default: 'activo',
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
}, {timestamps: true});

const User: Model<IUser> = models.User || model<IUser>('User', userSchema);

export default User;
