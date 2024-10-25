import Breadcrumb from "@/components/Common/Breadcrumb";
import MainTeacherList from "@/components/Docentes/MainTeacherList";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Plana Docente | Escuela de Informática",
  description: "Aquí se muestra la plana docente ejerciendo su cargo en la escuela de informática.",
};

const PlanaDocentePage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Plana Docente"
        description="Nuestro equipo docente está conformado por profesionales capacitados y con amplia experiencia en sus respectivas áreas."
      />
      <div className="max-w-full mx-6 mb-10 text-center pt-10">
        <Link href="/docentes"
        className="rounded-sm bg-primary px-8 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80">
          Gestionar Docentes (luego borrar este boton)
        </Link>
        <MainTeacherList />
      </div>
    </>
  );
};

export default PlanaDocentePage;
