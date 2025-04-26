// ADMINISTRAR CURSOS EN VISTA DE ADMIN
import DashboardTabs from "@/components/Dashboard/DashboardTabs";
import Courses from "@/components/CoursesList/index";
import { Metadata } from "next";
import BreadDash from "@/components/Common/BreadDash";
import ProtectedRoute from "@/components/Proteccion";
import RoleGuard from "@/components/RoleGuard/RoleGuard";

export const metadata: Metadata = {
    title: "Gestionar Cursos | Escuela de Informática | UNT",
    description: "Página de administrador para gestionar Cursos."
};

const DocentesPage = () => {
    return (
        <section >
            <ProtectedRoute />
            <BreadDash/>
            <DashboardTabs/>
            <RoleGuard allowedRoles={["admin"]} fallback={<p className="text-center my-8">No estás autenticado o no tienes permitido el acceso.</p>}>
                <Courses />
            </RoleGuard>
        </section>
    );
}

export default DocentesPage;