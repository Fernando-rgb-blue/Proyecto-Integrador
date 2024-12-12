import { Course } from "@/types/course";

const courses: Course[] = [
    // Ciclo I
    { id: "13024", semester: 1, name: "Desarrollo personal", x: 59, y: 10, type: "G", hoursT: 2, hoursP: 2, hoursL: 0, credits: 3, prerequisites: [] },
    { id: "13029", semester: 1, name: "Lectura crítica y redacción de textos académicos", x: 238, y: 10, type: "G", hoursT: 2, hoursP: 2, hoursL: 0, credits: 3, prerequisites: [] },
    { id: "13027", semester: 1, name: "Física general", x: 417, y: 10, type: "G", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: [] },
    { id: "13021", semester: 1, name: "Algoritmos y programación", x: 596, y: 10, type: "O", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: [] },
    { id: "13023", semester: 1, name: "Desarrollo del pensamiento lógico matemático", x: 775, y: 10, type: "G", hoursT: 2, hoursP: 2, hoursL: 0, credits: 3, prerequisites: [] },
    { id: "13028", semester: 1, name: "Introducción al análisis matemático", x: 954, y: 10, type: "G", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: [] },
    { id: "13031", semester: 1, name: "Taller de liderazgo y trabajo en equipo", x: 1133, y: 10, type: "G", hoursT: 0, hoursP: 2, hoursL: 0, credits: 1, prerequisites: [] },

    // Ciclo II
    { id: "13040", semester: 2, name: "Ética, convivencia humana y ciudadanía", x: 59, y: 75, type: "G", hoursT: 2, hoursP: 2, hoursL: 0, credits: 3, prerequisites: [] },
    { id: "13043", semester: 2, name: "Sociedad, cultura y ecología", x: 238, y: 75, type: "G", hoursT: 2, hoursP: 2, hoursL: 0, credits: 3, prerequisites: [] },
    { id: "13036", semester: 2, name: "Cultura investigativa y pensamiento crítico", x: 417, y: 75, type: "G", hoursT: 2, hoursP: 2, hoursL: 0, credits: 3, prerequisites: [] },
    { id: "13039", semester: 2, name: "Estructura de datos", x: 596, y: 75, type: "O", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["13021"] },
    { id: "13038", semester: 2, name: "Estadística general", x: 775, y: 75, type: "G", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: [] },
    { id: "13034", semester: 2, name: "Análisis matemático", x: 954, y: 75, type: "G", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["13028"] },
    { id: "13046", semester: 2, name: "Taller de manejo de TIC", x: 1133, y: 75, type: "G", hoursT: 0, hoursP: 2, hoursL: 0, credits: 1, prerequisites: [] },

    // Ciclo III
    { id: "13629", semester: 3, name: "Geometría analítica", x: 59, y: 140, type: "O", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["13034"] },
    { id: "13630", semester: 3, name: "Paradigmas de lenguajes de programación", x: 417, y: 140, type: "O", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: [] },
    { id: "13631", semester: 3, name: "Estrategias algorítmicas", x: 596, y: 140, type: "B", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["13039"] },
    { id: "13632", semester: 3, name: "Matemática discreta", x: 775, y: 140, type: "O", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["13034"] },
    { id: "13633", semester: 3, name: "Física para ciencia de la computación", x: 954, y: 140, type: "O", hoursT: 2, hoursP: 0, hoursL: 2, credits: 3, prerequisites: ["13027"] },
    { id: "13634", semester: 3, name: "Análisis numérico", x: 1133, y: 140, type: "O", hoursT: 2, hoursP: 0, hoursL: 2, credits: 3, prerequisites: ["13034"] },

    // Ciclo IV
    { id: "13635", semester: 4, name: "Computación gráfica", x: 59, y: 205, type: "B", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["13039", "13629"] },
    { id: "13636", semester: 4, name: "Organización de archivos", x: 238, y: 205, type: "O", hoursT: 2, hoursP: 0, hoursL: 2, credits: 3, prerequisites: ["13039"] },
    { id: "13637", semester: 4, name: "Algoritmos y complejidad", x: 596, y: 205, type: "B", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["13631", "13632"] },
    { id: "13638", semester: 4, name: "Lenguajes formales y autómatas", x: 775, y: 205, type: "B", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["13632"] },
    { id: "13639", semester: 4, name: "Electrónica para computación", x: 954, y: 205, type: "O", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["13633"] },
    { id: "13640", semester: 4, name: "Innovación y emprendimiento", x: 1133, y: 205, type: "O", hoursT: 2, hoursP: 2, hoursL: 0, credits: 3, prerequisites: [] },

    // Ciclo V
    { id: "13641", semester: 5, name: "Base de datos I", x: 238, y: 270, type: "B", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["13636"] },
    { id: "13642", semester: 5, name: "Ingeniería de software I", x: 417, y: 270, type: "B", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["13630"] },
    { id: "13643", semester: 5, name: "Inteligencia artificial I", x: 596, y: 270, type: "B", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["13637"] },
    { id: "13644", semester: 5, name: "Compiladores", x: 775, y: 270, type: "B", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["13638"] },
    { id: "13645", semester: 5, name: "Técnicas digitales para computación", x: 954, y: 270, type: "O", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["13639"] },
    { id: "13646", semester: 5, name: "Metodología de la investigación científica", x: 1133, y: 270, type: "O", hoursT: 2, hoursP: 0, hoursL: 0, credits: 2, prerequisites: [] },

    // Ciclo VI
    { id: "14068", semester: 6, name: "Computación gráfica avanzada", x: 59, y: 335, type: "B", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["13635"] },
    { id: "14069", semester: 6, name: "Base de datos II", x: 238, y: 335, type: "B", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["13641"] },
    { id: "14070", semester: 6, name: "Ingeniería de software II", x: 417, y: 335, type: "B", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["13642"] },
    { id: "14071", semester: 6, name: "Inteligencia artificial II", x: 596, y: 335, type: "B", hoursT: 0, hoursP: 2, hoursL: 2, credits: 2, prerequisites: ["13643"] },
    { id: "14072", semester: 6, name: "Comunicación de datos", x: 775, y: 335, type: "O", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["13645"] },
    { id: "14073", semester: 6, name: "Arquitectura y organización de computadoras", x: 954, y: 335, type: "B", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["13645"] },

    // Ciclo VII
    { id: "14074", semester: 7, name: "Base de datos avanzada", x: 238, y: 400, type: "B", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["14069"] },
    { id: "14075", semester: 7, name: "Desarrollo de software", x: 417, y: 400, type: "B", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["14070"] },
    { id: "14076", semester: 7, name: "Percepción y visión por computadora", x: 596, y: 400, type: "B", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["14071"] },
    { id: "14077", semester: 7, name: "Redes de computadoras I", x: 775, y: 400, type: "B", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["14072"] },
    { id: "14078", semester: 7, name: "Sistemas operativos I", x: 954, y: 400, type: "B", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["14073"] },
    { id: "14079", semester: 7, name: "Gestión de proyectos informáticos", x: 1133, y: 400, type: "O", hoursT: 0, hoursP: 2, hoursL: 2, credits: 2, prerequisites: ["14070"] },

    // Ciclo VIII
    { id: "14080", semester: 8, name: "Robótica", x: 596, y: 465, type: "B", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["14071"] },
    { id: "14081", semester: 8, name: "Redes de computadoras II", x: 775, y: 465, type: "B", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["14077"] },
    { id: "14082", semester: 8, name: "Sistemas operativos II", x: 954, y: 465, type: "B", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["14078"] },
    { id: "14083", semester: 8, name: "Prácticas pre-profesionales", x: 1133, y: 465, type: "B", hoursT: 1, hoursP: 9, hoursL: 9, credits: 10, prerequisites: ["14068", "14069", "14070", "14071", "14072", "14073"] },

    // Ciclo IX
    { id: "14084", semester: 9, name: "Interacción humano computador", x: 59, y: 530, type: "B", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["14070"] },
    { id: "14085", semester: 9, name: "Tópicos en base de datos", x: 238, y: 530, type: "B", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["14069"] },
    { id: "INF34", semester: 9, name: "Tópicos en ingeniería de software", x: 417, y: 530, type: "B", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["14070"] },
    { id: "14087", semester: 9, name: "Ingeniería de software avanzada", x: 596, y: 530, type: "B", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["14070"] },
    { id: "14088", semester: 9, name: "Seguridad informática", x: 775, y: 530, type: "B", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["14081"] },
    { id: "14089", semester: 9, name: "Proyecto de tesis", x: 1133, y: 530, type: "O", hoursT: 1, hoursP: 2, hoursL: 0, credits: 2, creditRequirement: 176 },

    // Ciclo X
    { id: "14090", semester: 10, name: "Tópicos en tecnologías inmersivas", x: 59, y: 595, type: "B", hoursT: 2, hoursP: 2, hoursL: 2, credits: 4, prerequisites: ["14084"] },
    { id: "14091", semester: 10, name: "Sistemas de información", x: 417, y: 595, type: "B", hoursT: 2, hoursP: 0, hoursL: 2, credits: 3, prerequisites: ["14074", "14087"] },
    { id: "14092", semester: 10, name: "Ética para profesionales en informática", x: 596, y: 595, type: "O", hoursT: 2, hoursP: 2, hoursL: 0, credits: 3, prerequisites: ["13040"] },
    { id: "14093", semester: 10, name: "Proyecto de competencia", x: 775, y: 595, type: "B", hoursT: 0, hoursP: 2, hoursL: 2, credits: 2, prerequisites: [] },
    { id: "14094", semester: 10, name: "Proyecto integrador", x: 954, y: 595, type: "O", hoursT: 2, hoursP: 4, hoursL: 0, credits: 4, prerequisites: ["14081", "14079", "13640", "14075"] },
    { id: "INF43", semester: 10, name: "Tesis", x: 1133, y: 595, type: "O", hoursT: 0, hoursP: 2, hoursL: 0, credits: 1, prerequisites: ["14089"] },
];

export default courses;