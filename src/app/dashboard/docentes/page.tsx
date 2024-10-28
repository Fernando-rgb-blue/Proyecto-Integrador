// PANEL DOCENTE EN VISTA DE ADMIN
import DashboardTabs from "@/components/Dashboard/DashboardTabs";
import TeacherList from "@/components/Docentes/TeacherList";
import { Metadata } from "next";
import BreadDash from "@/components/Common/BreadDash";

export const metadata: Metadata = {
    title: "Gestionar docentes | Escuela de Informática",
    description: "Página de administrador para gestionar docentes."
};

const DocentesPage = () => {
    return (
        <section >
            <BreadDash/>
            <DashboardTabs/>
            <TeacherList />
        </section>
    );
}

export default DocentesPage;