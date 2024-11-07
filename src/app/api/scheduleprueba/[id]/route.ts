import { NextResponse } from 'next/server';
import scheduleprueba from '@/models/scheduleprueba';
import { connectDB } from "@/libs/mongodb";

// Conectar a la base de datos
connectDB();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const ciclo = await scheduleprueba.findById(id);
    if (!ciclo) {
      return NextResponse.json({ message: 'Ciclo no encontrado' }, { status: 404 });
    }
    return NextResponse.json(ciclo);
  } catch (error) {
    console.error("Error al obtener el ciclo:", error);
    return NextResponse.json({ message: 'Error al obtener el ciclo', error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await request.json();
    const cicloActualizado = await scheduleprueba.findByIdAndUpdate(id, data, { new: true });
    if (!cicloActualizado) {
      return NextResponse.json({ message: 'Ciclo no encontrado' }, { status: 404 });
    }
    return NextResponse.json(cicloActualizado);
  } catch (error) {
    console.error("Error al actualizar el ciclo:", error);
    return NextResponse.json({ message: 'Error al actualizar el ciclo', error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const cicloEliminado = await scheduleprueba.findByIdAndDelete(id);
    if (!cicloEliminado) {
      return NextResponse.json({ message: 'Ciclo no encontrado' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Ciclo eliminado correctamente' });
  } catch (error) {
    console.error("Error al eliminar el ciclo:", error);
    return NextResponse.json({ message: 'Error al eliminar el ciclo', error: error.message }, { status: 500 });
  }
}
