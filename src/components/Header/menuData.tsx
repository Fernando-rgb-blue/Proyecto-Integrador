import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Inicio",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Nosotros",
    path: "/nosotros",
    newTab: false,
  },
  {
    id: 3,
    title: "Currículos",
    path: "/curriculos",
    newTab: false,
  },
  {
    id: 4,
    title: "Plana Docente",
    path: "/plana-docente",
    newTab: false,
  },
  {
    id: 5,
    title: "Más",
    newTab: false,
    submenu: [
      {
        id: 51,
        title: "SGA",
        path: "http://aplicaciones.unitru.edu.pe/",
        newTab: true,
      },
      {
        id: 52,
        title: "SUV",
        path: "http://suv2.unitru.edu.pe",
        newTab: true,
      },
      {
        id: 53,
        title: "Aula virtual UNT",
        path: "https://aulavirtual2.unitru.edu.pe",
        newTab: true,
      },
      {
        id: 55,
        title: "Horarios",
        path: "/dashboard/schedule-ad",
        newTab: false,
      },
      {
        id: 56,
        title: "Formato Único de Tramite (FUT)",
        path: "/fut",
        newTab: false,
      },
      {
        id: 57,
        title: "Perfil del Egresado",
        path: "/perfil-egresado",
        newTab: false,
      },
      {
        id: 58,
        title: "Tasas educativas",
        path: "https://transparencia.unitru.edu.pe/doc/TUSNE/Anexo%20Oficio%20015-2019%20Tasas%20UNT%202019.pdf",
        newTab: true,
      },
      {
        id: 59,
        title: "Sustitutorio",
        path: "/error",
        newTab: false,
      },
      {
        id: 60,
        title: "Encuestas ",
        path: "https://encuestas.unitru.edu.pe/",
        newTab: true,
      },
      {
        id: 61,
        title: "Indicaciones de Matrícula ",
        path: "/matricula",
        newTab: false,
      },
      {
        id: 62,
        title: "Documentos Acreditación",
        path: "/acreditacion",
        newTab: false,
      },
    ],
  },
];
export default menuData;
