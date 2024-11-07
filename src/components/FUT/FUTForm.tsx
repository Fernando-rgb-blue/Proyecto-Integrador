'use client';
import { ChangeEvent, useState } from "react";

interface FUTFormData {
    date: string;
    to: string;
    name: string;
    dni: string;
    address: string;
    phone: string;
    email: string;
    role: string;
    code: string;
    faculty: string;
    department: string;
    semester: string;
    request: string;
}

const FUTForm = () => {
    const [formData, setFormData] = useState<FUTFormData>({
        date: "",
        to: "",
        name: "",
        dni: "",
        address: "",
        phone: "",
        email: "",
        role: "",
        code: "",
        faculty: "",
        department: "",
        semester: "",
        request: "",
    });
    const [image, setImage] = useState<string | null>(null);

    const handleInputChange = (ev: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = ev.target;
        setFormData(formData => {
            let newValue = value;

            if(name == 'dni' || name === 'phone') {
                newValue = value.replace(/\D/g, '')
            }

            return {
                ...formData,
                [name]: newValue
            }
        });
    }

    const handleImageChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const file = ev.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setImage(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <>
            <div className="max-w-[800px] mx-auto bg-primary/30 dark:bg-slate-800 rounded-md p-4">
                <p>
                    Llene el formulario para colocar valores en el FUT.
                </p>
                <form>
                    <div className="mt-3 grid grid-cols-12 gap-4">
                        <input
                            name="to"
                            type="text"
                            value={formData.to}
                            onChange={handleInputChange}
                            placeholder="Dirigido a"
                            className="col-span-8"
                        />
                        <input
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="col-span-4"
                        />
                        <input
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Apellidos y nombres"
                            className="col-span-9"
                            autoComplete="off"
                        />
                        <input
                            name="dni"
                            type="text"
                            value={formData.dni}
                            onChange={handleInputChange}
                            placeholder="DNI"
                            className="col-span-3"
                        />
                        <input
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Dirección"
                            className="col-span-9"
                            autoComplete="off"
                        />
                        <input
                            name="phone"
                            type="text"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Teléfono"
                            className="col-span-3"
                            autoComplete="off"
                        />
                        <input
                            name="email"
                            type="text"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Correo electrónico"
                            className="col-span-5"
                            autoComplete="off"
                        />
                        <select name="role" onChange={handleInputChange} value={formData.role} className="col-span-3">
                            <option className="selected hidden">Elija una opción</option>
                            <option value="alumno">Alumno</option>
                            <option value="docente">Docente</option>
                            <option value="administrativo">Administrativo</option>
                        </select>
                        <input
                            name="code"
                            type="text"
                            value={formData.code}
                            onChange={handleInputChange}
                            placeholder="N° Matrícula/Cod. Trabajador"
                            className="col-span-4"
                        />
                        <input
                            name="faculty"
                            type="text"
                            value={formData.faculty}
                            onChange={handleInputChange}
                            placeholder="De la facultad (u oficina) de"
                            className="col-span-12"
                        />
                        <input
                            name="department"
                            type="text"
                            value={formData.department}
                            onChange={handleInputChange}
                            placeholder="Escuela o departamento"
                            className="col-span-7"
                        />
                        <input
                            name="semester"
                            type="text"
                            value={formData.semester}
                            onChange={handleInputChange}
                            placeholder="Ciclo o Año"
                            className="col-span-5"
                        />
                        <textarea
                            name="request"
                            rows={3}
                            value={formData.request}
                            onChange={handleInputChange}
                            placeholder="Objeto de la solicitud"
                            maxLength={200}
                            className="col-span-12"
                        />
                    </div>
                    <div className="flex gap-2 mt-4 justify-center">
                        <label htmlFor="signing" className="my-auto">
                            Firma
                        </label>
                        <input id="signing" type="file" onChange={handleImageChange} />
                    </div>
                </form>
            </div>
            <div className="mt-10">
                Pdf viewer
            </div>
        </>
    );
}

export default FUTForm;