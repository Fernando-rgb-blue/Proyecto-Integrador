import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from 'bcryptjs';
import { connectDB } from "@/libs/mongodb";

// POST: Registra un nuevo usuario

export async function POST(request: Request) {
  const { fullname, email, password, role = 'profesor', status = 'activo', image, office, areas } = await request.json();

  console.log(fullname, email, password, role, status, image, office, areas);

  /*if (!password || password.length < 6) {
    return NextResponse.json(
      { message: "La contraseña debe tener un mínimo de 6 caracteres" },
      { status: 400 }
    );
  }*/

  try {
    await connectDB();

    const userFound = await User.findOne({ email });
    if (userFound) {
      return NextResponse.json(
        { message: "El correo ya existe" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      fullname,
      email,
      password: hashedPassword,
      role,
      status,
      image,
      office,
      areas,
    });

    console.log('Nuevo usuario:', user);

    const savedUser = await user.save();

    return NextResponse.json({
      _id: savedUser.id,
      email: savedUser.email,
      fullname: savedUser.fullname,
      role: savedUser.role,
      status: savedUser.status,
      image: savedUser.image,
      office: savedUser.office,
      areas: savedUser.areas,
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Error' },
      { status: 400 }
    );
  }
}

// GET / General Para ver todos los usuarios

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({}, 'fullname email role status image office areas');
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Error al obtener los usuarios" },
      { status: 500 }
    );
  }
}
