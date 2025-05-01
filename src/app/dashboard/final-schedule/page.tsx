// page.tsx

import React from 'react';
import BreadDash from "@/components/Common/BreadDash";
import DashboardTabs from "@/components/Dashboard/DashboardTabs";
import HorarioVista from "@/components/horariovista";
import RoleGuard from "@/components/RoleGuard/RoleGuard";
import { Metadata } from "next";
import ProtectedRoute from '@/components/Proteccion';

export const metadata: Metadata = {
    title: "Horario Final | Escuela de Informática | UNT",
    description: "Horario de todos los ciclos"
};

const PageFinalSchedulead = () => {
    return (
        <>
        <ProtectedRoute />
        <BreadDash />
        <DashboardTabs />
        <RoleGuard allowedRoles={["admin", "directorD", "directorE", "profeC", "profeN"]} fallback={<p className="text-center my-8">No estás autenticado o no tienes permitido el acceso.</p>}>
            <HorarioVista />
        </RoleGuard>
        </>
    );
};

export default PageFinalSchedulead;
