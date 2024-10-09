import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from "@/libs/mongodb";
import Schedule from '@/models/schedule';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await connectDB(); // Conectar a la base de datos

    const { method, query: { id } } = req;

    switch (method) {

        case 'GET':
            try {
                const schedules = await Schedule.find({ user: req.user.id }).populate('user');
                res.status(200).json(schedules);
            } catch (error) {
                res.status(400).json({ message: 'Error al obtener los horarios' });
            }
            break;

        case 'POST':

            try {
                const { day, hours} = req.body;
                const newSchedule = new Schedule({
                    day,
                    hours,
                    user: req.user.id,
                });
                const savedSchedule = await newSchedule.save();
                res.status(201).json(savedSchedule);
            } catch (error) {
                res.status(400).json({ message: 'Error al crear el horario' });
            }

            break;

	case 'PUT':

            try {
                const schedule = await Schedule.findByIdAndUpdate(id, req.body, { new: true });
                if (!schedule) return res.status(404).json({ message: 'Horario no encontrado' });
                res.status(200).json(schedule);
            } catch (error) {
                res.status(400).json({ message: 'Error al actualizar el horario' });
            }
            break;

        case 'DELETE':

            try {
                const schedule = await Schedule.findByIdAndDelete(id);
                if (!schedule) return res.status(404).json({ message: 'Horario no encontrado' });
                res.status(204).end();
            } catch (error) {
                res.status(400).json({ message: 'Error al eliminar el horario' });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT','POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);

    }
}
