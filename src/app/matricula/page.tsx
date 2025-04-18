import Pasos from "@/components/Instrucciones";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Matrícula | Escuela de Informática",
    description: "Esta es la página de Indicaiones de Matrícula",
    // other metadata
};

const MatriculaPage = () => {
    return (
        <>
        <Breadcrumb
        pageName="Indicaciones Para Matrícula"
        description="Escuela de Informática."
        />
        <Pasos />
        </>
    );
};

export default MatriculaPage;
