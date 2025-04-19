// app/not-found.tsx
"use client";
import { Metadata } from "next";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Error | Escuela de Informática",
    description: "Esta es la página de Error (Página no encontrada)",
};

export default function NotFound() {
    return (
        <section
        id="not-found"
        className="relative z-10 flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center dark:bg-gray-dark pt-3"
        >
        <BackgroundCanvas />

        <div className="z-20 flex flex-col items-center">
            {/* Número 404 animado */}
            <div className="flex items-center space-x-4 text-[120px] font-extrabold text-gray-800 dark:text-white animate-pulse">
            <span className="animate-bounce">4</span>
            <span className="animate-spin-slow">0</span>
            <span className="animate-bounce">4</span>
            </div>

            <h1 className="mt-4 text-3xl font-bold text-black dark:text-white sm:text-4xl">
            Página no encontrada
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Lo sentimos, no pudimos encontrar lo que buscas.
            </p>

            <Link
            href="/"
            className="mt-6 w-60 p-4 text-black border border-gray-600 bg-white dark:bg-gray-dark shadow-lg rounded-md hover:text-white dark:text-white hover:bg-primary dark:hover:bg-primary transition cursor-pointer text-center"
            >
            Volver al Home
            </Link>
        </div>

        {/* Animaciones personalizadas */}
        <style jsx>{`
            .animate-spin-slow {
            animation: spin 5s linear infinite;
            }
            @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
            }
        `}</style>
        </section>
    );
}
