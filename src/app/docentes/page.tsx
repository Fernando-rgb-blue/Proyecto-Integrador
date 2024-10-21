import DashboardTabs from "@/components/Dashboard/DashboardTabs";
import TeacherList from "@/components/Docentes/TeacherList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gestionar docentes | Escuela de Informática",
    description: "Página de administrador para gestionar docentes."
};

const DocentesPage = () => {
    return (
        <section className="mt-36 mb-10 max-w-3xl mx-auto">
            <DashboardTabs isAdmin={true}/>
            <TeacherList />
        </section>
    );
}

export default DocentesPage;