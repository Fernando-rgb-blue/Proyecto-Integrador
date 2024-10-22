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
    path: "/about",
    newTab: false,
  },
  {
    id: 3,
    title: "Currículos",
    path: "/blog",
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
        path: "http://suv2.unitru.edu.pe/portal/index.php",
        newTab: true,
      },
      {
        id: 53,
        title: "Aula virtual unt",
        path: "https://aulavirtual2.unitru.edu.pe/login/index.php",
        newTab: true,
      },
      {
        id: 55,
        title: "Cronograma académico",
        path: "/error",
        newTab: false,
      },
      {
        id: 55,
        title: "Horarios",
        path: "/blog-sidebar",
        newTab: false,
      },
      {
        id: 56,
        title: "Accede al FUT",
        path: "/blog-details",
        newTab: false,
      },
      {
        id: 57,
        title: "Perfil del Egresado",
        path: "/blog-details",
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
        title: "Documentos Acreditación",
        path: "/acreditacion",
        newTab: false,
      },
    ],
  },
];
export default menuData;
