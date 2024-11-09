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


// DELETE: Eliminar un curso el q ta zz xd
export async function DELETE(req: NextRequest) {
  await connectDB();
  try {
    const { id } = await req.json(); // Suponiendo que el `id` se envía en el cuerpo de la solicitud
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return NextResponse.json({ message: "Curso no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ message: "Curso eliminado correctamente" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error al eliminar el curso" }, { status: 500 });
  }
}

// PUT: Actualizar un curso xd
export async function PUT(req: NextRequest) {
  await connectDB();
  try {
    const { id, name, cycle } = await req.json();

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { name, cycle },
      { new: true }
    );

    if (!updatedCourse) {
      return NextResponse.json({ message: "Curso no encontrado" }, { status: 404 });
    }

    return NextResponse.json(updatedCourse, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error al actualizar el curso" }, { status: 500 });
  }
}