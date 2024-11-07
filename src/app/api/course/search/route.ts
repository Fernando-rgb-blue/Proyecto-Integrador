import { NextResponse } from 'next/server';
import Course from "@/models/course";
import { connectDB } from "@/libs/mongodb";

export async function GET(req: Request) {
    await connectDB();
    const url = new URL(req.url);
    const cycle = url.searchParams.get('cycle');

    if (!cycle) {
        return NextResponse.json({ message: 'Cycle parameter is required' }, { status: 400 });
    }

    try {
        // Busca los cursos por ciclo y selecciona solo el campo `name`
        const courses = await Course.find({ cycle }).select('name');
        return NextResponse.json(courses, { status: 200 });
    } catch (error) {
        console.error("Error fetching courses:", error);
        return NextResponse.json({ message: 'Error fetching courses', error }, { status: 500 });
    }
}

