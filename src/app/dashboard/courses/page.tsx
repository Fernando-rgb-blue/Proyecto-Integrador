// ADMINISTRAR CURSOS EN VISTA DE ADMIN
import DashboardTabs from "@/components/Dashboard/DashboardTabs";
import Courses from "@/components/CoursesList/index";
import { Metadata } from "next";
import BreadDash from "@/components/Common/BreadDash";
import ProtectedRoute from "@/components/Proteccion"

export const metadata: Metadata = {
    title: "Gestionar Cursos | Escuela de Informática",
    description: "Página de administrador para gestionar Cursos."
};

const DocentesPage = () => {
    return (
        <section >
            <ProtectedRoute />
            <BreadDash/>
            <DashboardTabs/>
            <Courses />
        </section>
    );
}

export default DocentesPage;