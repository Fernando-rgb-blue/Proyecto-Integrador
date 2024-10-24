'use client';
import { Teacher } from "@/types/teacher";
import { useEffect, useState } from "react";
import TeacherCard from "./TeacherCard";

const MainTeacherList = () => {
    const [docentes, setDocentes] = useState<Teacher[]>([]);

    useEffect(() => {
        fetch('/api/docentes')
            .then(res => {
                res.json().then((docentes: Teacher[]) => setDocentes(docentes));
            })
            .catch(error => console.error('Error al cargar docentes:', error));
    }, []);

    return (
        <div className="mt-12">
            {docentes?.length > 0 ? (
                <ul className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-16 items-center">
                    {docentes.map(docente => (
                        <li key={docente._id} className="flex justify-center my-10 md:my-0 items-center w-full">
                            <TeacherCard docente={docente} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>
                    Cargando docentes...
                </p>
            )}
        </div>
    );
}

export default MainTeacherList;