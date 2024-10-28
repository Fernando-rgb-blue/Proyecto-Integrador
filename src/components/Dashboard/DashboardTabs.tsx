'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";



const DashboardTabs = () => {
    const { data: session, status } = useSession();
    const path = usePathname();
    const isAdmin2 = session?.user?.role === "admin";
    const isDocente = session?.user?.role === "profesor";
    return (
        <>
        <div className="flex flex-wrap items-center justify-center tabs gap-4 p-4">
            {isAdmin2 && (
            <>
                <Link className={path === '/dashboard/profile' ? 'active' : ''} href={'/dashboard/profile'}>
                Perfil
                </Link>
                <Link className={path === '/dashboard/docentes' ? 'active' : ''} href={'/dashboard/docentes'}>
                Docentes
                </Link>
                <Link href="/dashboard/courses">
                Cursos
                </Link>
                <Link href="/dashboard/schedule">
                Ver Horarios
                </Link>
            </>
            )}
            {isDocente && (
            <>
                <Link className={path === '/dashboard/profile' ? 'active' : ''} href={'/dashboard/profile'}>
                    Perfil
                </Link>
                <Link className={path === '/dashboard/schedule' ? 'active' : ''} href={'/dashboard/schedule'}>
                    Registrar Horario
                </Link>
            </>
            )}
            <button
            onClick={() => signOut()}
            className="bg-gray-800 text-white py-2 px-4 rounded"
            >
            Cerrar Sesión
            </button>
        </div>
        
        {/* este era el de manu */}
        {/* <div className="flex flex-wrap items-center justify-center tabs gap-4 p-4">
            <Link className={path === '/perfil' ? 'active' : ''} href={'/perfil'}>
                Perfil
            </Link>
            {session && !isAdmin &&
                <>
                    <Link className={path === '/' ? 'active' : ''} href={'/'}>
                        Registrar horario
                    </Link>
                </>
            }
            {isAdmin &&
                <>
                    <Link className={path === '/docentes' ? 'active' : ''} href={'/docentes'}>
                        Docentes
                    </Link>
                    <Link className={path === '/' ? 'active' : ''} href={'#'}>
                        Cursos
                    </Link>
                    <Link className={path === '/' ? 'active' : ''} href={'#'}>
                        Ver horarios
                    </Link>
                </>
            }
            <button onClick={() => {signOut({callbackUrl: '/', redirect: true})}}>
                Cerrar sesión
            </button>
        </div> */}

        {/* <p className="mt-8">
            Status: {status}
        </p> */}
        </>
    );
};

export default DashboardTabs;