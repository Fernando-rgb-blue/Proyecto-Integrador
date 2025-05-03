// Contenedor general de el home
import ScrollUp from "@/components/Common/ScrollUp";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import CarreraInfo from "@/components/CarreraInfo";
import Video from "@/components/Video";
import Conveniosf from "@/components/Convenios/Showcon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Escuela de Informática | UNT",
  description:
    'Bienvenido a la Escuela de Informática de la UNT. Aquí encontrarás información sobre la escuela, creación de fut, Currícula, horarios, etc.',
  keywords: [
    'Informática',
    'UNT',
    'Escuela de Informática',
    'Tecnología',
    'Programación',
    'FUT dinámico',
    'FUT UNT',
    'Currícula informática UNT',
    'Horarios informática'
  ],
  authors: [
    { name: 'Escuela de Informática UNT - Alfaro Titto Anthony Fernando - Gonzales Matos Walter Manuel - Urcia Peláez Luis Alexander', url: 'https://inf.unitru.edu.pe/' },
  ],
  openGraph: {
    title: 'Escuela de Informática | UNT',
    description:
      'Bienvenido a la Escuela de Informática de la UNT. Aquí encontrarás información sobre la escuela, creación de fut, Currícula, horarios, etc.',
    url: 'https://inf.unitru.edu.pe/',
    siteName: 'Escuela de Informática UNT',
    locale: 'es_PE',
    type: 'website',
    images: [
      {
        url: 'https://inf.unitru.edu.pe/_next/image?url=%2Fimages%2Fnosotros%2Frese%C3%B1a_frontis_escuela_informatica.webp&w=1920&q=75',
        width: 1200,
        height: 630,
        alt: 'Logo de la Escuela de Informática UNT',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Escuela de Informática | UNT',
    description:
      'Bienvenido a la Escuela de Informática de la UNT. Aquí encontrarás información sobre la escuela, creación de fut, Currícula, horarios, etc.',
    images: ['https://inf.unitru.edu.pe/_next/image?url=%2Fimages%2Fnosotros%2Frese%C3%B1a_frontis_escuela_informatica.webp&w=1920&q=75'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <CarreraInfo />
      <Features />
      <Video />
      <Conveniosf />
    </>
  );
}