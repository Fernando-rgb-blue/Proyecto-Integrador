import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Image from "next/image";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros | Escuela de Informática",
  description: "Esta es la página de Nosotros",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Nosotros"
        description="En la Escuela de Ingeniería Informática, nos dedicamos a transformar la pasión por la tecnología en habilidades concretas."
      />
      <section className="pb-[80px] pt-[5px]"> 
        <div className="container">
                <div className="-mx-4 mt-16 flex flex-wrap justify-center">
                    <div className="w-full px-4 lg:w-8/12">
                        <div>
                            <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                            Breve reseña histórica
                            </h2>
                            <div>
                              <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                              La Escuela de Informática de la Universidad Nacional de Trujillo (UNT) fue fundada el 12 de septiembre de 1995, impulsada por un grupo de docentes del Departamento de Matemáticas. Inicialmente, las clases se dictaban en el aula F9 de la Escuela de Física y contaban con un laboratorio equipado con 8 PCs Olivetti que usaban Windows 3.11, actualizándose a Windows 95 a finales de ese año. Los primeros docentes fueron el Prof. José Olivencia Quiñones (Geometría), la Prof. Roxana Rodríguez Escobedo (Cálculo I), el Prof. Guillermo Ramírez Lara (Lógica para Computación), el Prof. José Roldan López (Física I) y el Prof. Stephen Backle (Arquitectura de Computadoras). 
                              <br/>
                              El Prof. Oswaldo Sánchez Rosales fue el primer coordinador y, en 1996, el Dr. Ausberto Castro se convirtió en el primer Director de la Escuela. Para su funcionamiento, se realizaron ajustes en el currículo que fueron aprobados por el Consejo Universitario el 25 de abril de 1996. El 29 de mayo de 1997, se aprobó oficialmente el currículo de la Escuela Académica Profesional de Informática mediante la Resolución Rectoral no. 1037 - 97/UNT. Con el tiempo, la informática ha evolucionado, y actualmente se entiende como sinónimo de computación, a abarcar desde el diseño de hardware y software hasta el desarrollo de sistemas inteligentes y la gestión de información. Las aplicaciones de la computación son vastas y continúan expandiéndose.
                              </p>
                              
                              
                              <div className="mb-10 w-full overflow-hidden rounded">
                                  <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                                  <Image
                                      src="/images/nosotros/reseña_frontis_escuela_informatica.webp"
                                      alt="imagen del frontis de informática"
                                      fill
                                      className="object-cover object-center"
                                  />
                                  </div>
                              </div>
                              <AboutSectionTwo />
                            </div>
                        </div>
                                        
                    </div>
                </div>
            </div>
      </section>
    </>
  );
};

export default AboutPage;
