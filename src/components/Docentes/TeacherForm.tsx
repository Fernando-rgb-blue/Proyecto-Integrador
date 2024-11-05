'use client';
import { FormEvent, useEffect, useState, ChangeEvent, SetStateAction, Dispatch } from "react";
import { User } from "@/types/user";
import EditableImage from "../Common/EditableImage";

interface TeacherFormProps {
    onSubmit: (event: FormEvent<HTMLFormElement>, teacher: User) => void;
    teacher: User;
    setShowPopup: Dispatch<SetStateAction<boolean>>;
}

const TeacherForm = ({ onSubmit, teacher, setShowPopup }: TeacherFormProps) => {
    const [formData, setFormData] = useState<User>({
        _id: teacher?._id || "",
        email: teacher?.email || "",
        password: teacher?.password || "informatica2025",
        fullname: teacher?.fullname || "",
        role: teacher?.role || "profesor",
        image: teacher?.image || "/images/props/pfp_default.png",
        office: teacher?.office || "",
        areas: teacher?.areas || ""
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);

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
        <div className="fixed inset-0 mt-9 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={(ev) => onSubmit(ev, formData)} className="max-w-3xl w-full mx-4 p-4 bg-white dark:bg-dark rounded shadow-lg">
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-[.3fr_.7fr]">
                    <div>
                        <EditableImage
                            image={formData.image}
                            setImage={handleImageChange}
                            // Tamaño pequeño en móviles
                        />
                    </div>
                    <div className="w-full flex flex-col">
                        <label htmlFor="fullname">
                            Nombres y apellidos
                        </label>
                        <input
                            id="fullname"
                            type="text"
                            value={formData.fullname}
                            onChange={handleInputChange}
                            autoComplete="off"
                            className="mt-1 mb-5 border rounded"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-10 gap-2">
                            <div className="col-span-10 sm:col-span-7">
                                <label htmlFor="email">
                                    Correo electrónico
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 mb-5 border rounded"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="col-span-10 sm:col-span-3">
                                <label htmlFor="office">
                                    Oficina
                                </label>
                                <input
                                    id="office"
                                    type="text"
                                    value={formData.office}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 mb-5 border rounded"
                                />
                            </div>
                        </div>
                        {teacher && (
                            <div className="grid grid-cols-1 sm:grid-cols-10 gap-x-2">
                                <div className="col-span-10 sm:col-span-5">
                                    <label htmlFor="password">
                                        Cambiar contraseña
                                    </label>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value=""
                                        onChange={handleInputChange}
                                        className="w-full mt-1 mb-1 sm:mb-5"
                                    />
                                </div>
                                <div className="col-span-10 sm:col-span-5 flex gap-2 sm:pt-1 mb-4 sm:my-auto">
                                    <input
                                        id="showPassword"
                                        type="checkbox"
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                    <label htmlFor="showPassword">
                                        Mostrar contraseña
                                    </label>
                                </div>
                            </div>
                        )}
                        <label htmlFor="areas">
                            Áreas
                        </label>
                        <input
                            id="areas"
                            type="text"
                            value={formData.areas}
                            onChange={handleInputChange}
                            className="p-2 mt-1 mb-5 border rounded"
                        />
                        <div className="flex gap-2">
                            <input
                                id="role"
                                type="checkbox"
                                checked={formData.role === "admin"}
                                onChange={() => setFormData({...formData, "role": formData.role === "admin" ? "profesor" : "admin"})}
                            />
                            <label htmlFor="role">
                                Rol de administrador
                            </label>
                        </div>
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