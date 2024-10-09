import { Convenios } from "@/types/conve";
import Image from "next/image";
import Link from "next/link";

const Barra = ({ convenios }: { convenios: Convenios }) => {
    const { title, image, paragraph, ubicacion, publishDate } = convenios;
    return (
        <>
        <div className="group relative overflow-hidden rounded-sm ">
            <Link
            href={ubicacion.direccionurl} target="_blank"
            className="relative block aspect-[37/22] w-full"
            >
            <Image src={image} alt="image" fill />
            </Link>
            <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
            <h3>
                <Link
                href={ubicacion.direccionurl} target="_blank"
                className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
                >
                {title}
                </Link>
            </h3>
            <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
                {paragraph}
            </p>
            <div className="flex items-center">
                <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
                <div className="mr-4">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image src={ubicacion.image} alt="author" fill />
                    </div>
                </div>
                <div className="w-full">
                    <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                    Pais - {ubicacion.pais}
                    </h4>
                    <a href={ubicacion.direccionurl} target="_blank" className="text-xs text-body-color">Conocer Más</a>
                </div>
                </div>
                <div className="inline-block">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                    Desde
                </h4>
                <p className="text-xs text-body-color">{publishDate}</p>
                </div>
            </div>
            </div>
        </div>
        </>
    );
};

export default Barra;
