import { NextResponse } from 'next/server';
import cicloperiodo from '@/models/cicloperiodo';  // Actualizado a la nueva colección
import { connectDB } from "@/libs/mongodb";

// Conectar a la base de datos
connectDB();

// Obtener ciclo específico basado en anio, periodo, ciclo y seccion
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const anio = searchParams.get('anio');
    const periodo = searchParams.get('periodo');
    const ciclo = searchParams.get('ciclo');
    const seccion = searchParams.get('seccion');

    // Verificar que los parámetros de anio, periodo, ciclo y sección estén presentes
    if (!anio || !periodo || !ciclo || !seccion) {
      return NextResponse.json({ message: 'Faltan parámetros de consulta' }, { status: 400 });
    }

    // Buscar el ciclo específico según los parámetros
    const cicloEncontrado = await cicloperiodo.findOne(
      { anio, periodo, ciclo, seccion },
      '_id' // Solo devolver el campo _id
    );

    if (!cicloEncontrado) {
      return NextResponse.json({ message: 'Ciclo no encontrado' }, { status: 404 });
    }

    return NextResponse.json(cicloEncontrado);
  } catch (error) {
    console.error("Error al obtener el ciclo:", error);
    return NextResponse.json({ message: 'Error al obtener el ciclo', error: error.message }, { status: 500 });
  }
}
