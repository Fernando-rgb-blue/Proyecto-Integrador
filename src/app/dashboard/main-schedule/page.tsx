// page.tsx

import React from 'react';
import BreadDash from "@/components/Common/BreadDash";
import DashboardTabs from "@/components/Dashboard/DashboardTabs";
import HorarioVista from "@/components/horariovista";

import { Metadata } from "next";
import ProtectedRoute from '@/components/Proteccion';

export const metadata: Metadata = {
    title: "Horario General | Escuela de Informática | UNT",
    description: "Horario de todos los ciclos"
};

const PageSchedulead = () => {
  return (
    <>
      <ProtectedRoute />
      <BreadDash />
      <DashboardTabs />
      <HorarioVista />
    </>
  );
};

export default PageSchedulead;
