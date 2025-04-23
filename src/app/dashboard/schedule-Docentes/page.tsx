// ADMINISTRAR CURSOS EN VISTA DE ADMIN
import DashboardTabs from "@/components/Dashboard/DashboardTabs";
import DisDos from "@/components/dispoDocentes/disDos";
import { Metadata } from "next";
import BreadDash from "@/components/Common/BreadDash";
import ProtectedRoute from "@/components/Proteccion"
import RoleGuard from "@/components/RoleGuard/RoleGuard";

export const metadata: Metadata = {
    title: "Disponibilidad Docentes | Escuela de Informática",
    description: "Página de disponibilidad horario de todos los docentes"
};

const DisDocentesPage = () => {
    return (
        <section >
            <ProtectedRoute />
            <BreadDash/>
            <DashboardTabs/>
            <RoleGuard allowedRoles={["admin", "directorE"]} fallback={<p className="text-center my-8">No estás autenticado o no tienes permitido el acceso.</p>}>
                <DisDos />
            </RoleGuard>
        </section>
    );
}

export default DisDocentesPage;