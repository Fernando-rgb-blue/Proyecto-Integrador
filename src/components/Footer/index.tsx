"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="relative z-10 bg-white pt-16 dark:bg-gray-dark md:pt-20 lg:pt-24">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-5/12">
              <div className="mb-12 max-w-[360px] lg:mb-16">
                <Link href="/" className="mb-8 inline-block">
                  <Image
                    src="/images/logo/infClaro.svg"
                    alt="logo"
                    className="w-full dark:hidden"
                    width={140}
                    height={30}
                  />
                  <Image
                    src="/images/logo/infOscuro.svg"
                    alt="logo"
                    className="hidden w-full dark:block"
                    width={140}
                    height={30}
                  />
                </Link>
                <p className="mb-9 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  Escuela de Ingeniería Informática - Desarrolla soluciones innovadoras que impacten al mundo
                </p>
                <div className="flex items-center">
                  <a
                    href="https://www.facebook.com/ep.informaticaunt/?locale=es_LA"
                    aria-label="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.1 10.4939V7.42705C12.1 6.23984 13.085 5.27741 14.3 5.27741H16.5V2.05296L13.5135 1.84452C10.9664 1.66676 8.8 3.63781 8.8 6.13287V10.4939H5.5V13.7183H8.8V20.1667H12.1V13.7183H15.4L16.5 10.4939H12.1Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://unitru.edu.pe/webfiles//Empresa/2022/11/34_Empresa__111120220839.pdf"
                    aria-label="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.487 15.2911C19.4042 15.2911 18.3544 15.1159 17.3694 14.7783C17.0171 14.6516 16.6137 14.7394 16.3362 15.017L14.4362 16.9126C11.4865 15.4852 8.51184 12.5111 7.08652 9.56371L8.98294 7.66256C9.26172 7.38471 9.34957 6.9819 9.22315 6.63025C8.8853 5.64491 8.71039 4.59528 8.71039 3.51239C8.71039 3.01784 8.31165 2.61911 7.81711 2.61911H4.58168C4.08714 2.61911 3.6884 3.01784 3.6884 3.51239C3.6884 13.0348 11.4826 20.8286 21.0031 20.8286C21.4976 20.8286 21.8963 20.4298 21.8963 19.9353V16.7014C21.8963 16.2069 21.4976 15.8081 21.0031 15.8081H20.487Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                  
                </div>
              </div>
            </div>

            <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                  Secciones
                </h2>
                <ul>
                  <li>
                    <Link
                      href="/"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/nosotros"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Nosotros
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/curriculos"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Currículos
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/plana-docente"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Plana Docente
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                  Otros
                </h2>
                <ul>
                  <li>
                    <Link
                      href="https://transparencia.unitru.edu.pe/doc/TUSNE/Anexo%20Oficio%20015-2019%20Tasas%20UNT%202019.pdf"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Tasas Educativas
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/acreditacion"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Documentos Acreditación
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/fut"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      FUT
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://aulavirtual2.unitru.edu.pe"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Aula Virtual UNT
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-3/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                  Contáctanos
                </h2>
                <ul>
                  <li>
                    <Link
                      href="mailto:informatica@unitru.edu.pe"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      informatica@unitru.edu.pe
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="mailto:mesadepartesfcfym@unitru.edu.pe"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      mesadepartesfcfym@unitru.edu.pe
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.google.com/maps/place/Escuela+de+Inform%C3%A1tica/@-8.1127534,-79.0380273,15z/data=!4m6!3m5!1s0x91ad3d9ef28d2b45:0xc0758c13c8b00a67!8m2!3d-8.1127534!4d-79.0380273!16s%2Fg%2F1q2wb7fkl?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D" 
                      target="_blank"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Av. Juan Pablo II S/N
                      Trujillo - La Libertad
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div> */}
          
          {/* <div className="py-8">
            <p className="text-center text-base text-body-color dark:text-white">
              Template by{" "}
              <a
                href="http://uideck.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                UIdeck
              </a>{" "}
              and{" "}
              <a
                href="https://nextjstemplates.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                Next.js Templates
              </a>
            </p>
          </div> */}
        </div>
        <div className="absolute right-0 top-14 z-[-1]">
          
        <svg 
            width="55"
            height="99"
            viewBox="0 0 55 99"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Círculo de fondo */}
            <circle opacity="0.8" cx="49.5" cy="49.5" r="49.5" fill="#4A6CF7" />
            <mask
                id="mask0_94:899"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="99"
                height="99"
            >
                {/* Círculo de máscara */}
                <circle
                    opacity="0.8"
                    cx="49.5"
                    cy="49.5"
                    r="49.5"
                    fill="#3B5BC1" // Un tono más oscuro para la máscara
                />
            </mask>
            <g mask="url(#mask0_94:899)">
                <circle
                    opacity="0.8"
                    cx="49.5"
                    cy="49.5"
                    r="49.5"
                    fill="url(#paint0_radial_94:899)"
                />
                <g opacity="0.8" filter="url(#filter0_f_94:899)">
                    {/* Círculo pequeño */}
                    <circle cx="53.8676" cy="26.2061" r="20.3824" fill="#4A6CF7" />
                </g>
            </g>
            <defs>
                <filter
                    id="filter0_f_94:899"
                    x="12.4852"
                    y="-15.1763"
                    width="82.7646"
                    height="82.7646"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur
                        stdDeviation="10.5"
                        result="effect1_foregroundBlur_94:899"
                    />
                </filter>
                <radialGradient
                    id="paint0_radial_94:899"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(49.5 49.5) rotate(90) scale(53.1397)"
                >
                    <stop stopColor="#4A6CF7" stopOpacity="0.47" />
                    <stop offset="1" stopOpacity="0" />
                </radialGradient>
            </defs>
        </svg>

        </div>
        <div className="absolute bottom-24 left-0 z-[-1]">
          <svg
            width="79"
            height="94"
            viewBox="0 0 79 94"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.3"
              x="-41"
              y="26.9426"
              width="66.6675"
              height="66.6675"
              transform="rotate(-22.9007 -41 26.9426)"
              fill="url(#paint0_linear_94:889)"
            />
            <rect
              x="-41"
              y="26.9426"
              width="66.6675"
              height="66.6675"
              transform="rotate(-22.9007 -41 26.9426)"
              stroke="url(#paint1_linear_94:889)"
              strokeWidth="0.7"
            />
            <path
              opacity="0.3"
              d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L77.1885 68.2073L50.5215 7.42229Z"
              fill="url(#paint2_linear_94:889)"
            />
            <path
              d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L76.7963 68.2073L50.5215 7.42229Z"
              stroke="url(#paint3_linear_94:889)"
              strokeWidth="0.7"
            />
            <path
              opacity="0.3"
              d="M17.9721 93.3057L-14.9695 88.2076L46.2077 62.325L77.1885 68.2074L17.9721 93.3057Z"
              fill="url(#paint4_linear_94:889)"
            />
            <path
              d="M17.972 93.3057L-14.1852 88.2076L46.2077 62.325L77.1884 68.2074L17.972 93.3057Z"
              stroke="url(#paint5_linear_94:889)"
              strokeWidth="0.7"
            />
            <defs>
              <linearGradient
                id="paint0_linear_94:889"
                x1="-41"
                y1="21.8445"
                x2="36.9671"
                y2="59.8878"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_94:889"
                x1="25.6675"
                y1="95.9631"
                x2="-42.9608"
                y2="20.668"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_94:889"
                x1="20.325"
                y1="-3.98039"
                x2="90.6248"
                y2="25.1062"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_94:889"
                x1="18.3642"
                y1="-1.59742"
                x2="113.9"
                y2="80.6826"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_94:889"
                x1="61.1098"
                y1="62.3249"
                x2="-8.82468"
                y2="58.2156"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_94:889"
                x1="65.4236"
                y1="65.0701"
                x2="24.0178"
                y2="41.6598"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </footer>
    </>
  );
};

export default Footer;
