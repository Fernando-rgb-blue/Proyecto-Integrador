import { NextResponse } from "next/server";
import Schedule from "@/models/scheduleadmin";
import { connectDB } from "@/libs/mongodb";

// Función para manejar la solicitud GET (obtener un horario específico por ID)
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params; // Obtener el id del parámetro

  if (!id) {
    return NextResponse.json({ message: "El campo id es requerido." }, { status: 400 });
  }

  try {
    await connectDB();
    const schedule = await Schedule.findById(id); // Buscar por el id proporcionado
    
    if (!schedule) {
      return NextResponse.json({ message: "Horario no encontrado" }, { status: 404 });
    }

    return NextResponse.json(schedule); // Devuelve el horario si se encuentra
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Error al obtener el horario" },
      { status: 400 }
    );
  }
}

// Función para manejar la solicitud DELETE (eliminar un horario específico por ID)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params; // Obtener el id del parámetro

  if (!id) {
    return NextResponse.json({ message: "El campo id es requerido." }, { status: 400 });
  }

  try {
    await connectDB();
    const deletedSchedule = await Schedule.findByIdAndDelete(id); // Eliminar el horario por id

    if (!deletedSchedule) {
      return NextResponse.json({ message: "Horario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ message: "Horario eliminado exitosamente" }); // Mensaje de éxito
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Error al eliminar el horario" },
      { status: 400 }
    );
  }
}

// Función para manejar la solicitud PUT (actualizar un horario específico por ID)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params; // Obtener el id del parámetro
  const { lunes, martes, miercoles, jueves, viernes } = await request.json();

  if (!id) {
    return NextResponse.json({ message: "El campo id es requerido." }, { status: 400 });
  }

  if (!lunes || !martes || !miercoles || !jueves || !viernes) {
    return NextResponse.json({ message: "Todos los días deben tener los slots definidos." }, { status: 400 });
  }

  try {
    await connectDB();

    // Actualizar el horario por id
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      id,
      {
        lunes: lunes.map((slot: any) => ({
          available: slot.available || 0,
          course: slot.course || "",
          professor: slot.professor || "",
          classroom: slot.classroom || "",
          activity: slot.activity || ""
        })),
        martes: martes.map((slot: any) => ({
          available: slot.available || 0,
          course: slot.course || "",
          professor: slot.professor || "",
          classroom: slot.classroom || "",
          activity: slot.activity || ""
        })),
        miercoles: miercoles.map((slot: any) => ({
          available: slot.available || 0,
          course: slot.course || "",
          professor: slot.professor || "",
          classroom: slot.classroom || "",
          activity: slot.activity || ""
        })),
        jueves: jueves.map((slot: any) => ({
          available: slot.available || 0,
          course: slot.course || "",
          professor: slot.professor || "",
          classroom: slot.classroom || "",
          activity: slot.activity || ""
        })),
        viernes: viernes.map((slot: any) => ({
          available: slot.available || 0,
          course: slot.course || "",
          professor: slot.professor || "",
          classroom: slot.classroom || "",
          activity: slot.activity || ""
        }))
      },
      { new: true, runValidators: true } // Devuelve el documento actualizado y valida los datos
    );

    if (!updatedSchedule) {
      return NextResponse.json({ message: "Horario no encontrado" }, { status: 404 });
    }

    return NextResponse.json(updatedSchedule); // Devuelve el horario actualizado
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Error al actualizar el horario" },
      { status: 400 }
    );
  }
}
