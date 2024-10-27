
import { NextRequest, NextResponse } from 'next/server';
import Schedule from '@/models/schedule';
import { connectDB } from '@/libs/mongodb';


export async function POST(req: NextRequest) {
  await connectDB();

  const { userId, lunes, martes, miercoles, jueves, viernes } = await req.json();

  try {
    const newSchedule = new Schedule({
      _id: userId,
      userId,
      lunes: lunes || Array(14).fill(0),
      martes: martes || Array(14).fill(0),
      miercoles: miercoles || Array(14).fill(0),
      jueves: jueves || Array(14).fill(0),
      viernes: viernes || Array(14).fill(0),
    });

    await newSchedule.save();
    return NextResponse.json({ message: 'Horario creado con éxito', schedule: newSchedule });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear el horario' }, { status: 500 });
  }
}

// GET: Obtener todos los horarios
export async function GET() {
  await connectDB();

  try {
    const schedules = await Schedule.find();
    return NextResponse.json(schedules);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener los horarios' }, { status: 500 });
  }
}
