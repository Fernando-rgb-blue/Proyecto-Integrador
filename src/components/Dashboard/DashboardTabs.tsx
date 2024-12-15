'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from 'react';
import CerrarSes from '@/components/Dashboard/CerrarSes';

const DashboardTabs = () => {
    const { data: session, status } = useSession();
    const path = usePathname();
    
    // Verificar si el usuario inició sesión con Google
    const isGoogleUser = session?.sub?.startsWith('116341') || (session?.user?.email.includes('unitru.edu.pe') && !session?.user?.role);
    
    const isAdmin2 = session?.user?.role === "admin";
    const isDocente = session?.user?.role === "profeC";
    const isDocenteC = session?.user?.role === "profeN";
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
                            className={`tab-link ${path === '/dashboard/schedule-docentes' ? 'active' : ''}`}
                            href="/dashboard/schedule-docentes"
                        >
                            Ver Horarios
                        </Link>
                    </>
                )}
                {isDocenteC && !isDocente && (
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
                            Registrar mi Horario
                        </Link>
                        <Link
                            className={`tab-link ${path === '/dashboard/schedule-ad' ? 'active' : ''}`}
                            href="/dashboard/schedule-ad"
                        >
                            Horario General
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
                            Registrar mi Horario
                        </Link>
                        <Link
                            className={`tab-link ${path === '/dashboard/schedule-docentes' ? 'active' : ''}`}
                            href="/dashboard/schedule-docentes"
                        >
                            Ver Horarios
                        </Link>
                        <Link
                            className={`tab-link ${path === '/dashboard/schedule-admin' ? 'active' : ''}`}
                            href="/dashboard/schedule-admin"
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
                            Registrar mi Horario
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
                )}{isGoogleUser && (
                    <>
                        <Link
                            className={`tab-link ${path === '/dashboard/schedule-ad' ? 'active' : ''}`}
                            href="/dashboard/schedule-ad"
                        >
                            Horario General
                        </Link>
                        <Link
                            className={`tab-link ${path === '/dashboard/schedule-admin-teacher' ? 'active' : ''}`}
                            href="/dashboard/schedule-admin-teacher"
                        >
                            Horario por Docente
                        </Link>
                        <Link
                            className={`tab-link ${path === '/dashboard/schedule-admin-classroom' ? 'active' : ''}`}
                            href="/dashboard/schedule-admin-classroom"
                        >
                            Horario por Aula
                        </Link>
                    </>
                )}
                <a onClick={handleCerrarSesion} style={{ cursor: 'pointer' }}
                    className='bg-primary/70 text-white rounded-full py-2 px-4 font-semibold duration-300 ease-in-out text-base'>
                    Cerrar Sesión
                </a>
                {mostrarCerrarSes && <CerrarSes onClose={() => setMostrarCerrarSes(false)} />}
            </div>
        </>
    );
};

export default DashboardTabs;
