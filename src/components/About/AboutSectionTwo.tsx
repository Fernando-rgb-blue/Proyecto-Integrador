import Image from "next/image";

const AboutSectionTwo = () => {
  return (
    <section className="pt-[100px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4 items-stretch">
          {/* Misión */}
          <div className="w-full lg:w-1/2 px-4 mb-1 lg:mb-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col h-full text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-800 dark:text-gray-200">
                Misión
              </h2>
              <div className="mb-6 mx-auto w-32 h-32 relative">
                <Image
                  src="/images/nosotros/mision.svg"
                  alt="Misión"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                Formación académica de recursos humanos en computación a nivel de
                pregrado, con el objetivo de generar y difundir el conocimiento
                comprometido con los desafíos nacionales e internacionales, que
                llevan al avance científico y tecnológico de la computación.
              </p>
            </div>
          </div>

          {/* Visión */}
          <div className="w-full lg:w-1/2 px-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col h-full text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-800 dark:text-gray-200">
                Visión
              </h2>
              <div className="mb-6 mx-auto w-32 h-32 relative">
                <Image
                  src="/images/nosotros/vision.svg"
                  alt="Visión"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                La Escuela Profesional de Informática será líder en la enseñanza
                nacional e investigación, preparando ciudadanos que puedan contribuir
                con la creatividad, humanidad e innovación para una sociedad global,
                justa y con éxito.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
