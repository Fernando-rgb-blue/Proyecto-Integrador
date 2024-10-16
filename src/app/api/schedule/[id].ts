// src/pages/api/schedules/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react'; // Importa getSession
import {connectDB} from '../../../libs/mongodb';
import Schedule from '../../../models/schedule';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    const session = await getSession({ req }); // Obtén la sesión del usuario

    // Verifica si hay una sesión
    if (!session) {
        return res.status(401).json({ message: 'No autorizado' });
    }

    const { id } = req.query;

    if (req.method === 'GET') {
        const schedule = await Schedule.findById(id).populate('user');
        if (!schedule || schedule.user.toString() !== session.user.id) {
            return res.status(404).json({ message: 'Tarea no encontrada o no autorizado' });
        }
        res.status(200).json(schedule);
    } else if (req.method === 'PUT') {
        const updatedSchedule = await Schedule.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedSchedule || updatedSchedule.user.toString() !== session.user.id) {
            return res.status(404).json({ message: 'Tarea no encontrada o no autorizado' });
        }
        res.status(200).json(updatedSchedule);
    } else if (req.method === 'DELETE') {
        const deletedSchedule = await Schedule.findByIdAndDelete(id);
        if (!deletedSchedule || deletedSchedule.user.toString() !== session.user.id) {
            return res.status(404).json({ message: 'Tarea no encontrada o no autorizado' });
        }
        res.status(204).end();
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
