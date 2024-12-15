'use client';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'loading') {
            // Mientras se carga la sesión, no hacer nada
            return;
        }

        // Verifica si el usuario está logueado con Google
        const isGoogleUser = session?.sub?.startsWith('116341') || (session?.user?.email.includes('unitru.edu.pe') && !session?.user?.role);
        
        // Rutas restringidas para usuarios de Google
        const restrictedPaths = ['/dashboard/schedule-admin', '/dashboard/asigdocentes', '/dashboard/profile', '/dashboard/schedule-docentes', '/dashboard/docentes', '/dashboard/courses', '/dashboard/classroom', '/dashboard/schedule'];
        
        // Si el usuario de Google trata de acceder a una ruta restringida, redirígelo
        if (isGoogleUser && restrictedPaths.includes(window.location.pathname)) {
            router.push('/dashboard/schedule-ad');
        } else {
            // Si no está en una ruta restringida, establece el estado de carga a falso
            setLoading(false);
        }
    }, [session, status, router]);

    if (loading) {
        // Mostrar un componente de carga o simplemente no renderizar nada
        return null;
    }

    return null;
};

export default ProtectedRoute;
