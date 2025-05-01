import Breadcrumb from "@/components/Common/Breadcrumb";
import CurriculosSVG from "@/components/Curriculos/CurriculosSVG";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Currícula | Escuela de Informática | UNT',
    description: 'Una vista interactiva de la malla curricular vigente (20218) en la escuela de informática. Selecciona un curso para activarlo. Si ese curso abre otro, se volverá disponible.',
    keywords: [
        'Informática',
        'UNT',
        'Escuela de Informática',
        'Currícula',
        'Malla curricular',
        'Plan de estudios',
        'Asignaturas',
        'Programas',
        'Currícula 2018',
        'Currícula interactiva',
    ],
    authors: [
    { name: 'Escuela de Informática UNT - Alfato Titto Anthony Fernando - Gonzales Matos Walter Manuel - Urcia Peláez Luis Alexander', url: 'https://inf.unitru.edu.pe/curriculos' },
    ],
    openGraph: {
        title: 'Currícula | Escuela de Informática | UNT',
        description: 'Una vista interactiva de la malla curricular vigente (20218) en la escuela de informática. Selecciona un curso para activarlo. Si ese curso abre otro, se volverá disponible.',
        url: 'https://inf.unitru.edu.pe/curriculos',
        siteName: 'Escuela de Informática UNT',
        locale: 'es_PE',
        type: 'website',
        images: [
            {
            url: 'https://inf.unitru.edu.pe/_next/image?url=%2Fimages%2Fcurriculos%2Fcurriculos_leyenda.png&w=640&q=75',
            width: 1200,
            height: 630,
            alt: 'Malla Curricular - Escuela de Informática UNT',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Currícula | Escuela de Informática | UNT',
        description: 'Una vista interactiva de la malla curricular vigente (20218) en la escuela de informática. Selecciona un curso para activarlo. Si ese curso abre otro, se volverá disponible.',
        images: ['https://inf.unitru.edu.pe/_next/image?url=%2Fimages%2Fcurriculos%2Fcurriculos_leyenda.png&w=640&q=75'],
    },
    robots: {
        index: true,
        follow: true,
    },
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
            <div className="flex flex-col gap-4 lg:flex-row justify-between items-center max-w-6xl mx-auto px-[1rem] mt-10 lg:mt-0 mb-5 text-center">
                <Link
                    href="https://drive.google.com/file/d/1Aasz5wfCK_X1PfbDB1_jbDO71ruv_wVZ/view?usp=sharing"
                    className="bg-primary p-2 text-white rounded-sm font-semibold duration-300 ease-in-out hover:bg-primary/80"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Descarga el plan de estudios 2018
                </Link>

                <Link
                    href="/curriculos-97"
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