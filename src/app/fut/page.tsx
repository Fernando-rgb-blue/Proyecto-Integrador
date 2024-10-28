import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "FUT | Escuela de Informática",
    description: "Un formulario para editar y descargar el Formato Único de Trámite."
};

const FUTPage = () => {
    return (
        <Breadcrumb
            pageName="Formato Único de Trámite"
            description="Este formulario te permite editar y descargar el Formato Único de Trámite para el fin que se desee." />
    );
}

export default FUTPage;