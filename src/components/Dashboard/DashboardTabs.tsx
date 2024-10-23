'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

const DashboardTabs = ({isAdmin}: {isAdmin: boolean}) => {
    const { data: session, status } = useSession();
    const path = usePathname();

    /*if (status !== 'authenticated') {
        return redirect('/signin');
    }*/

    return (
        <>
            <div className="flex justify-center tabs gap-4">
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
            </div>
            <p className="mt-8">
                Status: {status}
            </p>
        </>
    );
}

export default DashboardTabs;