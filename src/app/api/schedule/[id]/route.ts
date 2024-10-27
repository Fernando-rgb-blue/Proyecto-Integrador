// api/schedule/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Schedule from '@/models/schedule';
import { connectDB } from '@/libs/mongodb';


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const { id } = params;

  try {
    const schedule = await Schedule.findById(id);
    if (!schedule) {
      return NextResponse.json({ error: 'Horario no encontrado' }, { status: 404 });
    }
    return NextResponse.json(schedule);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener el horario' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const { id } = params;
  const updates = await req.json();

  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedSchedule) {
      return NextResponse.json({ error: 'Horario no encontrado' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Horario actualizado con éxito', schedule: updatedSchedule });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar el horario' }, { status: 500 });
  }
}
