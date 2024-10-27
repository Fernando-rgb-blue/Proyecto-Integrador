import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from 'bcryptjs'
import { connectDB } from "@/libs/mongodb";

export async function POST(request: Request) {
  const { fullname, email, password, role = 'profesor' } = await request.json();

  console.log(fullname, email, password, role); 

  if (!password || password.length < 6) {
    return NextResponse.json({
      message: "La contraseña debe tener un mínimo de 6 caracteres"
    }, {
      status: 400
    });
  }

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
      role 
    });

    const savedUser = await user.save();

    return NextResponse.json({
      _id: savedUser.id,
      email: savedUser.email,
      fullname: savedUser.fullname,
      role: savedUser.role 
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Error' },
      { status: 400 }
    );
  }
}
