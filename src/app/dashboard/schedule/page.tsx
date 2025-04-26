import ScheduleTable from "@/components/Schedule/schedule";
import ProtectedRoute from "@/components/Proteccion"
import BreadDash from "@/components/Common/BreadDash";
import DashboardTabs from "@/components/Dashboard/DashboardTabs";
import RoleGuard from "@/components/RoleGuard/RoleGuard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrar mi Horario | Escuela de Informática | UNT",
  description: "Página para registrar el horario de disponibilidad propio de cada profesor."
};

function SchedulePage() {
  return (
    <>
      <ProtectedRoute />
      {/* pa lo del name del usuario*/}
      <BreadDash/>
      <DashboardTabs/>
      <RoleGuard allowedRoles={["admin", "directorE", "directorD", "profeC", "profeN"]} fallback={<p className="text-center my-8">No estás autenticado o no tienes permitido el acceso.</p>}>
        <ScheduleTable />
      </RoleGuard>
    </>
  );
}

export default SchedulePage;
