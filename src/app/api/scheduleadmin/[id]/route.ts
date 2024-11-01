import { NextResponse } from "next/server";
import Schedule from "@/models/scheduleadmin";
import { connectDB } from "@/libs/mongodb";

// Función para manejar las solicitudes GET, DELETE y PUT
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await connectDB();

    const schedule = await Schedule.findById(id);
    if (!schedule) {
      return NextResponse.json({ message: "Horario no encontrado" }, { status: 404 });
    }

    return NextResponse.json(schedule);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Error al obtener el horario' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await connectDB();

    const deletedSchedule = await Schedule.findByIdAndDelete(id);
    if (!deletedSchedule) {
      return NextResponse.json({ message: "Horario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ message: "Horario eliminado exitosamente" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Error al eliminar el horario' },
      { status: 400 }
    );
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { year, cycle, slots } = await request.json();

  try {
    await connectDB();

    const updatedSchedule = await Schedule.findByIdAndUpdate(
      id,
      {
        year,         // Año
        cycle,        // Ciclo
        slots: {      // Slots por día
          lunes: slots.lunes,
          martes: slots.martes,
          miércoles: slots.miercoles,
          jueves: slots.jueves,
          viernes: slots.viernes,
        },
      },
      { new: true, runValidators: true } // Devuelve el documento actualizado y valida
    );

    if (!updatedSchedule) {
      return NextResponse.json({ message: "Horario no encontrado" }, { status: 404 });
    }

    return NextResponse.json(updatedSchedule);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Error al actualizar el horario' },
      { status: 400 }
    );
  }
}
