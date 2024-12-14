import { NextResponse } from 'next/server';
import Schedule from '@/models/scheduleadmin2'; // Modelo de Schedule
import { connectDB } from '@/libs/mongodb';

// Conectar a la base de datos
connectDB();


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const professor = searchParams.get('professor');


    if (!professor) {
      return NextResponse.json({ message: 'El parámetro "professor" es obligatorio.' }, { status: 400 });
    }


    const schedules = await Schedule.find({
      $or: [
        { "lunes.courses.professor": professor },
        { "martes.courses.professor": professor },
        { "miercoles.courses.professor": professor },
        { "jueves.courses.professor": professor },
        { "viernes.courses.professor": professor }
      ]
    }).select('lunes martes miercoles jueves viernes');


    const filteredSchedules = schedules.map((schedule) => {
      return {
        lunes: schedule.lunes.map((slot) => {
          if (slot.available === 0) {
            return { available: 0, courses: [] }; 
          }
          return {
            available: 1,
            courses: slot.courses.filter(course => course.professor === professor) 
          };
        }),
        martes: schedule.martes.map((slot) => {
          if (slot.available === 0) {
            return { available: 0, courses: [] }; 
          }
          return {
            available: 1,
            courses: slot.courses.filter(course => course.professor === professor) 
          };
        }),
        miercoles: schedule.miercoles.map((slot) => {
          if (slot.available === 0) {
            return { available: 0, courses: [] }; 
          }
          return {
            available: 1,
            courses: slot.courses.filter(course => course.professor === professor) 
          };
        }),
        jueves: schedule.jueves.map((slot) => {
          if (slot.available === 0) {
            return { available: 0, courses: [] }; 
          }
          return {
            available: 1,
            courses: slot.courses.filter(course => course.professor === professor) 
          };
        }),
        viernes: schedule.viernes.map((slot) => {
          if (slot.available === 0) {
            return { available: 0, courses: [] }; 
          }
          return {
            available: 1,
            courses: slot.courses.filter(course => course.professor === professor) 
          };
        })
      };
    }).filter(schedule => 
      schedule.lunes.some(slot => slot.courses.length > 0) || 
      schedule.martes.some(slot => slot.courses.length > 0) || 
      schedule.miercoles.some(slot => slot.courses.length > 0) || 
      schedule.jueves.some(slot => slot.courses.length > 0) || 
      schedule.viernes.some(slot => slot.courses.length > 0)
    );

    if (filteredSchedules.length === 0) {
      return NextResponse.json({ message: 'No se encontraron horarios para el profesor especificado.' }, { status: 404 });
    }

    return NextResponse.json(filteredSchedules, { status: 200 });
  } catch (error) {
    console.error("Error al buscar horarios por profesor:", error);
    return NextResponse.json({ message: 'Error al obtener los horarios', error: error.message }, { status: 500 });
  }
}
