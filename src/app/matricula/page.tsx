import Pasos from "@/components/Instrucciones";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Escuela de Informática | Instrucciones Matrícula",
    description: "Esta es la página de Instrucciones de Matrícula",
    // other metadata
};

const MatriculaPage = () => {
    return (
        <>
        <Breadcrumb
        pageName="Instrucciones Para Matrícula"
        description="Escuela de Informática."
        />
        <Pasos />
        </>
    );
};

export default MatriculaPage;
