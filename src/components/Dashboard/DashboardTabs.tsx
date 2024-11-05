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
                className={`${path === '/dashboard/profile' 
                    ? 'bg-primary text-white rounded-full py-2 px-4 font-semibold duration-300 ease-in-out text-base' 
                    : 'bg-primary/70 hover:bg-primary/90 text-white rounded-full py-2 px-4 font-semibold duration-300 ease-in-out text-base'}`} 
                href={'/dashboard/profile'}>
                Perfil
                </Link>
                <Link
                className={`${path === '/dashboard/docentes' 
                    ? 'bg-primary text-white rounded-full py-2 px-4 font-semibold duration-300 ease-in-out text-base' 
                    : 'bg-primary/70 hover:bg-primary/90 text-white rounded-full py-2 px-4 font-semibold duration-300 ease-in-out text-base'}`} 
                href={'/dashboard/docentes'}>
                Docentes
                </Link>
                <Link 
                className={`${path === '/dashboard/courses' 
                    ? 'bg-primary text-white rounded-full py-2 px-4 font-semibold duration-300 ease-in-out text-base' 
                    : 'bg-primary/70 hover:bg-primary/90 text-white rounded-full py-2 px-4 font-semibold duration-300 ease-in-out text-base'}`} 
                href={'/dashboard/courses'}>
                Cursos
                </Link>
                <Link
                className={`${path === '/dashboard/schedule' 
                    ? 'bg-primary text-white rounded-full py-2 px-4 font-semibold duration-300 ease-in-out text-base' 
                    : 'bg-primary/70 hover:bg-primary/90 text-white rounded-full py-2 px-4 font-semibold duration-300 ease-in-out text-base'}`} 
                href={'/dashboard/schedule'}>
                Ver Horarios
                </Link>
            </>
            )}
            {isDocente && (
            <>
                <Link 
                className={`${path === '/dashboard/profile' 
                    ? 'bg-primary text-white rounded-full py-2 px-4 font-semibold duration-300 ease-in-out text-base' 
                    : 'bg-primary/70 hover:bg-primary/90 text-white rounded-full py-2 px-4 font-semibold duration-300 ease-in-out text-base'}`} 
                href={'/dashboard/profile'}>
                    Perfil
                </Link>
                <Link
                className={`${path === '/dashboard/schedule' 
                    ? 'bg-primary text-white rounded-full py-2 px-4 font-semibold duration-300 ease-in-out text-base' 
                    : 'bg-primary/70 hover:bg-primary/90 text-white rounded-full py-2 px-4 font-semibold duration-300 ease-in-out text-base'}`} 
                href={'/dashboard/schedule'}>
                    Registrar Horario
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