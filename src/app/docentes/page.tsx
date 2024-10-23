// PANEL DOCENTE EN VISTA DE ADMIN
import DashboardTabs from "@/components/Dashboard/DashboardTabs";
import TeacherList from "@/components/Docentes/TeacherList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gestionar docentes | Escuela de Informática",
    description: "Página de administrador para gestionar docentes."
};

const DocentesPage = () => {
    return (
        <section className="pb-[80px] pt-[120px]">
            <DashboardTabs isAdmin={true}/>
            <TeacherList />
        </section>
    );
}

export default DocentesPage;