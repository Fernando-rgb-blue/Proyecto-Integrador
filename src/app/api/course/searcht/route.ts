import { NextResponse } from 'next/server';
import Course from "@/models/course";
import { connectDB } from "@/libs/mongodb";
import mongoose from 'mongoose';

export async function GET(req: Request) {
  await connectDB();

  const url = new URL(req.url);
  const profesorId = url.searchParams.get('profesores');

  if (!profesorId) {
    return NextResponse.json({ message: 'El parámetro profesores es requerido' }, { status: 400 });
  }

  try {
    // Asegúrate de que se trata como ObjectId (por si estás usando referencias con mongoose.Schema.Types.ObjectId)
    const objectId = new mongoose.Types.ObjectId(profesorId);

    const courses = await Course.find({ profesores: objectId }).select('nombre');

    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los cursos:", error);
    return NextResponse.json({ message: 'Error al obtener los cursos', error }, { status: 500 });
  }
}
