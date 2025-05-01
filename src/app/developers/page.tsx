
// pages/index.tsx
import dynamic from 'next/dynamic';
import React from 'react';
import Team from '@/components/Mask';
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developers | Escuela de Informática | UNT",
  description: "Esta es la página de los nombres de los creadores de la página web",
  keywords: [
    'Alfato Titto Anthony Fernando',
    'Gonzales Matos Walter Manuel',
    'Urcia Peláez Luis Alexander',
    'Developers informática',
],
};



const Pruebapage: React.FC = () => (
    <>

    <section className="pb-20 pt-10 bg-gray-50 dark:bg-gray-900">
    <Breadcrumb
        pageName="Developers"
        description="Equipo que desarrolló la página"
      />
        <Team/>

    </section>
    
    </>
  
);

export default Pruebapage;
