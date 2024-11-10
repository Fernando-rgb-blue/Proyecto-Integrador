import { NextResponse } from 'next/server';
import Course from "@/models/course";
import { connectDB } from "@/libs/mongodb";

export async function GET(req: Request) {
    await connectDB();
    const url = new URL(req.url);
    const profesores = url.searchParams.get('profesores');

    if (!profesores) {
        return NextResponse.json({ message: 'El parámetro ciclo es requerido' }, { status: 400 });
    }

    try {
  
        const courses = await Course.find({ profesores }).select('nombre');
        return NextResponse.json(courses, { status: 200 });
    } catch (error) {
        console.error("Error al obtener los cursos:", error);
        return NextResponse.json({ message: 'Error al obtener los cursos', error }, { status: 500 });
    }
}
