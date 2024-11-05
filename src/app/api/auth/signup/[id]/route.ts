import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb";

interface Params {
  id: string;
}

// GET: Resultados por id

export async function GET(request: Request, { params }: { params: Params }) {
  const { id } = params;

  try {
    await connectDB();

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      role: user.role,
      image: user.image,
      office: user.office,
      areas: user.areas,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Error al obtener el usuario" },
      { status: 500 }
    );
  }
}

// PUT
export async function PUT(request: Request, { params }: { params: Params }) {
  const { id } = params;
  const { fullname, email, role, image, office, areas } = await request.json();

  try {
    await connectDB();

    const user = await User.findByIdAndUpdate(
      id,
      { fullname, email, role, image, office, areas },
      { new: true, runValidators: true }
    );

    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      role: user.role,
      image: user.image,
      office: user.office,
      areas: user.areas,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Error al actualizar el usuario" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(request: Request, { params }: { params: Params }) {
  const { id } = params;

  try {
    await connectDB();

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ message: "Usuario eliminado exitosamente" });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Error al eliminar el usuario" },
      { status: 500 }
    );
  }
}
