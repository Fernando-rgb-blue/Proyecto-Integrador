import { NextResponse } from 'next/server';
import Schedule from "@/models/scheduleadmin2";
import { connectDB } from "@/libs/mongodb";

// Conectar a la base de datos
connectDB();

// Obtener todos los horarios (GET)
export async function GET() {
  try {
    const schedules = await Schedule.find();
    return NextResponse.json(schedules, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error al obtener los horarios', error }, { status: 500 });
  }
}

// Crear un nuevo horario (POST)
export async function POST(req: Request) {
  try {
    const scheduleData = await req.json();

    // Verificar que cada día tenga 14 slots y que cada slot tenga el formato correcto
    const daysOfWeek = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
    daysOfWeek.forEach(day => {
      if (!scheduleData[day]) {
        scheduleData[day] = Array(14).fill({ available: 0, courses: [{}] });
      } else {
        scheduleData[day].forEach(slot => {
          if (!slot.courses) {
            slot.courses = [{}];
          }
        });
      }
    });

    const newSchedule = new Schedule(scheduleData);
    await newSchedule.save();
    return NextResponse.json(newSchedule, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error al crear el horario', error }, { status: 500 });
  }
}
