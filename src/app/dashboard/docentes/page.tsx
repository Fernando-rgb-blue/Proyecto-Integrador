// PANEL DOCENTE EN VISTA DE ADMIN
import DashboardTabs from "@/components/Dashboard/DashboardTabs";
import TeacherList from "@/components/Docentes/TeacherList";
import { Metadata } from "next";
import BreadDash from "@/components/Common/BreadDash";
import ProtectedRoute from "@/components/Proteccion"
import RoleGuard from "@/components/RoleGuard/RoleGuard";

export const metadata: Metadata = {
    title: "Gestionar docentes | Escuela de Informática | UNT",
    description: "Página de administrador para gestionar docentes."
};

const DocentesPage = () => {
    return (
        <section >
            <ProtectedRoute />
            <BreadDash/>
            <DashboardTabs/>
            <RoleGuard allowedRoles={["admin", "directorD"]} fallback={<p className="text-center my-8">No estás autenticado o no tienes permitido el acceso.</p>}>
                <TeacherList />
            </RoleGuard>
        </section>
    );
}

export default DocentesPage;