import UserProfile from '@/components/Profile/UserProfile';
import DashboardTabs from "@/components/Dashboard/DashboardTabs";
import BreadDash from "@/components/Common/BreadDash";
import ProtectedRoute from "@/components/Proteccion"
import { Metadata } from 'next';
import RoleGuard from "@/components/RoleGuard/RoleGuard";
export const metadata: Metadata = {
  title: "Perfil | Escuela de Informática | UNT",
  description: "Página para el perfil de usuario."
};

const ProfilePage = () => {
  return (

    <section>
      <ProtectedRoute />
      {/* pa lo del name del usuario*/}
      <BreadDash/>

      {/* pa que aparescan las opciones de perfil, docente, etc */}
      <DashboardTabs/> 
      <RoleGuard allowedRoles={["admin", "directorD", "directorE", "profeC", "profeN"]} fallback={<p className="text-center my-8">No estás autenticado o no tienes permitido el acceso.</p>}>
        {/* pa lo de cambiar contraseña (perfil)*/}
        <UserProfile />
      </RoleGuard>
      
    </section>

  );
}

export default ProfilePage;
