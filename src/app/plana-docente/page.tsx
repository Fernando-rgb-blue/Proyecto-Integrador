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
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />
      <div className="max-w-full mx-6 mb-10 text-center pt-10">
        <Link href="/docentes"
        className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80">
          Gestionar Docentes
        </Link>
        <MainTeacherList />
      </div>
    </>
  );
};

export default PlanaDocentePage;
