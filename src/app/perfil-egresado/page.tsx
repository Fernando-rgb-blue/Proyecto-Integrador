import Breadcrumb from "@/components/Common/Breadcrumb";
import Image from "next/image";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perfil del Egresado | Escuela de Informática",
  description: "Esta es la página de Perfil del Egresado",
  // other metadata
};

const BlogDetailsPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Perfil del Egresado"
        description="Son las capacidades, los conocimientos y habilidades que debe haber adquirido el alumnado al finalizar la titulación."
      />
      <section className="pb-[80px] pt-[70px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4 lg:w-8/12">
              <div>
                <div>
                  <h3 className="font-xl mb-10 font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight">
                    Unidad de Competencia 1
                  </h3>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    Participa en proyectos multidisciplinarios para resolver problemas computacionales diferentes ámbitos de la sociedad demostrando su competencia profesional e integridad.
                  </p>
                  <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    <strong className="text-primary dark:text-white">
                    Capacidades terminales
                    </strong>
                  </p>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    CT 1.1 Maneja e integra cuatro habilidades básicas: abstracción, pensamiento sistémico, experimentación y trabajo en equipo.
                  </p>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    CT 1.2 Desarrolla proyectos con iniciativa y espíritu emprendedor.
                  </p>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    CT 1.3 Desarrolla la capacidad de aprendizaje de forma autónoma a lo largo de su vida.
                  </p>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    CT 1.4. Desarrolla la capacidad de desenvolverse y comunicarse eficazmente en equipo con la finalidad de alcanzar una meta en común.
                  </p>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    CT 1.5 Comprende los aspectos y la responsabilidad profesional, ética, legal, de seguridad y social.
                  </p>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    CT 1.6 Realiza investigaciones con rigor científico.
                  </p>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    CT 1.7 Contribuye con los resultados de la investigación a resolver problemas de la comunidad nacional e internacional.
                  </p>
                  

                  <h3 className="font-xl mb-10 font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight">
                    Unidad de Competencia 2
                  </h3>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    Aplica con ética profesional conocimientos computacionales teórico-práctico-aplicación involucrándose como actor principal del desarrollo de la sociedad.
                  </p>
                  <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    <strong className="text-primary dark:text-white">
                    Capacidades terminales
                    </strong>
                  </p>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    CT 2.1 Aplica fundamentos matemáticos, principios algorítmicos y teoría de ciencia de la computación en el modelamiento y diseño de sistema basados en computadora.
                  </p>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    CT 2.2 Aplica principios de diseño y desarrollo computacional en la construcción de sistemas de software de diversos tipos y complejidades, así como en nuevas arquitecturas de cómputo.
                  </p>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    CT 2.3 Realiza proyectos computacionales multidisciplinarios.
                  </p>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    CT 2.4 Desarrolla métodos y modelos eficientes para resolver problemas computacionales, que permitan alcanzar mayor progreso de la ciencia computacional y de la sociedad.
                  </p>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    CT 2.5 Diseña algoritmos eficientes para construir sistemas gestores de bases de datos, de redes, de inteligencia artificial, de procesamiento gráfico, etc.
                  </p>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    CT 2.6 proyecta y construye software base y de aplicación de alta calidad y bajo costo.
                  </p>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    CT 2.7 Reconoce y valora las relaciones entre Informática y Sociedad.
                  </p>
                  
                  <div className="mb-10 w-full overflow-hidden rounded">
                      <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                        <Image
                          src="/images/perfilEgresado/perfil.webp"
                          alt="image de perfil de egresado"
                          fill
                          sizes="(max-width: 640px) 100vw, 800px"
                          className="object-cover object-center"
                          priority 
                        />
                      </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailsPage;
