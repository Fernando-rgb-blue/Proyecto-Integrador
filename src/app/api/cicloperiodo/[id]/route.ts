import { NextResponse } from 'next/server';
import cicloperiodo from '@/models/cicloperiodo';  // Actualizado a la nueva colección
import { connectDB } from "@/libs/mongodb";

// Conectar a la base de datos
connectDB();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const ciclo = await cicloperiodo.findById(id);  // Usar cicloperiodo en lugar de scheduleprueba
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

    // Validar el campo 'periodo' y 'ciclo'
    if (!['I', 'II'].includes(data.periodo)) {
      return NextResponse.json(
        { message: 'Periodo debe ser "I" o "II"' },
        { status: 400 }
      );
    }

    if (!['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'].includes(data.ciclo)) {
      return NextResponse.json(
        { message: 'Ciclo inválido' },
        { status: 400 }
      );
    }

    const cicloActualizado = await cicloperiodo.findByIdAndUpdate(id, data, { new: true });
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
    const cicloEliminado = await cicloperiodo.findByIdAndDelete(id);  // Usar cicloperiodo en lugar de scheduleprueba
    if (!cicloEliminado) {
      return NextResponse.json({ message: 'Ciclo no encontrado' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Ciclo eliminado correctamente' });
  } catch (error) {
    console.error("Error al eliminar el ciclo:", error);
    return NextResponse.json({ message: 'Error al eliminar el ciclo', error: error.message }, { status: 500 });
  }
}
