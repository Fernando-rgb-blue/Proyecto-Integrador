import { Convenios } from "@/types/conve";

const conveData: Convenios[] = [
    {
        id: 1,
        title: "Universidad de Sao Paulo",
        paragraph:
        "Convenio entre el Instituto de Ciencias Matemáticas y de Computación de la Universidad de Sao Paulo - Brasil y la Universidad Nacional de Trujillo - Perú, el Cual consta de 08 cláusulas y tiene una vigencia de 5 años a partir de la fecha de aprobación del Consejo Universitario.",
        image: "/images/convenios/saopaulo.webp",
        ubicacion: {
            pais: "Brasil",
            image: "/images/convenios/brasil.webp",
            direccionurl: "https://drive.google.com/file/d/1anPQc1WXyiT6K7wynIptCqHquoZZB1dD/view?usp=sharing",
        },
        publishDate: "2024",
    },
    {
        id: 2,
        title: "Universidad Pablo de Olavide",
        paragraph:
        "Universidad pública española, situada en Sevilla, España. Destaca su oferta de grados, dobles grados y postgrados en campos como las Ciencias Jurídicas, Ciencias Sociales, Humanidades, Biotecnología, Ciencias Ambientales, Ciencias del Deporte e Informática.",
        image: "/images/convenios/Olavide.webp",
        ubicacion: {
            pais: "España",
            image: "/images/convenios/España.webp",
            direccionurl: "https://drive.google.com/file/d/1Oyt_zTgo0vTtlPmfw5decVIMpuK7fJt-/view?usp=sharing",
        },
        publishDate: "2024",
    },
    {
        id: 3,
        title: "Universidad de Guadalajara",
        paragraph:
        "Acuerdan realizar acciones de cooperación de intercambio de estudiantes y de personal académico, desarrollo de proyectos de investigación, intercambio de publicaciones y materiales de interés común, contempla también el diseño y organización de cursos, diplomados, programas, ente otros.",
        image: "/images/convenios/guadalajara.webp",
        ubicacion: {
            pais: "México",
            image: "/images/convenios/Mexico.webp",
            direccionurl: "https://drive.google.com/file/d/1Rh7pXrm2YjWowygvcW8ZKznxOIKmOej2/view?usp=sharing",
        },
        publishDate: "2024",
    },
];
export default conveData;
