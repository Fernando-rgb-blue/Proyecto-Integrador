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
  await connectDB ();
  try {
    const data = await req.json();
    const newCourse = new Course(data);
    await newCourse.save();
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error al crear el curso" }, { status: 400 });
  }
}
