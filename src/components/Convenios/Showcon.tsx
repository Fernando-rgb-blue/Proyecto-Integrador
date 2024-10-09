"use client";
import { useState } from "react";
import Barra from "@/components/Convenios/Barra";
import { Metadata } from "next";
import conveDataPage1 from "@/components/Convenios/Content";
import conveDataPage2 from "@/components/Convenios/ContentPage2";
import conveDataPage3 from "@/components/Convenios/ContentPage3";

export const metadata: Metadata = {
    title: "Convenios",
    description: "This is Blog Page for Startup Nextjs Template",
    // other metadata
};

const Conveniosf = () => {
  // Estado para manejar la página actual
    const [currentPage, setCurrentPage] = useState(1);

    // Filtra los datos basados en la página actual
    const getContentByPage = () => {
        if (currentPage === 1) {
        return conveDataPage1;
        } else if (currentPage === 2) {
        return conveDataPage2;
        } else {
        return conveDataPage3;
        }
    };

    return (
        <>
        <section className="relative z-10 overflow-hidden pt-2 lg:pt-[60px]">
            <div className="container">
            <div className="-mx-4 flex flex-wrap items-center">
                <div className="w-full px-4 md:w-8/12 lg:w-7/12">
                    <div className="mb-8 max-w-[570px] md:mb-0 lg:mb-12">
                        <h1 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                        Nuestros Convenios Institucionales
                        </h1>
                    </div>
                </div>
            </div>
            </div>
        </section>

        <section className="pb-[80px] pt-[10px]">
            <div className="container">
                <div className="-mx-4 flex flex-wrap justify-center items-stretch">
                {getContentByPage().map((convenios) => (
                    <div 
                    key={convenios.id}
                    className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3 flex" // Asegura que este div también use flex
                    >
                    <div className="flex-grow bg-white shadow-one duration-300 hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark"> {/* Este div contendrá el contenido */}
                        <Barra convenios={convenios} />
                    </div>
                    </div>
                ))}
                </div>

                <div className="-mx-4 flex flex-wrap" data-wow-delay=".15s">
                    <div className="w-full px-4">
                    <ul className="flex items-center justify-center pt-8">
                        <li className="mx-1">
                        <button
                            onClick={() => setCurrentPage(1)}
                            className={`flex h-9 min-w-[36px] items-center justify-center rounded-md px-4 text-sm transition ${
                            currentPage === 1
                                ? "bg-primary text-white"
                                : "bg-body-color bg-opacity-[15%] text-body-color hover:bg-primary hover:bg-opacity-100 hover:text-white"
                            }`}
                        >
                            1
                        </button>
                        </li>
                        <li className="mx-1">
                        <button
                            onClick={() => setCurrentPage(2)}
                            className={`flex h-9 min-w-[36px] items-center justify-center rounded-md px-4 text-sm transition ${
                            currentPage === 2
                                ? "bg-primary text-white"
                                : "bg-body-color bg-opacity-[15%] text-body-color hover:bg-primary hover:bg-opacity-100 hover:text-white"
                            }`}
                        >
                            2
                        </button>
                        </li>
                        <li className="mx-1">
                        <button
                            onClick={() => setCurrentPage(3)}
                            className={`flex h-9 min-w-[36px] items-center justify-center rounded-md px-4 text-sm transition ${
                            currentPage === 3
                                ? "bg-primary text-white"
                                : "bg-body-color bg-opacity-[15%] text-body-color hover:bg-primary hover:bg-opacity-100 hover:text-white"
                            }`}
                        >
                            3
                        </button>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
};

export default Conveniosf;
