'use client';
import { useEffect, useState } from "react";

type Course = {
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

const CurriculosSVG = () => {
    const [completedCourses, setCompletedCourses] = useState<string[]>([]);
    const [creditCount, setCreditCount] = useState<number>(0);
    const [requisitosCompetencia, setRequisitosCompetencia] = useState<{[index: string]: string[]}>({});
    const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);
    const creditCourses = courses.filter((c) => c.creditRequirement);

    const getPrerequisites = (courseId: string) => {
        const course = courses.find((c) => c.id === courseId);
        return course?.prerequisites || [];
    }

    const getDependents = (courseId: string) => {
        return courses.filter((c) => c.prerequisites?.includes(courseId)).map((c) => c.id)
    }

    const getHighlight = (courseId: string) => {
        if (!hoveredCourse) return null;
        if (hoveredCourse === courseId) {
            return "lightgray";
        }
        if (getPrerequisites(hoveredCourse).includes(courseId)) {
            return "#ff8888";
        }
        if (getDependents(hoveredCourse).includes(courseId)) {
            return "lightgreen"
        }
    }

    const removeDependents = (id: string) => {
        const dependents = courses.filter((c) => 
            (c.prerequisites?.includes(id) || requisitosCompetencia[c.id]?.includes(id)) ||
            (c.creditRequirement && creditCount < c.creditRequirement)
        );
        dependents.forEach((dependent) => {
            if (completedCourses.includes(dependent.id)) {
                setCompletedCourses((prev) => prev.filter((completed) => completed !== dependent.id));
                removeDependents(dependent.id);
            }
        });
    }

    useEffect(() => {
        const creditSum = completedCourses.map((courseId) => {
            return courses.find((c) => c.id === courseId).credits;
        }).reduce((acc, credit) => acc + credit, 0);
        setCreditCount(creditSum);

        creditCourses.forEach((creditCourse) => {
            if (creditCourse.creditRequirement && completedCourses.includes(creditCourse.id) && creditSum < creditCourse.creditRequirement) {
                setCompletedCourses((prev) => prev.filter((id) => id !== creditCourse.id));
                removeDependents(creditCourse.id);
            }
        });
    }, [completedCourses]);

    const toggleCourse = (courseId: string) => {
        const course = courses.find((c) => c.id === courseId);

        if (!course) {
            console.error(`Course with id ${courseId} not found.`);
            return;
        }

        if (completedCourses.includes(courseId)) {
            setCompletedCourses((prev) => prev.filter((id) => id !== courseId));

            removeDependents(courseId);
        } else {
            if (isCourseEnabled(course)) {
                setCompletedCourses((prev) => [...prev, courseId]);
            }
        }
    }

    const isCourseEnabled = (course: Course): boolean => {
        const prerequisiteCourses = course.prerequisites || requisitosCompetencia[course.id] || [];
        const hasPrerequisites = prerequisiteCourses.every((prereq) => completedCourses.includes(prereq));

        const meetsCreditRequirement = course.creditRequirement === undefined || creditCount >= course.creditRequirement;

        return hasPrerequisites && meetsCreditRequirement;
    }

    const toggleSemesterCourses = (semester: number) => {
        const semesterCourses = courses.filter((course) => course.semester === semester && isCourseEnabled(course)).map((c) => c.id);
        const allSemesterActive = semesterCourses.every((id) => completedCourses.includes(id));

        if (allSemesterActive) {
            semesterCourses.forEach((courseId) => {
                if (completedCourses.includes(courseId)) {
                    toggleCourse(courseId);
                }
            });
        } else {
            semesterCourses.forEach((courseId) => {
                if (!completedCourses.includes(courseId) && isCourseEnabled(courses.find((c) => c.id === courseId))) {
                    setCompletedCourses((prev) => [...prev, courseId]);
                }
            });
        }
    }

    const splitLines = (courseName: string) => {
        const words = courseName.split(" ");
        const lines: string[] = [];
        let currentLine = "";

        words.forEach((word) => {
            if ((currentLine + word).length > 18) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine += (currentLine ? ' ' : '') + word;
            }
        });

        if (currentLine) {
            lines.push(currentLine);
        }

        return lines;
    }

    const getSemesterData = (semester: number) => {
        const semesterArray = courses.filter((c) => c.semester === semester);
        const sumHoursT = semesterArray.map((s) => s.hoursT).reduce((sum, hours) => sum + hours, 0);
        const sumHoursP = semesterArray.map((s) => s.hoursP).reduce((sum, hours) => sum + hours, 0);
        const sumHoursL = semesterArray.map((s) => s.hoursL).reduce((sum, hours) => sum + hours, 0);
        const sumHoursTotal = sumHoursT + sumHoursP + sumHoursL;
        const sumCredits = semesterArray.map((s) => s.credits).reduce((sum, credits) => sum + credits, 0);

        return [sumHoursT, sumHoursP, sumHoursL, sumHoursTotal, sumCredits];
    }

    return (
        <svg width="1420" height="647" className="border mx-auto mt-2 mb-5 select-none">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <g
                key={value}
                onClick={() => toggleSemesterCourses(value)}
                style={{ cursor: "pointer" }}
                >
                    <rect
                    x="10"
                    y={((value - 1) * 65) + 10}
                    width="28"
                    height="42"
                    fill="white"
                    stroke="black"
                    />
                    <text
                    x={(value) < 10 ? "18" : "13"}
                    y={((value - 1) * 65) + 37}
                    fontSize="20"
                    fontWeight="bold"
                    >
                        {value}
                    </text>
                    <rect
                    x="7"
                    y={((value - 1) * 65) + 7}
                    width="34"
                    height="48"
                    fill="black"
                    className="opacity-0 hover:opacity-20"
                    />
                </g>
            ))}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
                const semesterData = getSemesterData(value);
                return (
                    <g
                    key={value}
                    >
                        <rect
                            x="1312"
                            y={((value - 1) * 65) + 10}
                            width="14"
                            height="14"
                            fill="white"
                            stroke="black"
                        />
                        <rect
                            x="1312"
                            y={((value - 1) * 65) + 24}
                            width="14"
                            height="14"
                            fill="white"
                            stroke="black"
                        />
                        <rect
                            x="1312"
                            y={((value - 1) * 65) + 38}
                            width="14"
                            height="14"
                            fill="white"
                            stroke="black"
                        />
                        <rect
                            x="1326"
                            y={((value - 1) * 65) + 10}
                            width="14"
                            height="14"
                            fill="white"
                            stroke="black"
                        />
                        <rect
                            x="1326"
                            y={((value - 1) * 65) + 24}
                            width="14"
                            height="14"
                            fill="white"
                            stroke="black"
                        />
                        <rect
                            x="1326"
                            y={((value - 1) * 65) + 38}
                            width="14"
                            height="14"
                            fill="white"
                            stroke="black"
                        />
                        <rect
                            x="1340"
                            y={((value - 1) * 65) + 10}
                            width="28"
                            height="14"
                            fill="white"
                            stroke="black"
                        />
                        <rect
                            x="1340"
                            y={((value - 1) * 65) + 24}
                            width="28"
                            height="28"
                            fill="white"
                            stroke="black"
                        />
                        <rect
                            x="1368"
                            y={((value - 1) * 65) + 10}
                            width="42"
                            height="14"
                            fill="lightgray"
                            stroke="black"
                        />
                        <rect
                            x="1368"
                            y={((value - 1) * 65) + 24}
                            width="42"
                            height="28"
                            fill="lightgray"
                            stroke="black"
                        />

                        <text
                            x="1315"
                            y={((value - 1) * 65) + 21}
                            fontSize="10"
                            fontWeight="bold"
                        >
                            T
                        </text>
                        <text
                            x="1315"
                            y={((value - 1) * 65) + 35}
                            fontSize="10"
                            fontWeight="bold"
                        >
                            P
                        </text>
                        <text
                            x="1315"
                            y={((value - 1) * 65) + 49}
                            fontSize="10"
                            fontWeight="bold"
                        >
                            L
                        </text>
                        <text
                            x={semesterData[0] < 10 ? "1330" : "1328"}
                            y={((value - 1) * 65) + 21}
                            fontSize="10"
                        >
                            {semesterData[0]}
                        </text>
                        <text
                            x={semesterData[1] < 10 ? "1330" : "1328"}
                            y={((value - 1) * 65) + 35}
                            fontSize="10"
                        >
                            {semesterData[1]}
                        </text>
                        <text
                            x={semesterData[2] < 10 ? "1330" : "1328"}
                            y={((value - 1) * 65) + 49}
                            fontSize="10"
                        >
                            {semesterData[2]}
                        </text>
                        <text
                            x="1350"
                            y={((value - 1) * 65) + 21}
                            fontSize="10"
                            fontWeight="bold"
                        >
                            H
                        </text>
                        <text
                            x="1348"
                            y={((value - 1) * 65) + 41}
                            fontSize="10"
                        >
                            {semesterData[3]}
                        </text>
                        <text
                            x="1385"
                            y={((value - 1) * 65) + 21}
                            fontSize="10"
                            fontWeight="bold"
                        >
                            C
                        </text>
                        <text
                            x="1383"
                            y={((value - 1) * 65) + 41}
                            fontSize="10"
                            fontWeight="bold"
                        >
                            {semesterData[4]}
                        </text>
                    </g>
                );
            })}
            {courses.map((course) => {
                const lines = splitLines(course.name);
                const highlightColor = getHighlight(course.id);
                return (
                    <g
                    key={course.id}
                    onClick={() => toggleCourse(course.id)}
                    onMouseEnter={() => setHoveredCourse(course.id)}
                    onMouseLeave={() => setHoveredCourse(null)}
                    style={{ cursor: isCourseEnabled(course) ? "pointer" : "not-allowed" }}
                    fillOpacity={!isCourseEnabled(course) ? 0.3 : 1}
                    >
                        <rect
                            x={course.x}
                            y={course.y}
                            width="116"
                            height="42"
                            fill={course.type === 'G' ? '#66FF66' : (course.type === 'O' ? '#FF9900' : '#33DDFF')}
                            stroke="black"
                        />

                        <rect
                            x={course.x + 116}
                            y={course.y}
                            width="14"
                            height="14"
                            fill="white"
                            stroke="black"
                        />
                        <rect
                            x={course.x + 116}
                            y={course.y + 14}
                            width="14"
                            height="14"
                            fill="white"
                            stroke="black"
                        />
                        <rect
                            x={course.x + 116}
                            y={course.y + 28}
                            width="14"
                            height="14"
                            fill="white"
                            stroke="black"
                        />
                        <rect
                            x={course.x + 130}
                            y={course.y}
                            width="14"
                            height="14"
                            fill="white"
                            stroke="black"
                        />
                        <rect
                            x={course.x + 130}
                            y={course.y + 14}
                            width="14"
                            height="14"
                            fill="white"
                            stroke="black"
                        />
                        <rect
                            x={course.x + 130}
                            y={course.y + 28}
                            width="14"
                            height="14"
                            fill="white"
                            stroke="black"
                        />
                        <rect
                            x={course.x + 144}
                            y={course.y}
                            width="14"
                            height="14"
                            fill="white"
                            stroke="black"
                        />
                        <rect
                            x={course.x + 144}
                            y={course.y + 14}
                            width="14"
                            height="28"
                            fill="white"
                            stroke="black"
                        />

                        <rect
                            x={course.x}
                            y={course.y}
                            width="158"
                            height="42"
                            fill="black"
                            fillOpacity={(isCourseEnabled(course) && !completedCourses.includes(course.id)) ? 0.4 : 0}
                        />

                        <text
                            y={course.y + 25}
                            textAnchor="middle"
                            fontSize="11"
                        >
                            {lines.map((line, index) => (
                                <tspan key={index} x={course.x + 58} dy={index === 0 ? (lines.length - 1) * -6 : 11}>
                                    {line}
                                </tspan>
                            ))}
                        </text>

                        <text
                            x={course.x + 119}
                            y={course.y + 11}
                            fontSize="10"
                            fontWeight="bold"
                        >
                            T
                        </text>
                        <text
                            x={course.x + 119}
                            y={course.y + 25}
                            fontSize="10"
                            fontWeight="bold"
                        >
                            P
                        </text>
                        <text
                            x={course.x + 119}
                            y={course.y + 39}
                            fontSize="10"
                            fontWeight="bold"
                        >
                            L
                        </text>
                        <text
                            x={course.x + 134}
                            y={course.y + 11}
                            fontSize="10"
                        >
                            {course.hoursT === 0 ? '' : course.hoursT}
                        </text>
                        <text
                            x={course.x + 134}
                            y={course.y + 25}
                            fontSize="10"
                        >
                            {course.hoursP === 0 ? '' : course.hoursP}
                        </text>
                        <text
                            x={course.x + 134}
                            y={course.y + 39}
                            fontSize="10"
                        >
                            {course.hoursL === 0 ? '' : course.hoursL}
                        </text>
                        <text
                            x={course.x + 147}
                            y={course.y + 11}
                            fontSize="10"
                            fontWeight="bold"
                        >
                            C
                        </text>
                        <text
                            x={course.x + (course.credits < 10 ? 148 : 146)}
                            y={course.y + 31}
                            fontSize="10"
                        >
                            {course.credits}
                        </text>

                        <rect
                            x={course.x - 3}
                            y={course.y - 3}
                            width="164"
                            height="48"
                            fill={highlightColor}
                            fillOpacity={highlightColor ? 0.5 : 0}
                        />
                    </g>
                );
            })}
        </svg>
    );
}

export default CurriculosSVG;