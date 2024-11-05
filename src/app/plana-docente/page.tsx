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
        <MainTeacherList />
      </div>
    </>
  );
};

export default PlanaDocentePage;
