import { NextResponse } from "next/server";
import Schedule from "@/models/scheduleadmin";
import { connectDB } from "@/libs/mongodb";

// Función para manejar la solicitud POST
export async function POST(request: Request) {
  const { year, cycle, slots } = await request.json();

  // Verificación de campos requeridos
  if (!year || !cycle || !slots) {
    return NextResponse.json(
      { message: "Los campos year, cycle y slots son requeridos." },
      { status: 400 }
    );
  }

  try {
    // Conectar a la base de datos
    await connectDB();

    // Crear un nuevo horario
    const newSchedule = new Schedule({ year, cycle, slots });
    const savedSchedule = await newSchedule.save();

    return NextResponse.json({
      year: savedSchedule.year,
      cycle: savedSchedule.cycle,
      slots: savedSchedule.slots,
    }, { status: 201 }); // 201 Created
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Error al crear el horario' },
      { status: 500 } // 500 Internal Server Error
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

