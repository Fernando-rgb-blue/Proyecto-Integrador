'use client';
import { User } from "@/types/user";
import { FormEvent, useEffect, useState } from "react";
import TeacherForm from "./TeacherForm";
import TeacherItem from "./TeacherItem";

const TeacherList = () => {
    const [docentes, setDocentes] = useState<User[]>([]);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const [searchTerm, setSearchTerm] = useState('');

    async function handleFormSubmit(ev: FormEvent, data: User) {
        ev.preventDefault();
    
        try {
            const response = await fetch('/api/auth/signup', {
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
        fetch('/api/auth/signup')
            .then(res => {
                res.json().then((docentes: User[]) => setDocentes(docentes));
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

    const handleUsersUpdate = () => {
        fetchDocentes();
    }

    return (
        <>
            {isVisible && (
                <div
                id="popup"
                onClick={() => setShowPopup(false)}
                className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition-opacity duration-150 opacity-0"
                >
                <div
                    onClick={(ev) => ev.stopPropagation()}
                    className="bg-gray-200 p-2 rounded-lg dark:bg-slate-700"
                >
                    <TeacherForm
                    onSubmit={handleFormSubmit}
                    teacher={null}
                    setShowPopup={setShowPopup}
                    />
                </div>
                </div>
            )}
            <div className="w-full mx-auto text-center pt-10">
                {/* Buscador */}
                <input
                type="text"
                placeholder="Buscar docente por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 w-full max-w-lg px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-white"
                />
            </div>
            <div className="max-w-52 mx-auto text-center">
                <div
                onClick={() => setShowPopup(true)}
                className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80 cursor-pointer mb-8"
                >
                Agregar Docente
                </div>
            </div>
            {docentes?.length > 0 ? (
                <ul className="mb-12">
                {docentes
                    .filter((docente) =>
                    docente.fullname.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((docente) => (
                    <li key={docente._id}>
                        <TeacherItem
                        userItem={docente}
                        onUserUpdated={handleUsersUpdate}
                        />
                    </li>
                    ))}
                </ul>
            ) : (
                <div className="flex justify-center items-center mt-10 mb-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid border-opacity-50"></div>
                </div>
            )}
            </>
    );
}

export default TeacherList;