// page.tsx

import React from 'react';
import BreadDash from "@/components/Common/BreadDash";
import DashboardTabs from "@/components/Dashboard/DashboardTabs";
import HorarioVista from "@/components/horariovista";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Horario General | Escuela de Informática",
    description: "Horario de todos los ciclos"
};

const PageSchedulead = () => {
  return (
    <>
      <BreadDash />
      <DashboardTabs />
      <HorarioVista />
    </>
  );
};

export default PageSchedulead;
