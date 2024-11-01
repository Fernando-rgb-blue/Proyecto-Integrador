import { Document, model, Model, models, Schema } from "mongoose";

interface ICourse extends Document {
    name: string;
    cycle: string;
}

const courseSchema = new Schema<ICourse>({
    name: {
        type: String,
        required: true
    },
    cycle: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Course: Model<ICourse> = models.Course || model<ICourse>('Course', courseSchema);
export default Course;
