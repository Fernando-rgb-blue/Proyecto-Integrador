export type Course = { // ESTO ES PARA LA MALLA CURRÍCULAR, NO PARA LOS CURSOS EN LOS HORARIOS
    id: string;
    semester: number;
    name: string;
    x: number;
    y: number;
    type: string;
    hoursT: number;
    hoursP: number;
    hoursL: number;
    credits: number;
    creditRequirement?: number;
    prerequisites?: string[];
};