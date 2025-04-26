import BreadDash from "@/components/Common/BreadDash"
import DashboardTabs from "@/components/Dashboard/DashboardTabs"
import ProtectedRoute from "@/components/Proteccion"
import RoleGuard from "@/components/RoleGuard/RoleGuard"
import ScheduleTableClassroom from "@/components/Schedule/ScheduleTableClassroom"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Horario por Aula | Escuela de Informática | UNT",
  description: "Página para mostrar los horarios filtrados por aula."
};

const ScheduleAdminClassroom = () => {
  return (
    <>
      <ProtectedRoute />
      <BreadDash />
      <DashboardTabs />
      <ScheduleTableClassroom />
    </>
  )
}

export default ScheduleAdminClassroom;