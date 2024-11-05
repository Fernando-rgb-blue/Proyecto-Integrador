'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from "next-auth/react";

interface CerrarSesProps {
    onClose: () => void;
}

const CerrarSes: React.FC<CerrarSesProps> = ({ onClose }) => {
    const [show, setShow] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Bloquear scroll al abrir el modal
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Limpiar el estilo de overflow al desmontar el componente
        return () => {
            document.body.style.overflow = '';
        };
    }, [show]);

    const handleCancel = () => {
        setShow(false);
        onClose(); // Llamar a la función de callback para actualizar el estado en DashboardTabs
    };

    const handleOutsideClick = (e: React.MouseEvent) => {
        // Verifica si el clic es fuera del contenido del modal
        if (e.target === e.currentTarget) {
            handleCancel();
        }
    };

    if (!show) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50"
            onClick={handleOutsideClick}
        >
            <div className="bg-white dark:bg-dark p-6 rounded-lg shadow-lg text-center w-72">
                <style>
                    {`
                        @keyframes drawCircle {
                            from { stroke-dashoffset: 138; }
                            to { stroke-dashoffset: 0; }
                        }
                    `}
                </style>
                <div className="relative w-12 h-12 mx-auto mb-5 flex justify-center items-center">
                    <svg
                        className="mx-auto mb-4"
                        width="50"
                        height="50"
                        viewBox="0 0 50 50"
                    >
                        <circle
                            cx="25"
                            cy="25"
                            r="22"
                            fill="none"
                            stroke="red"
                            strokeWidth="4"
                            strokeDasharray="138"
                            strokeDashoffset="138"
                            style={{ animation: "drawCircle 1s forwards" }}
                        />
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dy=".3em"
                            fontSize="24"
                            fill="red"
                        >
                            !
                        </text>
                    </svg>
                </div>
                <h2 className="text-lg font-semibold mb-4">¿Desea cerrar sesión?</h2>
                <div className="flex justify-between">
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                        onClick={handleCancel}
                    >
                        Cancelar
                    </button>
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        onClick={() => signOut()}
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CerrarSes;