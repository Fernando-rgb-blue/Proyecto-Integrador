import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Currícula antigua | Escuela de Informática",
    description: "La malla curricular antigua de la escuela de informática UNT.",
};

const Curriculos97Page = () => {
    return (
        <>
            <Breadcrumb
            pageName="Currícula antigua (1997)"
            description="El plan de estudios de 1997, que determinaba los cursos dictados en la carrera de informática, hasta el año 2018."
            />
            <div className="flex justify-between items-center max-w-6xl mx-auto px-[1rem] mt-10 lg:mt-0 mb-5">
                <Link
                    href={"https://drive.google.com/file/d/1Vp56z5nNy97KjNCPz2nsf3mQxu0Kjz3Y/view?usp=sharing"}
                    className="bg-primary p-2 text-white rounded-sm font-semibold duration-300 ease-in-out hover:bg-primary/80 mr-4"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Descarga el plan de estudios 1997
                </Link>
                <Link
                    href={"/curriculos"}
                    className="underline text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                >
                    Ver currícula vigente (2018)
                </Link>
            </div>
            <Image src={"/images/curriculos/currculo_ANTIGUO.png"} alt="Imagen de la malla curricular 1997" width={800} height={1200} className="mx-auto" />
            <div className="text-center mt-8 mb-3">
                <Link
                    href={"https://informaticaunt.github.io/"}
                    className="underline text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Versión interactiva
                </Link>
            </div>
        </>
    );
}

export default Curriculos97Page;