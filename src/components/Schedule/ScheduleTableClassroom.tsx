'use client';  
import React, { useEffect, useState } from "react";
import axios from "axios";
import BreadDash from "@/components/Common/BreadDash";
import DashboardTabs from "@/components/Dashboard/DashboardTabs";

interface ScheduleItem {
  available: number;
  courses: {
    course: string;
    professor: string;
    activity: string;
    classroom: string;
  }[];
}

const ScheduleTableClassroom: React.FC = () => {

  interface Aula {
    _id
    name: string;
  }

  const [schedule, setSchedule] = useState<Array<Array<ScheduleItem | null>>>(Array.from({ length: 14 }, () => Array(5).fill(null)));
  const [modalVisible, setModalVisible] = useState(false);
  const [cellIndex, setCellIndex] = useState<{ dayIndex: number; hourIndex: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [aula, setAula] = useState<Aula[]>([]);
  const [error, setError] = useState<string>("");
  const [selectedAula, setSelectedAula] = useState<string>("");
  const [docentes, setDocentes] = useState<any[]>([]);
  const colors = [
    "bg-gray-200",
    "bg-green-200",
    "bg-blue-300",
    "bg-orange-200",
    "bg-pink-200",
    "bg-yellow-200",
    "bg-red-300",
    "bg-lime-200",
    "bg-purple-300",
    "bg-teal-300",
    "bg-indigo-200",
    
  ];

  const courseColorMap: { [key: string]: string } = {};

  const getCourseColor = (courseName: string) => {
    const baseCourseName = courseName.split('/')[0].trim();
    if (!courseColorMap[baseCourseName]) {
      const colorIndex = Object.keys(courseColorMap).length % colors.length;
      courseColorMap[baseCourseName] = colors[colorIndex];
    }
    return courseColorMap[baseCourseName];
  };

  const days = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES"];
  const hours = [
    "07:00 AM a 08:00 AM", "08:00 AM a 09:00 AM", "09:00 AM a 10:00 AM",
    "10:00 AM a 11:00 AM", "11:00 AM a 12:00 PM", "12:00 PM a 01:00 PM",
    "01:00 PM a 02:00 PM", "02:00 PM a 03:00 PM",
    "03:00 PM a 04:00 PM", "04:00 PM a 05:00 PM",
    "05:00 PM a 06:00 PM", "06:00 PM a 07:00 PM",
    "07:00 PM a 08:00 PM", "08:00 PM a 09:00 PM",
  ];


  const handleSearch = async () => {
    try {
      if (!selectedAula) {
        throw new Error('Por favor, seleccione un aula');
      }
      setLoading(true);
      const response = await axios.get(`/api/scheduleclassroom?classroom=${selectedAula}`);
      
      if (response.status !== 200) {
        throw new Error('Error al buscar el horario');
      }
  
      const data = response.data;
      setSchedule(mapScheduleData(data, 14)); 
      setError(''); 
    } catch (err: any) {
      setSchedule(Array.from({ length: 14 }, () => Array(5).fill(null)));
  
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError('Esta aula de momento no cuenta con clases disponibles');
        } else {
          setError('Error al buscar el horario');
        }
      } else {
        setError(err.message || 'Error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const fetchAula = async () => {
      try {
        const response = await fetch("/api/classroom/");
        if (!response.ok) throw new Error("Error al obtener las aulas");
        const data = await response.json();
        setAula(data); 
      } catch (error: any) {
        setError(error.message);
      }
    };
    const fetchDocentes = async () => {
      try {
        const res = await fetch('/api/auth/signup');
        const data = await res.json();
        setDocentes(data.filter((u: any) => u.status === 'activo' && u.role !== 'admin'));
      } catch (e) {
        console.error(e);
      }
    };
    fetchDocentes();
    fetchAula();
  }, []);

  const mapScheduleData = (data: any, slotsPerDay: number) => {
    const updatedSchedule = Array.from({ length: slotsPerDay }, () => Array(5).fill(null));
    const daysMap = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];

    daysMap.forEach((day, dayIndex) => {
      if (data[day]) {
        data[day].forEach((slot: ScheduleItem, hourIndex: number) => {
          if (hourIndex < slotsPerDay) {
            updatedSchedule[hourIndex][dayIndex] = {
              courses: slot.courses.map(course => ({
                course: course.course || "",
                professor: course.professor || "",
                classroom: course.classroom || "",
                activity: course.activity || ""
              })),
              available: slot.available || 0
            };
          }
        });
      }
    });

    return updatedSchedule;
  };

  const getNombreDocente = (id: string) => {
    const d = docentes.find(dc => dc._id === id);
    return d ? d.fullname : id;
  };

  const handleDocenteAula = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const neweAula = e.target.value;
    setSelectedAula(neweAula);
  };

  const toggleCellSelection = (dayIndex: number, hourIndex: number) => {
    setCellIndex({ dayIndex, hourIndex });
    setModalVisible(true);
  };



  // Función para descargar imagen completa
  const handleDownload = async () => {
    // 1) Cargar html2canvas desde CDN si no está
    if (!window.html2canvas) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('No se pudo cargar html2canvas.'));
        document.body.appendChild(script);
      });
    }

    // 2) Seleccionar el div scrollable
    const original = document.querySelector('.overflow-x-auto') as HTMLElement;
    if (!original) {
      alert('No se encontró el horario para descargar.');
      return;
    }

    // 3) Clonar para quitar overflow y usar todo el ancho/alto
    const clone = original.cloneNode(true) as HTMLElement;
    const fullW = original.scrollWidth;
    const fullH = original.scrollHeight;

    clone.style.overflow = 'visible';
    clone.style.width = fullW + 'px';
    clone.style.height = fullH + 'px';
    clone.style.position = 'absolute';
    clone.style.top = '0';
    clone.style.left = '-9999px';
    document.body.appendChild(clone);

    // 4) Renderizar el clon con html2canvas
    const canvas = await window.html2canvas(clone, { scrollX: 0, scrollY: 0 });
    document.body.removeChild(clone);

    // 5) Descargar la imagen pipipi
    const link = document.createElement('a');
    link.download = 'horario.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <>
      <div className="container mx-auto px-4 pb-1 sm:px-6 lg:px-8 mt-4">
        <label htmlFor="aula" className="block text-lg font-medium mb-2">
          Aula
        </label>
        <div className="flex flex-wrap items-center gap-4">
          <select
            id="aula"
            value={selectedAula}
            onChange={handleDocenteAula}
            className="p-2 border border-gray-300 rounded-lg w-full sm:w-auto dark:bg-dark"
          >
            <option value="">Seleccionar Aula</option>
            {aula.map((classroom) => (
              <option key={classroom._id} value={classroom.name}>
                {classroom.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto"
          >
            Buscar
          </button>
        </div>

        {error && (
          <div className="flex justify-center items-center mt-8">
            <p className="text-center text-gray-300 text-lg">{error}</p>
          </div>
        )}
      </div>

      {/* <div className="flex justify-center mb-4">
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto"
        >
          Buscar
        </button>
      </div> */}

      {loading && <p className="text-blue-500 text-center">Cargando horario...</p>}

      <div className="container mx-auto mt-10 mb-8 p-4">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] sm:min-w-[600px] table-auto border-collapse border border-gray-500 dark:bg-dark">
            <thead>
              <tr>
                <th className="bg-blue-800 text-white p-3 text-xs sm:text-base border-[4px] border-gray-500 dark:border-black w-[120px] sm:w-[150px] text-center">
                  HORAS
                </th>
                {days.map((day, index) => (
                  <th
                    key={index}
                    className="bg-blue-800 text-white p-3 text-xs sm:text-base border-[4px] border-gray-500 dark:border-black w-[120px] sm:w-[150px] text-center"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((hour, hourIndex) => (
                <tr key={hourIndex}>
                  <td className="p-2 text-center border-[4px] border-gray-500 dark:border-black text-sm">
                    {hour}
                  </td>
                  {days.map((_, dayIndex) => {
                    const currentCell = schedule[hourIndex][dayIndex];

                    // Lógica para evitar combinar celdas vacías
                    if (
                      hourIndex > 0 &&
                      schedule[hourIndex - 1][dayIndex] &&
                      JSON.stringify(schedule[hourIndex - 1][dayIndex]) === JSON.stringify(currentCell) &&
                      currentCell && currentCell.courses.length > 0
                    ) {
                      return null; // No renderizar la celda repetida si tiene contenido igual
                    }

                    // Calcular rowSpan solo si la celda actual tiene contenido
                    let rowSpan = 1;
                    if (currentCell && currentCell.courses.length > 0) {
                      for (let i = hourIndex + 1; i < hours.length; i++) {
                        if (
                          schedule[i][dayIndex] &&
                          JSON.stringify(schedule[i][dayIndex]) === JSON.stringify(currentCell) &&
                          schedule[i][dayIndex].courses.length > 0
                        ) {
                          rowSpan++;
                        } else {
                          break;
                        }
                      }
                    }

                    // Mostrar celda vacía si no tiene contenido
                    if (!currentCell || currentCell.courses.length === 0) {
                      return (
                        <td
                          key={`${hourIndex}-${dayIndex}`}
                          className="border-[4px] border-gray-500 dark:border-black text-center"
                        >
                          {/* Celda vacía sin contenido */}
                        </td>
                      );
                    }

                    return (
                      <td
                        key={`${hourIndex}-${dayIndex}`}
                        className={`text-center align-middle border-[4px] border-gray-500 dark:border-black text-sm whitespace-normal ${currentCell && currentCell.available === 1 && currentCell.courses[0]?.course
                            ? getCourseColor(currentCell.courses[0].course)
                            : ""
                          }`}

                        rowSpan={rowSpan}
                        onClick={() => toggleCellSelection(dayIndex, hourIndex)}
                      >
                        {currentCell.courses.map((course, index) => (
                          <div key={index} className="text-xs dark:text-dark">
                            <p className=" font-bold ">{course.course}</p>
                            <p className="pr-1 pl-1 ">{getNombreDocente(course.professor)}</p>
                            <p>{course.activity}</p>
                            <p className="mb-2 ">{course.classroom}</p>
                          </div>
                        ))}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* BOTÓN DE DESCARGAR ABAJO */}
        
      </div>
      <div className="flex justify-center mb-10">
          <button
            onClick={handleDownload}
            className="bg-green-500 text-white px-6 py-3 rounded shadow-md hover:bg-green-600 transition"
          >
            Descargar horario
          </button>
        </div>
    </>
  );
};

export default ScheduleTableClassroom;

// Para TypeScript evite errores y no moleste =:v
declare global {
  interface Window {
    html2canvas?: any;
  }
}