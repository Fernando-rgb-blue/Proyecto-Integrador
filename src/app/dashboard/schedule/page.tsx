import ScheduleTable from "@/components/Schedule/schedule";
import ProtectedRoute from "@/components/Proteccion"
import BreadDash from "@/components/Common/BreadDash";
import DashboardTabs from "@/components/Dashboard/DashboardTabs";

function SchedulePage() {
  return (
    <div>
      
      <ProtectedRoute />
      {/* pa lo del name del usuario*/}
      <BreadDash/>
      <DashboardTabs/>
      <ScheduleTable />
    </div>
  );
}

export default SchedulePage;
