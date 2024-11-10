import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const AboutSectionOne = () => {
  const List = ({ text }) => (
    <p className="mb-10 flex items-center text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
      <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
        {checkIcon}
      </span>
      {text}
    </p>
  );

  return (
    <section id="nosotros" className="pt-[50px] pb-[120px]">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <SectionTitle
                title="Breve reseña histórica"
                paragraph="La Escuela de Informática de la Universidad Nacional de Trujillo (UNT) fue fundada el 12 de septiembre de 1995, impulsada por un grupo de docentes del Departamento de Matemáticas. Inicialmente, las clases se dictaban en el aula F9 de la Escuela de Física y contaban con un laboratorio equipado con 8 PCs Olivetti que usaban Windows 3.11, actualizándose a Windows 95 a finales de ese año. Los primeros docentes fueron el Prof. José Olivencia Quiñones (Geometría), la Prof. Roxana Rodríguez Escobedo (Cálculo I), el Prof. Guillermo Ramírez Lara (Lógica para Computación), el Prof. José Roldan López (Física I) y el Prof. Stephen Backle (Arquitectura de Computadoras). El Prof. Oswaldo Sánchez Rosales fue el primer coordinador y, en 1996, el Dr. Ausberto Castro se convirtió en el primer Director de la Escuela. Para su funcionamiento, se realizaron ajustes en el currículo que fueron aprobados por el Consejo Universitario el 25 de abril de 1996. El 29 de mayo de 1997, se aprobó oficialmente el currículo de la Escuela Académica Profesional de Informática mediante la Resolución Rectoral no. 1037 - 97/UNT. Con el tiempo, la informática ha evolucionado, y actualmente se entiende como sinónimo de computación, a abarcar desde el diseño de hardware y software hasta el desarrollo de sistemas inteligentes y la gestión de información. Las aplicaciones de la computación son vastas y continúan expandiéndose."
                mb="44px"
                className="text-justify text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight"
              />
            </div>
            <div className="w-full px-4">
              <div className="relative mx-auto aspect-[25/24] max-w-[600px]">
                <Image
                  src="/images/nosotros/reseña_frontis_escuela_informatica.webp"
                  alt="about-image"
                  fill
                  className="mx-auto max-w-full drop-shadow-three dark:hidden dark:drop-shadow-none"
                />
                <Image
                  src="/images/nosotros/reseña_frontis_escuela_informatica.webp"
                  alt="about-image"
                  fill
                  className="mx-auto hidden max-w-full drop-shadow-three dark:block dark:drop-shadow-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;