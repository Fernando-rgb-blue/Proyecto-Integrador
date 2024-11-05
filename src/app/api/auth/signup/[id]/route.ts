import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb";
import bcrypt from "bcryptjs";

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
      password: user.password,
      fullname: user.fullname,
      role: user.role,
      status: user.status,
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
  let { fullname, email, password, role, status, image, office, areas } = await request.json();
  let userValues = { fullname, email, role, status, image, office, areas };

  try {
    await connectDB();

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }
    
    for (const key in userValues) {
      if (userValues[key] !== undefined) {
        user[key] = userValues[key];
      }
    }

    if (password && password !== '') {
      if (password.length < 6) {
        return NextResponse.json({ message: "Contraseña mínima de 6 caracteres" }, { status: 400 });
      }
      user.password = await bcrypt.hash(password, 12);
    } else {
      password = user.password;
    }

    const updatedUser = await user.save();
    return NextResponse.json({ message: "Usuario actualizado", user: updatedUser });

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
