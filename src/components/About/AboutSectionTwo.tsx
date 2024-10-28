import Image from "next/image";

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">

          <div className="w-full px-4 lg:w-1/2 flex flex-col items-center">
            <div className="max-w-[470px] text-center">
              <div className="mb-9">
                <h1 className="mb-4 text-4xl font-bold text-black dark:text-white sm:text-5xl lg:text-3xl xl:text-5xl">
                  Misión
                </h1>
                <div
                  className="relative mb-12 aspect-[25/24] max-w-[200px] mx-auto"  //className="relative mx-auto mb-12 aspect-[25/24] max-w-[200px] text-center lg:m-0"
                  data-wow-delay=".15s"
                >
                  <Image
                    src="/images/about/14244339.svg"
                    alt="about image"
                    fill
                    className="drop-shadow-three dark:hidden dark:drop-shadow-none"
                  />
                  <Image
                    src="/images/about/14244339.svg"
                    alt="about image"
                    fill
                    className="hidden drop-shadow-three dark:block dark:drop-shadow-none"
                  />
                </div>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Formación académica de recursos humanos en computación a nivel de pregrado, con el objetivo de generar y difundir el conocimiento comprometido con los desafíos nacionales e internacionales, que llevan al avance científico y tecnológico de la computación. 
                </p>
              </div>
            </div>
          </div>  
        
          <div className="w-full px-4 lg:w-1/2 flex flex-col items-center">
            <div className="max-w-[470px] text-center">
              <div className="mb-9">
                <h1 className="mb-4 text-4xl font-bold text-black dark:text-white sm:text-5xl lg:text-3xl xl:text-5xl">
                  Visión
                </h1>
                <div
                  className="relative mb-12 aspect-[25/24] max-w-[200px] mx-auto"  //className="relative mx-auto mb-12 aspect-[25/24] max-w-[200px] text-center lg:m-0"
                  data-wow-delay=".15s"
                >
                  <Image
                    src="/images/about/17234191.svg"
                    alt="about image"
                    fill
                    className="drop-shadow-three dark:hidden dark:drop-shadow-none"
                  />
                  <Image
                    src="/images/about/17234191.svg"
                    alt="about image"
                    fill
                    className="hidden drop-shadow-three dark:block dark:drop-shadow-none"
                  />
                </div>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  La Escuela Profesional de Informática será líder en la enseñanza nacional e investigación, preparando ciudadanos que puedan contribuir con la creatividad, humanidad e innovación para una sociedad global, justa y con éxito.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
