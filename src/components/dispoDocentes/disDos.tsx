"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Docente {
    _id: string;
    fullname?: string;
}

interface Curso {
    _id: string;
    nombre: string;
}

const ScheduleDisDos: React.FC = () => {
    const { data: session, status } = useSession();
    const [docentes, setDocentes] = useState<Docente[]>([]);
    const [message, setMessage] = useState<string>("");
    const [selectedDocenteId, setSelectedDocenteId] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<string>("");
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [schedule, setSchedule] = useState<number[][]>(
        Array.from({ length: 5 }, () => Array(14).fill(0))
    );

    const days = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES"];
    const hours = [
        "07:00 AM a 08:00 AM", "08:00 AM a 09:00 AM", "09:00 AM a 10:00 AM",
        "10:00 AM a 11:00 AM", "11:00 AM a 12:00 PM", "12:00 PM a 01:00 PM",
        "01:00 PM a 02:00 PM", "02:00 PM a 03:00 PM", "03:00 PM a 04:00 PM", "04:00 PM a 05:00 PM",
        "05:00 PM a 06:00 PM", "06:00 PM a 07:00 PM", "07:00 PM a 08:00 PM",
        "08:00 PM a 09:00 PM",
    ];

    useEffect(() => {
        const fetchDocentes = async () => {
            try {
                const response = await fetch("/api/auth/signup/");
                if (!response.ok) throw new Error("Error al obtener los docentes");
                const data = await response.json();
                const filtered = data.filter(
                    (docente: any) => docente.role !== "admin" && docente.status === "activo"
                );
                setDocentes(filtered);
            } catch (error) {
                console.error("Error al obtener los docentes:", error);
            }
        };
        fetchDocentes();
    }, []);

    const handleDocenteChange = async (docenteId: string) => {
        setSelectedDocenteId(docenteId);
        const selected = docentes.find((d) => d._id === docenteId);
        if (!selected) return;

        setInputValue(selected.fullname || "");

        try {
            const responseCursos = await fetch(
                `/api/course/searcht?profesores=${docenteId}`
            );
            if (!responseCursos.ok) throw new Error("Error al obtener los cursos del docente");
            const cursosData: Curso[] = await responseCursos.json();
            setCursos(cursosData);

            const coursesMessage = cursosData.length
                ? `El docente elegido tiene los siguientes cursos asignados: ${cursosData
                      .map((c) => c.nombre)
                      .join(" - ")}.`
                : "El docente elegido no tiene cursos asignados.";
            setMessage(coursesMessage);

            const responseSchedule = await fetch(`/api/schedule/${docenteId}`);
            if (!responseSchedule.ok) throw new Error("Error al obtener el horario");
            const userSchedule = await responseSchedule.json();

            if (userSchedule) {
                setSchedule([
                    userSchedule.lunes,
                    userSchedule.martes,
                    userSchedule.miercoles,
                    userSchedule.jueves,
                    userSchedule.viernes,
                ]);
            }
        } catch (error) {
            setSchedule(Array.from({ length: 14 }, () => Array(5).fill(null)));
            console.error("Error al obtener los datos:", error);
        }
    };

    // Filtrado de los profes
    const filteredDocentes = docentes.filter((d) =>
        (d.fullname || "").toLowerCase().includes(inputValue.toLowerCase())
    );

    if (status === "loading") return <div>Cargando...</div>;
    if (!session) return <div>No estás autenticado. Por favor, inicia sesión.</div>;

    return (
        <div className="container mx-auto mt-1 mb-10 p-4">
            <div className="mb-6">
                <label htmlFor="docente-search" className="block text-lg font-medium mb-2">
                    Docente
                </label>
                <div className="relative w-full sm:w-72">
                    <input
                        type="text"
                        id="docente-search"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setSelectedDocenteId(null);
                            setIsFocused(true);
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                        placeholder="Escribe el nombre del docente..."
                        className="p-2 border border-gray-300 rounded-lg w-full dark:bg-dark"
                    />
                    {isFocused && (
                        <ul className="absolute z-10 mt-1 w-full max-h-48 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-md dark:bg-slate-800">
                            {filteredDocentes.length > 0 ? (
                                filteredDocentes.map((docente) => (
                                    <li
                                        key={docente._id}
                                        onClick={() => {
                                            handleDocenteChange(docente._id);
                                            setIsFocused(false);
                                        }}
                                        className="cursor-pointer px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-700"
                                    >
                                        {docente.fullname || "Sin nombre"}
                                    </li>
                                ))
                            ) : (
                                <li className="px-3 py-2 text-sm text-gray-500 dark:text-gray-300">
                                    No se encontraron docentes.
                                </li>
                            )}
                        </ul>
                    )}
                </div>
            </div>

            {message && (
                <div className="mb-6 text-base font-medium leading-relaxed text-body-color sm:text-lg lg:text-base xl:text-lg">
                    {message}
                </div>
            )}

            <div className="overflow-x-auto sm:flex sm:flex-wrap justify-center">
            <table className="w-full sm:w-11/12 md:w-8/12 table-auto border-collapse border border-gray-300">
              <thead>
                  <tr>
                    <th className="bg-blue-800 text-white p-3 text-xs sm:text-base border border-gray-300 w-1/6">
                        HORARIO
                    </th>
                  {days.map((day, index) => (
                      <th
                      key={index}
                      className="bg-blue-800 text-white p-3 text-xs sm:text-base border border-gray-300 w-1/6"
                      >
                      {day}
                      </th>
                  ))}
                  </tr>
              </thead>
              <tbody>
                  {hours.map((hour, hourIndex) => (
                  <tr key={hourIndex}>
                      <td className="p-3 text-xs sm:text-base border border-gray-300 bg-blue-50 text-center whitespace-nowrap w-1/6 dark:bg-dark">
                      {hour}
                      </td>
                      {days.map((_, dayIndex) => {
                      const isSelected = schedule[dayIndex][hourIndex] === 1;
                      return (
                          <td
                          key={dayIndex}
                          className={`p-3 border border-gray-300 text-center cursor-pointer text-xs dark:bg-dark sm:text-base ${isSelected
                              ? "bg-blue-300 dark:bg-gray-500"
                              : "bg-blue-50"
                              }`}
                          
                          />
                      );
                      })}
                  </tr>
                  ))}
              </tbody>
              </table>
            </div>
        </div>
    );
};

export default ScheduleDisDos;