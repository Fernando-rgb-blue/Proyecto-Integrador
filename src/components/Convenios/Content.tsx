import { Convenios } from "@/types/conve";

const conveData: Convenios[] = [
    {
        id: 1,
        title: "Escuela Politécnica de la Universidad de Sao Paulo",
        paragraph:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet dictum neque, laoreet dolor.",
        image: "/images/convenios/saopaulo.webp",
        ubicacion: {
            pais: "Brasil",
            image: "/images/convenios/brasil.webp",
            direccionurl: "https://www.google.com/",
        },
        publishDate: "2020",
    },
    {
        id: 2,
        title: "Universidad Bernardo O'Higgins",
        paragraph:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet dictum neque, laoreet dolor.",
        image: "/images/convenios/Bernardo.webp",
        ubicacion: {
            pais: "Chile",
            image: "/images/convenios/chile.webp",
            direccionurl: "https://www.google.com/",
        },
        publishDate: "2022",
    },
    {
        id: 3,
        title: "Universidad Católica Toribio de Mogrovejo",
        paragraph:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet dictum neque, laoreet dolor.",
        image: "/images/convenios/catolicaM.webp",
        ubicacion: {
            pais: "Perú",
            image: "/images/convenios/Peru.webp",
            direccionurl: "https://www.google.com/",
        },
        publishDate: "2023",
    },
];
export default conveData;
