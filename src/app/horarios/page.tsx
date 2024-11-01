import Breadcrumb from "@/components/Common/Breadcrumb";
import VistaHorarios from "@/components/VistaHorarios/VistaHorarios";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Horarios | Escuela de Informática",
    description: "Horarios correspondientes al periodo actual"
};

const HorariosPage = () => {
    return (
        <>
        <Breadcrumb
            pageName="Horarios"
            description="Elija el horario correspondiente por Ciclo, Docente o Aula" />
        <VistaHorarios />
        </>
    );
}

export default HorariosPage;