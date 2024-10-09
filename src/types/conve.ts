type Ubicacion = {
    pais: string;
    image: string;
    direccionurl: string;
};

export type Convenios = {
    id: number;
    title: string;
    paragraph: string;
    image: string;
    ubicacion: Ubicacion;
    publishDate: string;
};