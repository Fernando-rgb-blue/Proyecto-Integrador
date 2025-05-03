import Breadcrumb from "@/components/Common/Breadcrumb";
import MainTeacherList from "@/components/Docentes/MainTeacherList";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Plana Docente | Escuela de Informática | UNT',
  description: 'Nuestro equipo docente está conformado por profesionales capacitados y con amplia experiencia en sus respectivas áreas.',
  keywords: [
    'Informática',
    'UNT',
    'Escuela de Informática',
    'Plana docente',
    'Docentes',
    'Profesores',
    'Cuerpo docente informática',
    'Equipo académico'
  ],
  authors: [
    {
      name: 'Escuela de Informática UNT - Alfaro Titto Anthony Fernando - Gonzales Matos Walter Manuel - Urcia Peláez Luis Alexander',
      url: 'https://inf.unitru.edu.pe/plana-docente'
    },
  ],
  openGraph: {
    title: 'Plana Docente | Escuela de Informática | UNT',
    description: 'Nuestro equipo docente está conformado por profesionales capacitados y con amplia experiencia en sus respectivas áreas.',
    url: 'https://inf.unitru.edu.pe/plana-docente',
    siteName: 'Escuela de Informática UNT',
    locale: 'es_PE',
    type: 'website',
    images: [
      {
        url: 'https://inf.unitru.edu.pe/_next/image?url=%2Fimages%2Fuploads%2Fmfgm39kr1dy.jpeg&w=1920&q=75',
        width: 1200,
        height: 630,
        alt: 'Plana Docente - Escuela de Informática UNT',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plana Docente | Escuela de Informática | UNT',
    description: 'Nuestro equipo docente está conformado por profesionales capacitados y con amplia experiencia en sus respectivas áreas.',
    images: ['https://inf.unitru.edu.pe/_next/image?url=%2Fimages%2Fuploads%2Fmfgm39kr1dy.jpeg&w=1920&q=75'],
  },
  robots: {
    index: true,
    follow: true,
  },
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
