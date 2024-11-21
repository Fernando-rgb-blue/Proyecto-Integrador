import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from "@/libs/mongodb";
import classroom from '@/models/classroom';


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  connectDB; // Conectar a la base de datos

  try {
    const aula = await classroom.findById(params.id);
    if (!aula) {
      return NextResponse.json({ error: 'Aula no encontrada' }, { status: 404 });
    }
    return NextResponse.json(aula, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  connectDB; // Conectar a la base de datos
  const body = await req.json();

  try {
    const updatedClassroom = await classroom.findByIdAndUpdate(params.id, body, { new: true });
    if (!updatedClassroom) {
      return NextResponse.json({ error: 'Aula no encontrada' }, { status: 404 });
    }
    return NextResponse.json(updatedClassroom, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'ID o datos inválidos' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  connectDB; // Conectar a la base de datos

  try {
    const deletedClassroom = await classroom.findByIdAndDelete(params.id);
    if (!deletedClassroom) {
      return NextResponse.json({ error: 'Aula no encontrada' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Aula eliminada' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }
}
