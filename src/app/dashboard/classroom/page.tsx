import DashboardTabs from "@/components/Dashboard/DashboardTabs";
import Classrooms from "@/components/Classroom/classroom";
import { Metadata } from "next";
import BreadDash from "@/components/Common/BreadDash";
import ProtectedRoute from "@/components/Proteccion"
import RoleGuard from "@/components/RoleGuard/RoleGuard";


export const metadata: Metadata = {
    title: "Gestionar Aulas | Escuela de Informática | UNT",
    description: "Página de administrador para gestionar aulas."
};

const DocentesPage = () => {
    return (
        <section >
            <ProtectedRoute />
            <BreadDash/>
            <DashboardTabs/>
            <RoleGuard allowedRoles={["admin"]} fallback={<p className="text-center my-8">No estás autenticado o no tienes permitido el acceso.</p>}>
                <Classrooms />
            </RoleGuard>
        </section>
    );
}

export default DocentesPage;