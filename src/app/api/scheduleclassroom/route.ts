import { NextResponse } from 'next/server';
import Schedule from '@/models/scheduleadmin2'; 
import { connectDB } from '@/libs/mongodb';

// Conectar a la base de datos
connectDB();


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const classroom = searchParams.get('classroom');

  
    if (!classroom) {
      return NextResponse.json({ message: 'El parámetro "classroom" es obligatorio.' }, { status: 400 });
    }


    const schedules = await Schedule.find({
      $or: [
        { "lunes.courses.classroom": classroom },
        { "martes.courses.classroom": classroom },
        { "miercoles.courses.classroom": classroom },
        { "jueves.courses.classroom": classroom },
        { "viernes.courses.classroom": classroom }
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
            courses: slot.courses.filter(course => course.classroom === classroom) 
          };
        }),
        martes: schedule.martes.map((slot) => {
          if (slot.available === 0) {
            return { available: 0, courses: [] }; 
          }
          return {
            available: 1,
            courses: slot.courses.filter(course => course.classroom === classroom) 
          };
        }),
        miercoles: schedule.miercoles.map((slot) => {
          if (slot.available === 0) {
            return { available: 0, courses: [] }; 
          }
          return {
            available: 1,
            courses: slot.courses.filter(course => course.classroom === classroom) 
          };
        }),
        jueves: schedule.jueves.map((slot) => {
          if (slot.available === 0) {
            return { available: 0, courses: [] }; 
          }
          return {
            available: 1,
            courses: slot.courses.filter(course => course.classroom === classroom) 
          };
        }),
        viernes: schedule.viernes.map((slot) => {
          if (slot.available === 0) {
            return { available: 0, courses: [] }; 
          }
          return {
            available: 1,
            courses: slot.courses.filter(course => course.classroom === classroom) 
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
      return NextResponse.json({ message: 'No se encontraron horarios para el aula especificada.' }, { status: 404 });
    }

    return NextResponse.json(filteredSchedules, { status: 200 });
  } catch (error) {
    console.error("Error al buscar horarios por aula:", error);
    return NextResponse.json({ message: 'Error al obtener los horarios', error: error.message }, { status: 500 });
  }
}
