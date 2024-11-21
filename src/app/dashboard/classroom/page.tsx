import DashboardTabs from "@/components/Dashboard/DashboardTabs";
import Classrooms from "@/components/Classroom/classroom";
import { Metadata } from "next";
import BreadDash from "@/components/Common/BreadDash";

export const metadata: Metadata = {
    title: "Gestionar Aulas | Escuela de Informática",
    description: "Página de administrador para gestionar aulas."
};

const DocentesPage = () => {
    return (
        <section >
            <BreadDash/>
            <DashboardTabs/>
            <Classrooms />
        </section>
    );
}

export default DocentesPage;