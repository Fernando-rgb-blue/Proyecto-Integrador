import { NextResponse } from 'next/server';
import Schedule from '@/models/scheduleadmin2';
import { connectDB } from '@/libs/mongodb';

// Función para filtrar y limpiar los slots por aula
const filterDaySlots = (daySlots: any[], classroom: string) =>
  daySlots.map(slot => ({
    available: slot.available,
    courses:
      slot.available === 1
        ? slot.courses.filter(course => course.classroom === classroom)
        : [],
  }));

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const classroom = searchParams.get('classroom');

    if (!classroom) {
      return NextResponse.json(
        { message: 'El parámetro "classroom" es obligatorio.' },
        { status: 400 }
      );
    }

    const days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];

    const schedules = await Schedule.find({
      $or: days.map(day => ({ [`${day}.courses.classroom`]: classroom })),
    }).select(days.join(' '));

    // Filtrar los horarios para quedarnos solo con cursos del aula
    const filteredSchedules = schedules.map(schedule => {
      const filtered: Record<string, any[]> = {};
      for (const day of days) {
        filtered[day] = filterDaySlots(schedule[day], classroom);
      }
      return filtered;
    });

    // Unificar todos los horarios en uno solo
    const slotCount = 14; // Número de slots por día
    const mergedSchedule: Record<string, any[]> = {};

    for (const day of days) {
      mergedSchedule[day] = Array.from({ length: slotCount }, () => ({
        available: 0,
        courses: [],
      }));
    }

    // Combinar slots
    filteredSchedules.forEach(schedule => {
      for (const day of days) {
        schedule[day].forEach((slot, i) => {
          if (slot.available === 1 && slot.courses.length > 0) {
            mergedSchedule[day][i].available = 1;
            mergedSchedule[day][i].courses.push(...slot.courses);
          }
        });
      }
    });

    // Validar si hay algo
    const hasCourses = Object.values(mergedSchedule).some(day =>
      day.some(slot => slot.courses.length > 0)
    );

    if (!hasCourses) {
      return NextResponse.json(
        { message: 'No se encontraron horarios para el aula especificada.' },
        { status: 404 }
      );
    }

    return NextResponse.json(mergedSchedule);
  } catch (error) {
    console.error('Error al buscar horarios por aula:', error);
    return NextResponse.json(
      {
        message: 'Error al obtener los horarios',
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
