import { NextResponse } from 'next/server';
import Schedule from '@/models/scheduleadmin2'; 
import { connectDB } from '@/libs/mongodb';

// Conectar a la base de datos
connectDB();

// Función para filtrar los slots de un día
const filterDaySlots = (daySlots, classroom) => {
  return daySlots.map((slot) => {
    if (slot.available === 0) {
      return { available: 0, courses: [] }; // Slot no disponible
    }
    return {
      available: 1,
      courses: slot.courses.filter(course => course.classroom === classroom) // Filtrar por aula
    };
  });
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const classroom = searchParams.get('classroom');

    if (!classroom) {
      return NextResponse.json(
        { message: 'El parámetro "classroom" es obligatorio.' },
        { status: 400 }
      );
    }

    const schedules = await Schedule.find({
      $or: [
        { "lunes.courses.classroom": classroom },
        { "martes.courses.classroom": classroom },
        { "miercoles.courses.classroom": classroom },
        { "jueves.courses.classroom": classroom },
        { "viernes.courses.classroom": classroom }
      ]
    }).select('lunes martes miercoles jueves viernes'); // Seleccionar solo los campos necesarios

    const filteredSchedules = schedules.map((schedule) => {
      const filtered = {};
      // Iterar dinámicamente sobre los días
      ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'].forEach((day) => {
        filtered[day] = filterDaySlots(schedule[day], classroom);
      });

      return filtered;
    }).filter(schedule =>
      // Verificar si algún día tiene cursos filtrados
      Object.values(schedule).some(daySlots => 
        daySlots.some(slot => slot.courses.length > 0)
      )
    );

    if (filteredSchedules.length === 0) {
      return NextResponse.json(
        { message: 'No se encontraron horarios para el aula especificada.' },
        { status: 404 }
      );
    }

    return NextResponse.json(filteredSchedules, { status: 200 });
  } catch (error) {
    console.error("Error al buscar horarios por aula:", error);
    return NextResponse.json(
      { message: 'Error al obtener los horarios', error: error.message },
      { status: 500 }
    );
  }
}
