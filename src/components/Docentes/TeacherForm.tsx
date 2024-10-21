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
        <form onSubmit={(ev) => onSubmit(ev, formData)}
        className="max-w-3xl mx-auto">
            <div className="grid gap-4" style={{gridTemplateColumns:'.3fr .7fr'}}>
                <div>
                    <EditableImage image={formData.image} setImage={handleImageChange} />
                </div>
                <div className="w-full mx-auto flex flex-col">
                    <label htmlFor="name">
                        Nombres y apellidos
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                    <div className="grid grid-cols-10 gap-2">
                        <div className="col-span-7">
                            <label htmlFor="email">
                                Correo electrónico
                            </label>
                            <input
                                id="email"
                                type="text"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full"
                                autoComplete="off"
                            />
                        </div>
                        <div className="col-span-3">
                            <label htmlFor="office">
                                Oficina
                            </label>
                            <input
                                id="office"
                                type="text"
                                value={formData.office}
                                onChange={handleInputChange}
                                className="w-full"
                            />
                        </div>
                    </div>
                    <label htmlFor="areas">
                        Áreas
                    </label>
                    <input
                        id="areas"
                        type="text"
                        value={formData.areas}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="flex gap-4 justify-center items-center mt-4">
                <button type="submit" className="px-8 py-4">
                    Guardar
                </button>
                <button className="secondary px-8 py-4"
                type="button" onClick={() => setShowPopup(false)}>
                    Cancelar
                </button>
            </div>
            {errorMessage && (
                <p>
                    {errorMessage}
                </p>
            )}
        </form>
    );
}

export default TeacherForm;