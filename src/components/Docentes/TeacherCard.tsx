import { User } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import EnvelopeIcon from "../Icons/EnvelopeIcon";

const TeacherCard = ({docente}: {docente: User}) => {
    const [hovered, setHovered] = useState<boolean>(false);
    const [image, setImage] = useState<string>(docente.image);

    const handleImageError = () => {
        setImage("/images/props/pfp_default.png");
    };

    return (
        <>
            <div className="relative w-[250px] h-[340px] overflow-hidden hover:shadow-one bg-primary/10 dark:bg-slate-800"
            style={{ boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
                <Image src={image} width={150} height={150} sizes="100vw" onError={handleImageError}
                style={{ width: '250px', height: '270px', objectFit: 'cover' }} priority={true} alt="Foto del docente" />
                <div className="text-black dark:text-white h-[70px] flex flex-col justify-center font-bold text-lg">
                    {docente.fullname}
                </div>
                <div className={`absolute inset-x-0 bottom-0 bg-slate-200 dark:bg-gray-200 flex flex-col justify-center px-4
                    transition-transform duration-[400ms] ease-in-out w-full h-full text-gray-600
                    ${hovered ? 'translate-y-0' : 'translate-y-full'}`}>
                    <h3 className="font-bold text-xl">
                        {docente.fullname}
                    </h3>
                    <div className="flex justify-center mr-1 mt-4">
                        <EnvelopeIcon />
                    </div>
                    <p>
                        <Link href={"mailto:" + docente.email} className="underline">
                            {docente.email}
                        </Link>
                    </p>
                    <p className="font-semibold mt-4">
                        {docente.office}
                    </p>
                    <p className="font-semibold mt-4 text-blue-600">
                        Áreas de investigación:
                    </p>
                    <p className="text-blue-600">
                        {docente.areas}
                    </p>
                </div>
            </div>
        </>
    );
}

export default TeacherCard;