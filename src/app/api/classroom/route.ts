import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from "@/libs/mongodb";
import classroom from '@/models/classroom';

export async function GET(req: NextRequest) {
  connectDB;
  const classrooms = await classroom.find();
  return NextResponse.json(classrooms, { status: 200 });
}

export async function POST(req: NextRequest) {
  connectDB; 
  const body = await req.json();

  try {
    const newClassroom = await classroom.create(body);
    return NextResponse.json(newClassroom, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear el aula. Verifique los datos enviados.' },
      { status: 400 }
    );
  }
}
