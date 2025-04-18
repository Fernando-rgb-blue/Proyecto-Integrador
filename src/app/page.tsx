// Contenedor general de el home
import ScrollUp from "@/components/Common/ScrollUp";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import CarreraInfo from "@/components/CarreraInfo";
import Video from "@/components/Video";
import Conveniosf from "@/components/Convenios/Showcon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio | Escuela de Informática",
  description: "Esta es la página de Inicio",
  // other metadata
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