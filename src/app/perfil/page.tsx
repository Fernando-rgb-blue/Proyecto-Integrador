import DashboardTabs from "@/components/Dashboard/DashboardTabs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Perfil | Escuela de Informática",
    description: "Página para usuarios que iniciaron sesión."
};

const PerfilPage = () => {
    return (
        <section className="mt-36 max-w-3xl mx-auto">
            <DashboardTabs isAdmin={true}/>
        </section>
    );
}

export default PerfilPage