import { Document, model, Model, models, Schema } from "mongoose";

interface ICourse extends Document {
    nombre: string;
    ciclo: string;
    profesores: string[];
}

const courseSchema = new Schema<ICourse>({
    nombre: {
        type: String,
    },
    ciclo: {
        type: String,
    },
    profesores: {
        type: [String]
    }
}, { timestamps: true });

const Course: Model<ICourse> = models.Course || model<ICourse>('Course', courseSchema);
export default Course;
