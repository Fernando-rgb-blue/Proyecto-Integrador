import { NextResponse } from "next/server";
import Schedule from "@/models/scheduleadmin";
import { connectDB } from "@/libs/mongodb";

// Función para manejar la solicitud POST
export async function POST(request: Request) {
  const { id, slots } = await request.json();

  // Verificación de campo requerido `id` y `slots`
  if (!id || !slots) {
    return NextResponse.json(
      { message: "Los campos id y slots son requeridos." },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    // Crear un nuevo horario con el id proporcionado
    const newSchedule = new Schedule({ _id: id, ...slots });
    const savedSchedule = await newSchedule.save();

    return NextResponse.json(savedSchedule, { status: 201 }); // 201 Created
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Error al crear el horario' },
      { status: 500 }
    );
  }
}



// Función para obtener todos los horarios
export async function GET() {
  try {
    await connectDB();
    const schedules = await Schedule.find({});
    return NextResponse.json(schedules);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Error al obtener los horarios' },
      { status: 400 }
    );
  }
}
