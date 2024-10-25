import { NextResponse } from 'next/server';
import { connectDB } from '@/libs/mongodb';// Conexión a la base de datos
import Schedule from '@/models/schedule';

// Obtener un horario específico
export async function GET(request: Request, { params }: { params: { id: string } }) {
    await connectDB();
    const { id } = params;

    try {
        const schedule = await Schedule.findById(id);
        if (!schedule) {
            return NextResponse.json({ message: 'Horario no encontrado' }, { status: 404 });
        }
        return NextResponse.json(schedule, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error al obtener horario' }, { status: 500 });
    }
}

// Actualizar un horario (agregar o eliminar franjas horarias)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    await connectDB();
    const { id } = params;
    const body = await request.json();

    try {
        const { action, day, timeSlot } = body; // action puede ser 'add' o 'remove'

        // Verificar si se necesita agregar o eliminar
        if (action === 'add') {
            // Agregar una nueva franja horaria
            const updatedSchedule = await Schedule.findByIdAndUpdate(
                id,
                { $addToSet: { 'days.$[day].timeSlots': timeSlot } }, // Usa $addToSet para evitar duplicados
                { arrayFilters: [{ 'day.day': day }], new: true } // Actualiza el documento y aplica el filtro para días
            );

            if (!updatedSchedule) {
                return NextResponse.json({ message: 'Horario no encontrado' }, { status: 404 });
            }
            return NextResponse.json(updatedSchedule, { status: 200 });
        } else if (action === 'remove') {
            // Eliminar una franja horaria
            const updatedSchedule = await Schedule.findByIdAndUpdate(
                id,
                { $pull: { 'days.$[day].timeSlots': timeSlot } }, // Usa $pull para eliminar
                { arrayFilters: [{ 'day.day': day }], new: true } // Actualiza el documento y aplica el filtro para días
            );

            if (!updatedSchedule) {
                return NextResponse.json({ message: 'Horario no encontrado' }, { status: 404 });
            }
            return NextResponse.json(updatedSchedule, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Error al actualizar horario' }, { status: 500 });
    }
}

// Eliminar un horario específico
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    await connectDB();
    const { id } = params;

    try {
        const deletedSchedule = await Schedule.findByIdAndDelete(id);
        if (!deletedSchedule) {
            return NextResponse.json({ message: 'Horario no encontrado' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Horario eliminado' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error al eliminar horario' }, { status: 500 });
    }
}
