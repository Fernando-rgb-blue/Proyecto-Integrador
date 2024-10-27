import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb";
import bcrypt from "bcryptjs";

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const { fullname, email, password, role } = await request.json();

  try {
    await connectDB();

    // Buscar el usuario actual por ID de sesión
    const user = await User.findById(session.user._id);
    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    // Actualizar campos si se proporcionan
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (password) {
      if (password.length < 6) {
        return NextResponse.json({ message: "Contraseña mínima de 6 caracteres" }, { status: 400 });
      }
      user.password = await bcrypt.hash(password, 12);
    }

    // Validación adicional para cambiar el rol
    if (role) {
      const validRoles = ["profesor", "admin"]; // Asegura que solo se asignen roles válidos
      if (!validRoles.includes(role)) {
        return NextResponse.json({ message: "Rol no válido" }, { status: 400 });
      }
      
      // // Permitir solo a administradores cambiar el rol
      // if (session.user.role !== "admin") {
      //   return NextResponse.json({ message: "No autorizado para cambiar roles" }, { status: 403 });
      // }

      user.role = role; // Actualizar el rol si todo está bien
    }

    const updatedUser = await user.save();
    return NextResponse.json({ message: "Usuario actualizado", user: updatedUser });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error al actualizar usuario" }, { status: 500 });
  }
}
