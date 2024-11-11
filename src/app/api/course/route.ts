import { NextRequest, NextResponse } from "next/server";
import Course from "@/models/course";
import { connectDB } from "@/libs/mongodb";

// GET: Obtener todos los cursos

export async function GET() {
  await connectDB();
  try {
    const courses = await Course.find({});
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener los cursos" }, { status: 500 });
  }
}

// POST: Crear un nuevo curso

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const data = await req.json();

    if (!data.nombre || !data.ciclo) {
      return NextResponse.json(
        { message: "Faltan datos requeridos: nombre, ciclo o profesores" },
        { status: 400 }
      );
    }

    const newCourse = new Course({
      nombre: data.nombre,
      ciclo: data.ciclo,
      profesores: data.profesores
    });

    await newCourse.save();
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error al crear el curso" }, { status: 400 });
  }
}
