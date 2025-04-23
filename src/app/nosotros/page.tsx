import AboutSectionTwo from "@/components/About/AboutSectionTwo"; 
import Breadcrumb from "@/components/Common/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros | Escuela de Informática",
  description: "Esta es la página de Nosotros",
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Nosotros"
        description="En la Escuela de Ingeniería Informática, nos dedicamos a transformar la pasión por la tecnología en habilidades concretas."
      />

      <section className="pb-20 pt-10 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto space-y-20 px-4">
          {/* Sección 1 */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-4 tracking-wide drop-shadow-sm hover:text-primary dark:hover:text-primary transition-colors duration-300">
                Nacimiento de la Escuela
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed text-justify tracking-normal">
                La Escuela de Informática de la Universidad Nacional de Trujillo (UNT) fue fundada el 12 de septiembre de 1995, impulsada por un grupo de docentes del Departamento de Matemáticas.
                Inicialmente, las clases se dictaban en el aula F9 de la Escuela de Física y contaban con un laboratorio equipado con 8 PCs Olivetti que usaban Windows 3.11, actualizándose a Windows 95 a finales de ese año.
                Los primeros docentes fueron el Prof. José Olivencia Quiñones (Geometría), la Prof. Roxana Rodríguez Escobedo (Cálculo I), el Prof. Guillermo Ramírez Lara (Lógica para Computación),
                el Prof. José Roldan López (Física I) y el Prof. Stephen Backle (Arquitectura de Computadoras).
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="w-full rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                <Image
                  src="/images/nosotros/unt-portada.webp"
                  alt="Frontis de la UNT"
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Sección 2 */}
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-1/2">
              <div className="w-full rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                <Image
                  src="/images/nosotros/reseña_frontis_escuela_informatica.webp"
                  alt="Frontis de informática"
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-4 tracking-wide drop-shadow-sm hover:text-primary dark:hover:text-primary transition-colors duration-300">
                Primeros pasos
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed text-justify tracking-normal">
                El Prof. Oswaldo Sánchez Rosales fue el primer coordinador y, en 1996, el Dr. Ausberto Castro se convirtió en el primer Director de la Escuela.
                Para su funcionamiento, se realizaron ajustes en el currículo que fueron aprobados por el Consejo Universitario el 25 de abril de 1996.
                El 29 de mayo de 1997, se aprobó oficialmente el currículo de la Escuela Académica Profesional de Informática mediante la Resolución Rectoral no. 1037 - 97/UNT.
              </p>
            </div>
          </div>

          

          {/* Misión y Visión */}
          <section className="pt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Misión */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                <h2 className="text-4xl font-bold text-primary dark:text-primary mb-4 tracking-wide drop-shadow-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                  Misión
                </h2>
                <div className="mx-auto mb-6 w-24 h-24 relative transform transition duration-500 hover:scale-110">
                  <Image
                    src="/images/nosotros/mision.svg"
                    alt="Misión"
                    width={96}
                    height={96}
                    className="mx-auto"
                  />
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg tracking-normal">
                  Formación académica de recursos humanos en computación a nivel de pregrado, con el objetivo de generar y difundir el conocimiento comprometido con los desafíos nacionales e internacionales, que llevan al avance científico y tecnológico de la computación.
                </p>
              </div>

              {/* Visión */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                <h2 className="text-4xl font-bold text-primary dark:text-primary mb-4 tracking-wide drop-shadow-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                  Visión
                </h2>
                <div className="mx-auto mb-6 w-24 h-24 relative transform transition duration-500 hover:scale-110">
                  <Image
                    src="/images/nosotros/vision.svg"
                    alt="Visión"
                    width={96}
                    height={96}
                    className="mx-auto"
                  />
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg tracking-normal">
                  La Escuela Profesional de Informática será líder en la enseñanza nacional e investigación, preparando ciudadanos que puedan contribuir con la creatividad, humanidad e innovación para una sociedad global, justa y con éxito.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
