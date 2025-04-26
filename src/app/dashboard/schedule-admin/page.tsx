import BreadDash from "@/components/Common/BreadDash"
import DashboardTabs from "@/components/Dashboard/DashboardTabs"
import ProtectedRoute from "@/components/Proteccion"
import RoleGuard from "@/components/RoleGuard/RoleGuard"
import ScheduleTableAdmin from "@/components/Schedule/ScheduleTableAdmin"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Administración del horario general | Escuela de Informática | UNT",
  description: "Página para editar el horario general."
};

const ScheduleAdmin = () => {
  return (
    <>
      <ProtectedRoute />
      <BreadDash />
      <DashboardTabs />
      <RoleGuard allowedRoles={["admin", "directorE"]} fallback={<p className="text-center my-8">No estás autenticado o no tienes permitido el acceso.</p>}>
        <ScheduleTableAdmin />
      </RoleGuard>
    </>
  )
}

export default ScheduleAdmin;