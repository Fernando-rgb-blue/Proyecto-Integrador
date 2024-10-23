'use client';
import { Teacher } from "@/types/teacher";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
                <ul className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
                    {docentes.map(docente => (
                        <li key={docente._id} className="flex  my-10 md:my-0 items-center w-full">
                            <div className="w-3/12">
                                <Image src={docente.image} width={200} height={200} sizes="100vw"
                                style={{ width: '100px', height: '150px', objectFit: 'cover' }} priority={true} alt="Foto del docente" />
                            </div>
                            <div className="w-9/12 ml-3 flex flex-col justify-center gap-y-2">
                                <h4 className="font-bold mb-2">
                                    {docente.name}
                                </h4>
                                <div className="flex text-sm">
                                    <p>
                                        <span className="font-semibold">Correo: </span>
                                        <Link href={"mailto:" + docente.email}
                                        className="underline duration-300 hover:text-primary">
                                            {docente.email}
                                        </Link>
                                    </p>
                                </div>
                                <div className="flex text-sm">
                                    <p>
                                        <span className="font-semibold">Oficina: </span>{docente.office}
                                    </p>
                                </div>
                                <div className="flex text-left text-sm">
                                    <p>
                                        <span className="font-semibold">Áreas de investigación: </span>{docente.areas}
                                    </p>
                                </div>
                            </div>
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