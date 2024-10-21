'use client';
import { Teacher } from "@/types/teacher";
import { FormEvent, useEffect, useState } from "react";
import TeacherForm from "./TeacherForm";
import TeacherItem from "./TeacherItem";

const TeacherList = () => {
    const [docentes, setDocentes] = useState<Teacher[]>([]);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    async function handleFormSubmit(ev: FormEvent, data: Teacher) {
        ev.preventDefault();
    
        try {
            const response = await fetch('/api/docentes', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'},
            });
    
            if (!response.ok) {
                console.error('Error al guardar el docente.');
                return;
            }

            console.log('Ítem guardado correctamente');
            setShowPopup(false);
        } catch (error) {
            console.error('Error de red o servidor:', error);
        }
    }

    const fetchDocentes = async () => {
        fetch('/api/docentes')
            .then(res => {
                res.json().then((docentes: Teacher[]) => setDocentes(docentes));
            })
            .catch(error => console.error('Error al cargar docentes:', error));
    }

    useEffect(() => {
        fetchDocentes();
        if (showPopup) {
            setIsVisible(true);
            //console.log(docentes);
            setTimeout(() => {
                document.getElementById('popup')?.classList.remove('opacity-0');
                document.getElementById('popup')?.classList.add('opacity-100');
            }, 10);
        } else {
            document.getElementById('popup')?.classList.remove('opacity-100');
            document.getElementById('popup')?.classList.add('opacity-0');
            setTimeout(() => setIsVisible(false), 150);
        }
    }, [showPopup]);

    const handleTeachersUpdate = () => {
        fetchDocentes();
    }

    return (
        <>
            {isVisible && (
                <div id="popup" onClick={() => setShowPopup(false)}
                className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition-opacity duration-150 opacity-0">
                    <div onClick={ev => ev.stopPropagation()} className="bg-gray-200 p-2 rounded-lg dark:bg-slate-700">
                        <TeacherForm onSubmit={handleFormSubmit} teacher={null}
                        setShowPopup={setShowPopup}/>
                    </div>
                </div>
            )}
            <div className="max-w-52 mx-auto text-center pt-10">
                <div onClick={() => setShowPopup(true)}
                className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300
                    ease-in-out hover:bg-primary/80 cursor-pointer mb-8">
                    Agregar Docente
                </div>
            </div>
            {docentes?.length > 0 ? (
                <ul>
                    {docentes.map(docente => (
                        <li key={docente._id}>
                            <TeacherItem teacherItem={docente} onTeacherUpdated={handleTeachersUpdate}/>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>
                    No hay docentes.
                </p>
            )}
        </>
    );
}

export default TeacherList;