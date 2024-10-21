import { connectDB } from "@/libs/mongodb";
import Teacher from "@/models/teachers";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const teachers = await Teacher.find();
        //console.log(teachers);
        return NextResponse.json(teachers, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Ha ocurrido un error al obtener los docentes." }, { status: 400 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { image, name, email, office, areas } = await req.json();

        const newTeacher = new Teacher({
            image,
            name,
            email,
            office,
            areas
        });
        console.log(newTeacher);
        const savedTeacher = await newTeacher.save();
        return NextResponse.json(savedTeacher, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Ha ocurrido un error al crear un docente." }, { status: 400 })
    }
}

export async function PUT(req: NextRequest) {
    try {
        await connectDB();
        const { _id, image, name, email, office, areas } = await req.json();

        if (!isValidObjectId(_id)) {
            return NextResponse.json({ message: "ID no válido" }, { status: 400 });
        }

        const updatedTeacher = await Teacher.findByIdAndUpdate(
            _id,
            { image, name, email, office, areas },
            { new: true }
        );

        if (!updatedTeacher) {
            return NextResponse.json({ message: "Docente no encontrado" }, { status: 404 });
        }

        return NextResponse.json({ message: "Docente actualizado correctamente" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error al actualizar el docente." }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await connectDB();
        const { _id } = await req.json();

        if (!isValidObjectId(_id)) {
            return NextResponse.json({ message: "ID no válido" }, { status: 400 });
        }

        const deletedTeacher = await Teacher.findByIdAndDelete(_id);

        if (!deletedTeacher) {
            return NextResponse.json({ message: "Docente no encontrado" }, { status: 404 });
        }

        return NextResponse.json({ message: "Docente eliminado correctamente" }, { status: 200 });
    } catch {
        return NextResponse.json({ message: "Error al eliminar el docente." }, { status: 500 });
    }
}