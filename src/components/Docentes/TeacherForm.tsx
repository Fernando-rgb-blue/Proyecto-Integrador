'use client';
import { FormEvent, useEffect, useState, ChangeEvent, SetStateAction, Dispatch } from "react";
import { Teacher } from "@/types/teacher";
import EditableImage from "../Common/EditableImage";

interface TeacherFormProps {
    onSubmit: (event: FormEvent<HTMLFormElement>, teacher: Teacher) => void;
    teacher: Teacher;
    setShowPopup: Dispatch<SetStateAction<boolean>>;
}

const TeacherForm = ({ onSubmit, teacher, setShowPopup }: TeacherFormProps) => {
    const [formData, setFormData] = useState<Teacher>({
        _id: teacher?._id || "",
        image: teacher?.image || "/images/props/pfp_default.png",
        name: teacher?.name || "",
        email: teacher?.email || "",
        office: teacher?.office || "",
        areas: teacher?.areas || ""
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        document.body.style.overflow = "hidden"; // Deshabilita el scroll
        return () => {
            document.body.style.overflow = ""; // Restaura el scroll al cerrar el modal
        };
    }, []);

    const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = ev.target;
        setFormData({
            ...formData,
            [id]: value
        });
        
        if (value === "") {
            setErrorMessage("Todos los campos son obligatorios.");
        } else {
            setErrorMessage(null);
        }
    }

    const handleImageChange = (newImage: string) => {
        setFormData({
            ...formData,
            image: newImage
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={(ev) => onSubmit(ev, formData)} className="max-w-3xl w-full mx-4 p-4 bg-white rounded shadow-lg">
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-[.3fr_.7fr]">
                    <div>
                        <EditableImage
                            image={formData.image}
                            setImage={handleImageChange}
                            // Tamaño pequeño en móviles
                        />
                    </div>
                    <div className="w-full flex flex-col">
                        <label htmlFor="name" className="mb-1">
                            Nombres y apellidos
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            autoComplete="off"
                            className="p-2 mb-4 border rounded"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-10 gap-2">
                            <div className="col-span-10 sm:col-span-7">
                                <label htmlFor="email" className="mb-1">
                                    Correo electrónico
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 mb-4 border rounded"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="col-span-10 sm:col-span-3">
                                <label htmlFor="office" className="mb-1">
                                    Oficina
                                </label>
                                <input
                                    id="office"
                                    type="text"
                                    value={formData.office}
                                    onChange={handleInputChange}
                                    className="w-full p-2 mb-4 border rounded"
                                />
                            </div>
                        </div>
                        <label htmlFor="areas" className="mb-1">
                            Áreas
                        </label>
                        <input
                            id="areas"
                            type="text"
                            value={formData.areas}
                            onChange={handleInputChange}
                            className="p-2 border rounded"
                        />
                    </div>
                </div>
                <div className="flex gap-4 justify-center items-center mt-4">
                    <button type="submit" className="px-8 py-4 bg-primary text-white rounded">
                        Guardar
                    </button>
                    <button
                        className="secondary px-8 py-4 bg-gray-200 rounded"
                        type="button"
                        onClick={() => setShowPopup(false)}
                    >
                        Cancelar
                    </button>
                </div>
                {errorMessage && (
                    <p className="text-red-500 mt-2">
                        {errorMessage}
                    </p>
                )}
            </form>
        </div>
    );
}

export default TeacherForm;