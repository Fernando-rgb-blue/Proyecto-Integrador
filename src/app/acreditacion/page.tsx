
import Image from "next/image";
import Documentos from "@/components/Documentos";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Escuela de Informática | Acreditación",
    description: "Esta es la página de Documentos de Acreditación",
    // other metadata
};

const AcreditacionPage = () => {
    return (
        <>
        <Breadcrumb
        pageName="Acreditación"
        description="Proceso mediante el cual una entidad evaluadora verifica si una institución educativa o un programa cumple con ciertos criterios de calidad."
        />
        <section className="pb-[80px] pt-[70px]">
            <div className="container">
                <div className="-mx-4 flex flex-wrap justify-center">
                    <div className="w-full px-4 lg:w-8/12">
                        <div>
                            <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                            Programa de Estudios de Informática (ICACIT)
                            </h2>
                            <div>
                            {/* <h3 className="font-xl mb-10 font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight">
                                Unidad de Competencia 1
                            </h3> */}
                            <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                            La carrera profesional de Informática - UNT logró su primera acreditación internacional otorgada por ICACIT luego de pasar por un rigoroso proceso de verificación de cumplimiento de los criterios del modelo ICACIT. 
                            <br/>
                            La acreditación trae muchos beneficios a los estudiantes y egresados, toda vez que favorece la movilidad estudiantil y seguir estudios convalidables en el extranjero en el marco de los acuerdos internacionales vigentes en los comprendidos de esta acreditación.
                            </p>
                            
                            
                            <div className="mb-10 w-full overflow-hidden rounded">
                                <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                                <Image
                                    src="/images/icacit/ICACIT.webp"
                                    alt="imagen de acreditación ICACIT"
                                    fill
                                    className="object-cover object-center"
                                />
                                </div>
                            </div>
                            
                            </div>
                            <h2 className="mb-8 mt-20 text-2xl font-bold leading-tight text-black dark:text-white sm:text-3xl sm:leading-tight text-center">
                            Documentos De Acreditación
                            </h2>
                            <Documentos />
                        </div>
                                        
                    </div>
                </div>
            </div>
        </section>
        </>
    );
};

export default AcreditacionPage;
