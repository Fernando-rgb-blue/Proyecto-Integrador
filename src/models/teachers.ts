import { Document, model, Model, models, Schema } from "mongoose";

interface ITeacher extends Document {
    image: string;
    name: string;
    email: string;
    office: string;
    areas: string;
}

const teacherSchema = new Schema<ITeacher>({
    image: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    office: {
        type: String,
        required: true
    },
    areas: {
        type: String,
        required: true
    },
}, {timestamps: true});

const Teacher: Model<ITeacher> = models.Teacher || model<ITeacher>('Teacher', teacherSchema);
export default Teacher;