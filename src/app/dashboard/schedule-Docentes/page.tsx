// ADMINISTRAR CURSOS EN VISTA DE ADMIN
import DashboardTabs from "@/components/Dashboard/DashboardTabs";
import DisDos from "@/components/dispoDocentes/disDos";
import { Metadata } from "next";
import BreadDash from "@/components/Common/BreadDash";

export const metadata: Metadata = {
    title: "Disponibilidad Docentes | Escuela de Informática",
    description: "Página de disponibilidad horario de todos los docentes"
};

const DisDocentesPage = () => {
    return (
        <section >
            <BreadDash/>
            <DashboardTabs/>
            <DisDos />
        </section>
    );
}

export default DisDocentesPage;