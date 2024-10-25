// // archivo: app/api/auth/edituser/route.ts

// import { connectDB } from "@/libs/mongodb"; 
// import User from "@/models/user"; 
// import bcrypt from "bcryptjs";

// // Cambiamos la forma de acceder a los parámetros para Next.js
// export async function PUT(req: Request, { params }) {
//   // Asegúrate de que el ID se está pasando correctamente
//   const {id } = params; // Esto debería ser el ID que deseas actualizar

//   // Conectar a la base de datos
//   await connectDB();

//   // Obtener los datos de la solicitud
//   const { fullname, email, password, currentPassword } = await req.json();

//   // Buscar el usuario por _id
//   const user = await User.findById(id);
  
//   if (!user) {
//     return new Response("User not found", { status: 404 });
//   }

//   // Verificar la contraseña actual
//   const isMatch = await bcrypt.compare(currentPassword, user.password);
//   if (!isMatch) {
//     return new Response("Current password is incorrect", { status: 401 });
//   }

//   // Actualizar campos si son válidos
//   if (fullname) user.fullname = fullname;
//   if (email) user.email = email;
//   if (password) user.password = await bcrypt.hash(password, 10);
  
//   await user.save();

//   return new Response(JSON.stringify({ message: "User updated successfully" }), { status: 200 });
// }


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

