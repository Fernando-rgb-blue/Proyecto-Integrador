import ScheduleTable from "@/components/Schedule/schedule";
import ProtectedRoute from "@/components/Proteccion"
import BreadDash from "@/components/Common/BreadDash";
import DashboardTabs from "@/components/Dashboard/DashboardTabs";
import RoleGuard from "@/components/RoleGuard/RoleGuard";

function SchedulePage() {
  return (
    <div>
      
      <ProtectedRoute />
      {/* pa lo del name del usuario*/}
      <BreadDash/>
      <DashboardTabs/>
      <RoleGuard allowedRoles={["admin", "directorE", "directorD"]} fallback={<p className="text-center my-8">No estás autenticado o no tienes permitido el acceso.</p>}>
        <ScheduleTable />
      </RoleGuard>
    </div>
  );
}

export default SchedulePage;
