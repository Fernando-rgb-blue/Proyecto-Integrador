'use client';
import { Teacher } from "@/types/teacher";
import { FormEvent, useEffect, useState } from "react";
import TeacherForm from "./TeacherForm";
import Image from "next/image";

interface TeacherItemProps {
    teacherItem: Teacher;
    onTeacherUpdated: () => void;
}

const TeacherItem = ({ teacherItem, onTeacherUpdated }: TeacherItemProps) => {
    const { _id, image, name, email, office, areas } = teacherItem;
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isDeleteVisible, setIsDeleteVisible] = useState<boolean>(false);

    async function handleFormSubmit(ev: FormEvent, data: Teacher) {
        ev.preventDefault();
    
        try {
            const response = await fetch('/api/docentes', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (!response.ok) {
                console.error('Error al actualizar el docente.');
                return;
            }

            //console.log('Ítem actualizado correctamente');
            setShowPopup(false);
            onTeacherUpdated();
        } catch (error) {
            console.error('Error de red o servidor: ', error);
        }
    }

    async function handleDelete(id: string) {
        try {
            const response = await fetch('/api/docentes', {
                method: 'DELETE',
                body: JSON.stringify({ _id: id }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                console.error('Error al eliminar el docente.');
                return;
            }

            console.log('Item eliminado correctamente');
            setShowDeletePopup(false);
            onTeacherUpdated();
        } catch (error) {
            console.error('Error de red o servidor: ', error);
        }
    }

    useEffect(() => {
        if (showPopup) {
            setIsVisible(true);
            //console.log(teacherItem);
            setTimeout(() => {
                document.getElementById('popup')?.classList.remove('opacity-0');
                document.getElementById('popup')?.classList.add('opacity-100');
            }, 10);
        } else {
            document.getElementById('popup')?.classList.remove('opacity-100');
            document.getElementById('popup')?.classList.add('opacity-0');
            setTimeout(() => setIsVisible(false), 200);
        }
    }, [showPopup]);

    useEffect(() => {
        if (showDeletePopup) {
            setIsDeleteVisible(true);
            //console.log(teacherItem);
            setTimeout(() => {
                document.getElementById('popup')?.classList.remove('opacity-0');
                document.getElementById('popup')?.classList.add('opacity-100');
            }, 10);
        } else {
            document.getElementById('popup')?.classList.remove('opacity-100');
            document.getElementById('popup')?.classList.add('opacity-0');
            setTimeout(() => setIsDeleteVisible(false), 150);
        }
    }, [showDeletePopup]);

    return (
        <>
            {isVisible && (
                <div id="popup" onClick={() => setShowPopup(false)}
                className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition-opacity duration-150 opacity-0">
                    <div onClick={ev => ev.stopPropagation()} className="bg-gray-200 p-2 rounded-lg dark:bg-slate-700">
                        <TeacherForm onSubmit={handleFormSubmit} teacher={teacherItem}
                        setShowPopup={setShowPopup}/>
                    </div>
                </div>
            )}
            {isDeleteVisible && (
                <div id="popup" onClick={() => setShowDeletePopup(false)}
                className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition-opacity duration-150 opacity-0">
                    <div onClick={ev => ev.stopPropagation()}
                        className="bg-gray-200 p-4 rounded-lg dark:bg-slate-700">
                        <h4 className="font-bold text-lg text-center">
                            ¿Estás seguro?
                        </h4>
                        <p>
                            Eliminar docente: {name}
                        </p>
                        <div className="flex gap-8 justify-center mt-3">
                            <button className="secondary py-2 px-6"
                            onClick={() => handleDelete(_id)}>
                                Sí
                            </button>
                            <button className="primary py-2 px-6"
                            onClick={() => setShowDeletePopup(false)}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="bg-primary/30 dark:bg-slate-800 p-4 my-2 rounded-md text-center flex flex-col dark:text-white hover:bg-blue-300 dark:hover:bg-slate-700 hover:shadow-md hover:shadow-black/25 transition-all">
                <div className="flex items-center justify-between">
                    <div className="mr-5">
                        <Image className="rounded-lg w-full h-full mb-1" src={image} width={200} height={250} sizes="100vw"
                        style={{ width: 'auto', height: '250px', objectFit: 'cover' }} priority={true} alt="Foto de docente" />
                    </div>
                    <div className="grow">
                        <h4 className="font-bold text-2xl pb-3">
                            {name}
                        </h4>
                        <div className="flex flex-col gap-y-3 text-start">
                            <p>
                                Correo: {email}
                            </p>
                            <p>
                                Oficina: {office}
                            </p>
                            <p>
                                Áreas de investigación: {areas}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-10">
                    <div onClick={() => setShowPopup(true)}
                        className="rounded-sm bg-primary px-8 py-4 mt-3 text-base font-semibold text-white duration-300
                        ease-in-out hover:bg-primary/80 cursor-pointer">
                        Editar Docente
                    </div>
                    <div onClick={() => setShowDeletePopup(true)}
                        className="rounded-sm border-2 border-primary px-8 py-4 mt-3 text-base font-semibold text-primary duration-300
                        ease-in-out hover:bg-primary/20 cursor-pointer">
                        Eliminar Docente
                    </div>
                </div>
            </div>
        </>
    );
}

export default TeacherItem;