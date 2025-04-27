import CoursesList from "@/components/AsignarCursos/CoursesList";
import BreadDash from "@/components/Common/BreadDash";
import DashboardTabs from "@/components/Dashboard/DashboardTabs";
import ProtectedRoute from "@/components/Proteccion";
import RoleGuard from "@/components/RoleGuard/RoleGuard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asignar cursos | Escuela de Informática | UNT",
  description: "Página para asignar los cursos que dictarán los profesores."
};

function AsignarDocentes() {
  return (
    <div>
      <ProtectedRoute />
      <BreadDash />
      <DashboardTabs />
      <RoleGuard allowedRoles={["admin", "directorD"]} fallback={<p className="text-center my-8">No estás autenticado o no tienes permitido el acceso.</p>}>
        <CoursesList />
      </RoleGuard>
    </div>
  )
}

export default AsignarDocentes;