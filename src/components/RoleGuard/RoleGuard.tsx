'use client';
import { useSession } from "next-auth/react";

type Role = "profeC" | "profeN" | "admin" | "directorE" | "directorD";

interface RoleGuardProps {
    allowedRoles: Role[];
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

const RoleGuard = ({ allowedRoles, children, fallback = null }: RoleGuardProps) => {
    const { data: session, status } = useSession();

    if (status === 'loading') return null;
    if (!session || !session.user || !allowedRoles.includes(session?.user?.role as Role)) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}

export default RoleGuard;