'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

import { useState } from 'react';
import CerrarSes from '@/components/Dashboard/CerrarSes';

const DashboardTabs = () => {
    const { data: session, status } = useSession();
    const path = usePathname();
    const isAdmin2 = session?.user?.role === "admin";
    const isDocente = session?.user?.role === "profesor";
    const isDirectorE = session?.user?.role === "directorE";
    const isDirectorD = session?.user?.role === "directorD";

    const [mostrarCerrarSes, setMostrarCerrarSes] = useState(false);

    const handleCerrarSesion = () => {
        setMostrarCerrarSes(true);
    };

    return (
        <>
        <div className="flex flex-wrap items-center justify-center gap-4 p-4">
            {isAdmin2 && (
            <>
                <Link
                    className={`tab-link ${path === '/dashboard/profile' ? 'active' : ''}`}
                    href="/dashboard/profile"
                >
                    Perfil
                </Link>
                <Link
                    className={`tab-link ${path === '/dashboard/docentes' ? 'active' : ''}`}
                    href="/dashboard/docentes"
                >
                    Docentes
                </Link>
                <Link
                    className={`tab-link ${path === '/dashboard/courses' ? 'active' : ''}`}
                    href="/dashboard/courses"
                >
                    Cursos
                </Link>
                <Link
                    className={`tab-link ${path === '/dashboard/classroom' ? 'active' : ''}`}
                    href="/dashboard/classroom"
                >
                    Aulas
                </Link>
                <Link
                    className={`tab-link ${path === '/dashboard/schedule' ? 'active' : ''}`}
                    href="/dashboard/schedule"
                >
                    Ver Horarios
                </Link>
            </>
            )}
            {isDocente && (
            <>
                <Link
                    className={`tab-link ${path === '/dashboard/profile' ? 'active' : ''}`}
                    href="/dashboard/profile"
                >
                    Perfil
                </Link>
                <Link
                    className={`tab-link ${path === '/dashboard/schedule' ? 'active' : ''}`}
                    href="/dashboard/schedule"
                >
                    Registrar Horario
                </Link>
            </>
            )}
            {isDirectorE && (
            <>
                <Link
                    className={`tab-link ${path === '/dashboard/profile' ? 'active' : ''}`}
                    href="/dashboard/profile"
                >
                    Perfil
                </Link>
                <Link
                    className={`tab-link ${path === '/dashboard/schedule' ? 'active' : ''}`}
                    href="/dashboard/schedule"
                >
                    Registrar Horario
                </Link>
                <Link
                    className={`tab-link ${path === '/dashboard/schedule' ? 'active' : ''}`}
                    href="/dashboard/schedule"
                >
                    Ver Horarios
                </Link>
                <Link
                    className={`tab-link ${path === '/dashboard/schedule' ? 'active' : ''}`}
                    href="/dashboard/schedule"
                >
                    Horario General
                </Link>
            </>
            )}
            {isDirectorD && (
            <>
                <Link
                    className={`tab-link ${path === '/dashboard/profile' ? 'active' : ''}`}
                    href="/dashboard/profile"
                >
                    Perfil
                </Link>
                <Link
                    className={`tab-link ${path === '/dashboard/schedule' ? 'active' : ''}`}
                    href="/dashboard/schedule"
                >
                    Registrar Horario
                </Link>
                <Link
                    className={`tab-link ${path === '/dashboard/docentes' ? 'active' : ''}`}
                    href="/dashboard/docentes"
                >
                    Docentes
                </Link>
                <Link
                    className={`tab-link ${path === '/dashboard/asigdocentes' ? 'active' : ''}`}
                    href="/dashboard/asigdocentes"
                >
                    Asignar Cursos
                </Link>
            </>
            )}
            <a onClick={handleCerrarSesion} style={{ cursor: 'pointer'}}
                className='bg-primary/70 text-white rounded-full py-2 px-4 font-semibold duration-300 ease-in-out text-base'>
                Cerrar Sesión
            </a>
            {mostrarCerrarSes && <CerrarSes onClose={() => setMostrarCerrarSes(false)} />}


        </div>

        </>
    );
};

export default DashboardTabs;    