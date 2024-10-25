// src/app/api/schedule/[id]/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/libs/mongodb';
import Schedule from '@/models/schedule';

// Obtener un horario por ID
export async function GET(request: Request, { params }: { params: { _id: string } }) {
  await connectDB();
  const { _id } = params;

  try {
    const schedule = await Schedule.findById(_id);
    if (!schedule) {
      return NextResponse.json({ message: 'Horario no encontrado' }, { status: 404 });
    }
    return NextResponse.json(schedule, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error al obtener el horario', error: error.message }, { status: 500 });
  }
}

// Actualizar un horario (añadir un día o modificar)
export async function PUT(request: Request) {
  try {
    await connectDB(); // Asegúrate de que tu conexión a la DB esté funcionando

    const { user, selectedSlots } = await request.json();

    // Verifica que los datos necesarios estén presentes
    if (!user || !selectedSlots) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }

    // Lógica para manejar los horarios
    let schedule = await Schedule.findOne({ user });

    if (!schedule) {
      schedule = new Schedule({ user, days: [] });
    }

    // Aquí debes manejar la actualización de los horarios
    selectedSlots.forEach(slot => {
      const { day, timeSlot } = slot;
      const dayIndex = schedule.days.findIndex(d => d.day === day);

      if (dayIndex === -1) {
        schedule.days.push({ day, timeSlots: [{ start: timeSlot.split(' a ')[0], end: timeSlot.split(' a ')[1] }] });
      } else {
        schedule.days[dayIndex].timeSlots.push({ start: timeSlot.split(' a ')[0], end: timeSlot.split(' a ')[1] });
      }
    });

    await schedule.save();
    return NextResponse.json({ message: 'Horarios guardados correctamente' }, { status: 200 });
  } catch (error) {
    console.error('Error al guardar horarios:', error); // Imprime el error en la consola del servidor
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}



// Eliminar un horario por ID
export async function DELETE(request: Request, { params }: { params: { _id: string } }) {
  await connectDB();
  const { _id } = params;

  try {
    const deletedSchedule = await Schedule.findByIdAndDelete(_id);
    if (!deletedSchedule) {
      return NextResponse.json({ message: 'Horario no encontrado' }, { status: 404 });
    }
    return NextResponse.json({}, { status: 204 }); // Sin contenido
  } catch (error) {
    return NextResponse.json({ message: 'Error al eliminar el horario', error: error.message }, { status: 500 });
  }
}
