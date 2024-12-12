'use client';
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import TeacherCard from "./TeacherCard";

const MainTeacherList = () => {
    const [docentes, setDocentes] = useState<User[]>([]);

    useEffect(() => {
        fetch('/api/auth/signup')
            .then(res => {
                res.json().then((docentes: User[]) => setDocentes(docentes));
            })
            .catch(error => console.error('Error al cargar docentes:', error));
    }, []);

    return (
        <div className="flex flex-wrap justify-center gap-9 py-3 md:py-2 lg:py-2">
            {docentes?.length > 0 ? (
                <ul className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 items-center">
                    {docentes.filter(docente => (docente.role === "profeN" && docente.status === "activo")).map(docente => (
                        <li key={docente._id} className="flex justify-center my-10 md:my-0 items-center w-full">
                            <TeacherCard docente={docente} />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid border-opacity-50"></div>
                </div>
            )}
        </div>
    );
}

export default MainTeacherList;