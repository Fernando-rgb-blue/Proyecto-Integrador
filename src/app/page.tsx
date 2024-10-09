// Contenedor general

import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import CarreraInfo from "@/components/CarreraInfo";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import Conveniosf from "@/components/Convenios/Showcon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Escuela de Informática | Inicio",
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
      {/* <Brands />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Testimonials />
      <Pricing />
      <Blog />
      <Contact /> */}
    </>
  );
}
