import Breadcrumb from "@/components/Common/Breadcrumb";
import CurriculosSVG from "@/components/Curriculos/CurriculosSVG";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Currícula | Escuela de Informática",
    description: "La malla curricular de la escuela de informática UNT.",
};

const CurriculosPage = () => {
    return (
        <>
            <Breadcrumb
            pageName="Currícula actual (2018)"
            description="Una vista interactiva de la malla curricular vigente en la escuela de informática. Selecciona un 
            curso para activarlo. Si ese curso abre otro, se volverá disponible. Para activar todos los cursos disponibles 
            de un ciclo, selecciona el número del ciclo a la izquierda."
            />
            <div className="flex justify-between items-center max-w-6xl mx-auto px-[1rem] mt-10 lg:mt-0 mb-5">
                <Link
                    href={"https://drive.google.com/file/d/1Aasz5wfCK_X1PfbDB1_jbDO71ruv_wVZ/view?usp=sharing"}
                    className="bg-primary p-2 text-white rounded-sm font-semibold duration-300 ease-in-out hover:bg-primary/80"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Descarga el plan de estudios 2018
                </Link>
                <Link
                    href={"/curriculos-97"}
                    className="underline text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                >
                    Ver currícula antigua (1997)
                </Link>
            </div>
            <CurriculosSVG />
        </>
    );
}

export default CurriculosPage;