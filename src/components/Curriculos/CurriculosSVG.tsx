'use client';
import { useEffect, useState } from "react";
import courses from "./CurriculaData";
import { Course } from "@/types/course";
import Image from "next/image";

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
            return "#228B22"
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
        <>
        <div className="overflow-x-auto pb-3">
            <svg width="1420" height="647" className="border border-gray-800 dark:border-gray-400 mx-auto mt-2 mb-5 select-none">
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
                                    <tspan key={index} x={course.x + 58} dy={index === 0 ? (lines.length - 1) * -6 : 12}>
                                        {line}
                                    </tspan>
                                ))}
                            </text>

                            <text
                                x={course.x + 119.5}
                                y={course.y + 11}
                                fontSize="10"
                                fontWeight="bold"
                            >
                                T
                            </text>
                            <text
                                x={course.x + 119.5}
                                y={course.y + 25}
                                fontSize="10"
                                fontWeight="bold"
                            >
                                P
                            </text>
                            <text
                                x={course.x + 119.5}
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
            <div className="max-w-full xl:flex justify-between gap-5 mx-auto px-12">
                <div className="text-center xl:text-left mb-10 xl:mb-0">
                    <h3 className="text-lg font-semibold mb-2">
                        Áreas de competencia
                    </h3>
                    <svg width="362" height="152" className="mx-auto">
                        <rect
                            x="1"
                            y="1"
                            width="360"
                            height="25"
                            fill="#33DDFF"
                            stroke="black"
                        />
                        <rect
                            x="1"
                            y="26"
                            width="360"
                            height="25"
                            fill="#33DDFF"
                            stroke="black"
                        />
                        <rect
                            x="1"
                            y="51"
                            width="360"
                            height="25"
                            fill="#33DDFF"
                            stroke="black"
                        />
                        <rect
                            x="1"
                            y="76"
                            width="360"
                            height="25"
                            fill="#33DDFF"
                            stroke="black"
                        />
                        <rect
                            x="1"
                            y="101"
                            width="360"
                            height="25"
                            fill="#33DDFF"
                            stroke="black"
                        />
                        <rect
                            x="1"
                            y="126"
                            width="360"
                            height="25"
                            fill="#33DDFF"
                            stroke="black"
                        />

                        <text
                            x="3"
                            y="18"
                            fontSize="13"
                            fill="black"
                        >
                            Algoritmos y complejidad
                        </text>
                        <text
                            x="3"
                            y="43"
                            fontSize="13"
                            fill="black"
                        >
                            Ingeniería de software
                        </text>
                        <text
                            x="3"
                            y="68"
                            fontSize="13"
                            fill="black"
                        >
                            Administración de la información
                        </text>
                        <text
                            x="3"
                            y="93"
                            fontSize="13"
                            fill="black"
                        >
                            Sistemas inteligentes
                        </text>
                        <text
                            x="3"
                            y="118"
                            fontSize="13"
                            fill="black"
                        >
                            Arquitectura de computadoras, redes y comunicaciones
                        </text>
                        <text
                            x="3"
                            y="143"
                            fontSize="13"
                            fill="black"
                        >
                            Gráficos, visualización e interacción humano-computador
                        </text>
                    </svg>
                </div>
                <div className="relative w-full max-w-[500px] aspect-[5/2] mx-auto">
  <Image
    src="/images/curriculos/curriculos_leyenda.png"
    alt="Leyenda de currículos"
    fill
    className="object-contain"
    sizes="(max-width: 768px) 100vw, 500px"
  />
</div>
                <div className="text-center xl:text-left">
                    <h3 className="text-lg font-semibold mb-2">
                        Total de créditos
                    </h3>
                    <svg width="362" height="62" className="mx-auto">
                        <rect
                            x="1"
                            y="1"
                            width="180"
                            height="30"
                            fill="#33DDFF"
                            stroke="black"
                        />
                        <rect
                            x="180"
                            y="1"
                            width="180"
                            height="30"
                            fill="#33DDFF"
                            stroke="black"
                        />
                        <rect
                            x="1"
                            y="31"
                            width="180"
                            height="30"
                            fill="white"
                            stroke="black"
                        />
                        <rect
                            x="180"
                            y="31"
                            width="180"
                            height="30"
                            fill="white"
                            stroke="black"
                        />

                        <text
                            x="21"
                            y="21.5"
                            fontSize="17"
                            fill="black"
                            fontWeight="bold"
                        >
                            Total de créditos
                        </text>
                        <text
                            x="196"
                            y="21.5"
                            fontSize="17"
                            fill="black"
                            fontWeight="bold"
                        >
                            Créditos mínimos
                        </text>
                        <text
                            x={creditCount < 10 ? "85" : (creditCount < 100 ? "80" : "76.5")}
                            y="52"
                            fontSize="17"
                            fill="black"
                            fontWeight="bold"
                        >
                            {creditCount}
                        </text>
                        <text
                            x="254"
                            y="51"
                            fontSize="17"
                            fill="black"
                            fontWeight="bold"
                        >
                            213
                        </text>
                    </svg>
                </div>
            </div>
        </div>
        </>
    );
}

export default CurriculosSVG;