import Breadcrumb from "@/components/Common/Breadcrumb";
import CurriculosSVG from "@/components/Curriculos/CurriculosSVG";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Currícula | Escuela de Informática",
    description: "Esta es la página de Nosotros",
  };

const CurriculosPage = () => {
    return (
        <>
            <Breadcrumb
            pageName="Currícula actual (2017)"
            description="ya aquí ponen algo decente ekis de"
            />
            <div className="flex justify-between items-center max-w-6xl mx-auto px-[1rem]">
                <Link
                    href={"https://drive.google.com/file/d/1Aasz5wfCK_X1PfbDB1_jbDO71ruv_wVZ/view?usp=sharing"}
                    className="bg-primary p-2 text-white rounded-sm font-semibold duration-300 ease-in-out hover:bg-primary/80"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Descarga el plan de estudios 2017
                </Link>
                <Link
                    href={"/curriculos-97"}
                    className="underline text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                >
                    Ver currícula antigua (1997)
                </Link>
            </div>
            <p className="max-w-7xl mx-auto mt-5">
                Haga clic en un recuadro para activar un curso.
            </p>
            <CurriculosSVG />
        </>
    );
}

export default CurriculosPage;