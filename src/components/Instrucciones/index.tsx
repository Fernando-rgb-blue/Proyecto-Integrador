// AQUI ESTA EL CONTENIDO TEXTUAL DE CADA PASO
//Permite modificar el el contenido de 'N° PASO (orden)' y el contrnido de cada paso (subtitle)

"use client";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import Pasos from "./Pasos";

const Content = () => {

  return (
    <section className="relative z-10 py-24 md:py-28 lg:py-32 xl:py-40">
      <div className="container">
        <SectionTitle
          title="Instrucciones Para Matrícula Online"
          paragraph="Escuela de Informática"
          center
          width="900px"
        />


        <div className="grid grid-cols-1 gap-x-8 gap-y-10  md:grid-cols-2 lg:grid-cols-3 ">
          <Pasos
            orden="1° Paso"
            subtitle="Los alumnos, antes de ingresar a registrar matrícula deberán revisar los horarios que se encuentran publicados en la página web de esta Escuela."
          > </Pasos>
          <Pasos
            orden="2° Paso"
            subtitle="Luego ingresar al sistema S.G.A. (ingresantes hasta el 2017) o S.U.V. (ingresantes desde 2018) de la UNT según le corresponda, con su código y selecciona los cursos a matricularse e imprime la ORDEN DE PAGO."
          > </Pasos>
          <Pasos
            orden="3° Paso"
            subtitle="Con la orden de pago cancelará el monto en la entidad financiera y a la cuenta que se indica en la ORDEN DE PAGO."
          > </Pasos>
          <Pasos
            orden="4° Paso"
            subtitle="Después de cancelar en la entidad financiera, deberá colocar sus datos y N° de matrícula EN EL VOUCHER la cual dejará copia a fin de ser validado el pago realizado y finalizar la matrícula, dicho voucher deberá ser entregado junto con la constancia de evaluación docente (En secretaría)."
          > </Pasos>
          <Pasos
            orden="5° Paso"
            subtitle="Los alumnos deberán matricularse obligatoriamente en los cursos que tienen desaprobados (4°, 3° y 2° matrícula) respectivamente, en cumplimiento del Art. 30 del Reglamento de Evaluación del Aprendizaje."
          > </Pasos>
          <Pasos
            orden="6° Paso"
            subtitle="Los alumnos que se matriculen en cursos de: 3° y/o 4° matrícula, menos de 12 créditos (Matrícula especial por mínimo de créditos), Reinician Estudios y Exoneración de Pago, deben solicitar su Resolución vía mesa de partes virtual de la Facultad, con la debida anticipación."
          > </Pasos>
          <Pasos
            orden="7° Paso"
            subtitle="La matrícula EXCEPCIONAL (más de 22 créditos) es para estudiantes que en el semestre anterior (2024- I) hayan obtenido promedio ponderado igual o mayor de 16 y deben solicitar su AUTORIZACION en el Decanato. Art. 6° y 7° Normatividad Académica."
          > </Pasos>
          <Pasos
            orden="8° Paso"
            subtitle="Los alumnos para Retirar y Reservar Matrícula, deben de registrar primero matrícula y luego tienen hasta 30 días para solicitar el Retiro y Reserva de la matrícula efectuada."
          > </Pasos>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-[-1]">
        <svg
          width="239"
          height="601"
          viewBox="0 0 239 601"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-184.451"
            y="600.973"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -184.451 600.973)"
            fill="url(#paint0_linear_93:235)"
          />
          <rect
            opacity="0.3"
            x="-188.201"
            y="385.272"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -188.201 385.272)"
            fill="url(#paint1_linear_93:235)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_93:235"
              x1="-90.1184"
              y1="420.414"
              x2="-90.1184"
              y2="1131.65"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_93:235"
              x1="-159.441"
              y1="204.714"
              x2="-159.441"
              y2="915.952"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Content;
