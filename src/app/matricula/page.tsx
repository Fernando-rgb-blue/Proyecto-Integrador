
import Image from "next/image";
import Pasos from "@/components/Instrucciones";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Escuela de Informática | Instrucciones Matrícula",
    description: "Esta es la página de Instrucciones de Matrícula",
    // other metadata
};

const MatriculaPage = () => {
    return (
        <>
        <Pasos />
        </>
    );
};

export default MatriculaPage;
