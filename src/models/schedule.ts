import { Schema, models, model, Document, Model, Types } from 'mongoose';

interface ISchedule extends Document {
    day: string;
    hours: string;
    user: Types.ObjectId;
}

const scheduleSchema = new Schema<ISchedule>({
    day: {
        type: String,
        required: true,
    },
    hours: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

const Schedule: Model<ISchedule> = models.Schedule || model<ISchedule>('Schedule', scheduleSchema);
export default Schedule;
