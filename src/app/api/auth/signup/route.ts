import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from 'bcryptjs'
import { connectDB } from "@/libs/mongodb";

export async function POST(request: Request) {

  const { fullname, email, password } = await request.json();

  console.log(fullname, email, password);

  if (!password || password.length < 6) return NextResponse.json({
    message: "Contraseña minima de 6 caracteres"
  }, {
    status: 400
  });

  try {

    
    await connectDB()

    const userFound = await User.findOne({ email });

    if (userFound)
      return NextResponse.json(
        {
          message: "coreo existe",
        },
        {
          status: 409,
        }
      );

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = new User({
      fullname,
      email,
      password: hashedPassword
    })

    const savedUser = await user.save()

    console.log(savedUser)

    return NextResponse.json({
      _id: savedUser.id,
      email: savedUser.email,
      fullname: savedUser.fullname,
    })

  } catch (error) {
    console.log(error);
    if (error instanceof Error){
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status:400,
        }
      );
    }
  }
}