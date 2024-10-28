import UserProfile from '@/components/Profile/UserProfile';
import DashboardTabs from "@/components/Dashboard/DashboardTabs";
import BreadDash from "@/components/Common/BreadDash";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Perfil | Escuela de Informática",
  description: "Página para el perfil de usuario."
};

function ProfilePage() {
  return (

    <section>
      {/* pa lo del name del usuario*/}
      <BreadDash/>

      {/* pa que aparescan las opciones de perfil, docente, etc */}
      <DashboardTabs/> 

      {/* pa lo de cambiar contraseña (perfil)*/}
      <UserProfile />
    </section>

  );
}

export default ProfilePage;
