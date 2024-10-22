"use client";
import React from "react";

const Documentos = () => {
    const documentos = [
        {
        nombre: "Cuestionario de Autoestudio ICACIT-Computación-Ciclo 2020",
        link: "https://drive.google.com/file/d/1FM9cBsLAX3RtnjLS4SIa5DLjACkkpo3Z/view",
        },
        {
        nombre: "Criterios ICACIT - Computación - Ciclo 2020",
        link: "https://drive.google.com/file/d/15WXB0N8DqNvYl1dcxT0h5szKK07J6MBa/view",
        },
        {
        nombre: "Resolución de Decanato Nº 162-2020/FCFYM-Dec., Comité de Seguimiento del Egresado del Programa de Informática de la UNT",
        link: "https://drive.google.com/file/d/1dzZbxH1rvI0g9FAr1-6aKz0pn4OAKxtI/view",
        },
        {
        nombre: "Resolución de Decanato Nº 165-2020/FCFYM-Dec., Comité Consultivo del Programa de Informática de la UNT",
        link: "https://drive.google.com/file/d/1ssuDmhs6pJML924yFCEH7tTdQMH5m8GK/view",
        },
        {
        nombre: "Resolución Rectoral Nº 095-2022-UNT, Recomposición del Comité de Calidad del Programa de Informática UNT",
        link: "https://drive.google.com/file/d/1VLR5w1rITSylHVrYsTMruIKc0jnzFJkF/view",
        },
    ];

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-lg space-y-4">
                {documentos.map((doc, index) => (
                <a
                    key={index}
                    href={doc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button className="w-full bg-primary mb-6 text-white py-3 px-4 rounded-lg shadow-md hover:bg-dark transition-colors text-center">
                    {doc.nombre}
                    </button>
                </a>
                ))}
            </div>
        </div>
    );
};

export default Documentos;