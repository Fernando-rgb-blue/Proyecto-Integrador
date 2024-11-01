import { NextRequest, NextResponse } from "next/server";
import Course from "@/models/course";
import { connectDB } from "@/libs/mongodb";


// GET: Obtener un curso por ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const course = await Course.findById(params.id);
    if (!course) {
      return NextResponse.json({ message: "Curso no encontrado" }, { status: 404 });
    }
    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener el curso" }, { status: 500 });
  }
}

// PUT: Actualizar un curso por ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const data = await req.json();
    const updatedCourse = await Course.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!updatedCourse) {
      return NextResponse.json({ message: "Curso no encontrado" }, { status: 404 });
    }
    return NextResponse.json(updatedCourse, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error al actualizar el curso" }, { status: 400 });
  }
}

// DELETE: Eliminar un curso por ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const deletedCourse = await Course.findByIdAndDelete(params.id);
    if (!deletedCourse) {
      return NextResponse.json({ message: "Curso no encontrado" }, { status: 404 });
    }
    return NextResponse.json({ message: "Curso eliminado con éxito" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error al eliminar el curso" }, { status: 500 });
  }
}
