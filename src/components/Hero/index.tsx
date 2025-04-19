import Link from "next/link";
import BackgroundCanvas from "@/components/BackgroundCanvas";
const Hero = () => {
  return (
    <section
      id="home"
      className="relative z-10 flex min-h-screen items-center justify-center bg-white px-4 dark:bg-gray-dark pt-3"
    >
      <BackgroundCanvas />
      <div className="mx-auto max-w-[800px] text-center">
        <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
          Estudia Ingeniería Informática En La Universidad Nacional De Trujillo
        </h1>
        <p className="mb-12 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-lg">
          Prepárate para construir soluciones innovadoras en un sector en constante evolución. ¡Sé parte del futuro digital y transforma el mundo con tu conocimiento!
        </p>
        <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <Link
            href="/nosotros"
            className="w-60 p-4 text-black border border-gray-600 bg-white dark:bg-gray-dark shadow-lg rounded-md hover:text-white dark:text-white hover:bg-primary dark:hover:bg-primary transition cursor-pointer text-center"
          >
            Conócenos
          </Link>
          <Link
            href="/curriculos"
            className="w-60 p-4 text-black border border-gray-600 bg-white dark:bg-gray-dark shadow-lg rounded-md hover:text-white dark:text-white hover:bg-primary dark:hover:bg-primary transition cursor-pointer text-center"
          >
            Ver Malla Curricular
          </Link>
          <Link
            href="/perfil-egresado"
            className="w-60 p-4 text-black border border-gray-600 bg-white dark:bg-gray-dark shadow-lg rounded-md hover:text-white dark:text-white hover:bg-primary dark:hover:bg-primary transition cursor-pointer text-center"
          >
            Perfil del Egresado
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
