'use client';
import React from 'react';

const VistaHorarios: React.FC = () => {
    return (
        <>
            <div className="px-4 sm:px-10 lg:px-44">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5">
                    <div className="flex flex-col md:flex-row items-end w-full md:w-auto gap-4"> 
                        <div className="flex flex-col w-full md:w-auto">
                            <label htmlFor="ciclo-select" className="text-base font-medium leading-relaxed text-body-color">
                                Seleccionar por
                            </label>
                            <select
                                id="ciclo-select"
                                className="w-full md:w-auto p-2 mt-1 border dark:bg-dark border-gray-300 rounded text-base font-medium leading-relaxed text-body-color dark:text-white"
                            >
                                <option value="ciclo1">Ciclo</option>
                                <option value="ciclo2">Docente</option>
                                <option value="ciclo2">Aulas</option>
                            </select>
                        </div>

                        <div className="flex flex-row gap-4 items-center w-full md:w-auto justify-center"> {/* Responsive con flex-col en mobile */}
                            <span className="text-base font-medium leading-relaxed text-body-color py-2 px-4">Visualizar</span>

                            <select
                                id="opcion-select"
                                className="w-full md:w-auto p-2 mt-1 border dark:bg-dark border-gray-300 rounded text-base font-medium leading-relaxed text-body-color dark:text-white"
                            >
                                <option value="opcion1">Ciclo I</option>
                                <option value="opcion2">José Gabriel Cruz Silva</option>
                                <option value="opcion3">Info 2</option>
                            </select>
                        </div>
                    </div>

                    <button className="mt-2 md:mt-0 text-lg font-medium leading-relaxed text-gray-500 hover:text-gray-700">
                        <a href="/signin" className="underline">Soy Docente</a>
                    </button>
                </div>
            </div>
        </>
    );
};

export default VistaHorarios;