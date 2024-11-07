import { NextResponse } from 'next/server';
import scheduleprueba from '@/models/scheduleprueba';
import { connectDB } from "@/libs/mongodb";

// Conectar a la base de datos
connectDB();

export async function GET() {
  try {
    // Obtener y ordenar los ciclos por el campo `ciclo` y `seccion`
    const ciclos = await scheduleprueba.find({}).sort({ ciclo: 1, seccion: 1 }); 
    return NextResponse.json(ciclos);
  } catch (error) {
    console.error("Error al obtener los ciclos:", error);
    return NextResponse.json(
      { message: 'Error al obtener los ciclos', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const nuevoCiclo = new scheduleprueba(data);

    // Guardar el nuevo ciclo en la base de datos
    await nuevoCiclo.save();
    return NextResponse.json(nuevoCiclo, { status: 201 });
  } catch (error) {
    console.error("Error al crear el ciclo:", error);
    return NextResponse.json(
      { message: 'Error al crear el ciclo', error: error.message },
      { status: 500 }
    );
  }
}
