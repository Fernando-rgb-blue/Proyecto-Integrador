import Breadcrumb from "@/components/Common/Breadcrumb";

import PerfilE from "@/components/PerfilEgresado";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perfil del Egresado | Escuela de Informática | UNT",
  description: "Esta es la página de Perfil del Egresado",
  // other metadata
};

const PerfilEgresadoPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Perfil del Egresado"
        description="Son las capacidades, los conocimientos y habilidades que debe haber adquirido el alumnado al finalizar la titulación."
      />
      
      <PerfilE/>
    </>
  );
};

export default PerfilEgresadoPage;
