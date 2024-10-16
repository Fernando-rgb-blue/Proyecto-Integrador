// src/pages/api/schedules/index.ts
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

    if (req.method === 'GET') {
        const schedules = await Schedule.find({ user: session.user.id }).populate('user');
        res.status(200).json(schedules);
    } else if (req.method === 'POST') {
        const { day, hours } = req.body;
        const newSchedule = new Schedule({
            day,
            hours,
            user: session.user.id // Usa session.user.id
        });
        const savedSchedule = await newSchedule.save();
        res.status(201).json(savedSchedule);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
