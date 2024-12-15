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

const ScheduleTable: React.FC = () => {

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
  const colors = [
    "bg-gray-200",
    "bg-green-200",
    "bg-blue-200",
    "bg-orange-200",
    "bg-pink-200",
    "bg-red-200",
    "bg-lime-200",
    "bg-purple-300",
    "bg-teal-200",  
    "bg-indigo-200", 
    "bg-yellow-200", 
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
      const response = await axios.get(
        `http://localhost:3000/api/scheduleclassroom?classroom=${selectedAula}`
      );
      if (response.status !== 200) {
        throw new Error('Error al buscar el horario');
      }
      const data = response.data;
      setSchedule(mapScheduleData(data, 14)); // Actualizar con datos recibidos
      setError(''); // Limpiar errores si todo es exitoso
    } catch (err: any) {
      setSchedule(Array.from({ length: 14 }, () => Array(5).fill(null))); // Reiniciar la tabla
      setError(err.message || 'Error al buscar el horario'); // Mostrar mensaje de error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAula = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/classroom/");
        if (!response.ok) throw new Error("Error al obtener las aulas");
        const data = await response.json();
        setAula(data);  // Aquí usamos 'data' en lugar de 'response'
      } catch (error: any) {
        setError(error.message);
      }
    };
    
    fetchAula();
  }, []);

  const mapScheduleData = (data: any[], slotsPerDay: number) => {
    const updatedSchedule = Array.from({ length: slotsPerDay }, () => Array(5).fill(null));
    const daysMap = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];

    data.forEach((schedule, index) => {
      daysMap.forEach((day, dayIndex) => {
        if (schedule[day]) {
          schedule[day].forEach((slot: ScheduleItem, hourIndex: number) => {
            if (hourIndex < slotsPerDay) {
              updatedSchedule[hourIndex][dayIndex] = {
                courses: slot.courses.map(course => ({
                  course: course.course || "",
                  professor: course.professor || "",
                  classroom: course.classroom || "",
                  activity: course.activity || ""
                })),
                available: slot.available || 0,
              };
            }
          });
        }
      });
    });

    return updatedSchedule;
  };

  const handleDocenteAula = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const neweAula = e.target.value;
    setSelectedAula(neweAula);
  };

  const toggleCellSelection = (dayIndex: number, hourIndex: number) => {
    setCellIndex({ dayIndex, hourIndex });
    setModalVisible(true);
  };

  return (
    <>
      <BreadDash />
      <DashboardTabs />
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
      </div>

      {/* <div className="flex justify-center mb-4">
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto"
        >
          Buscar
        </button>
      </div> */}

      {loading && <p className="text-blue-500">Cargando horarios...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <div className="container mx-auto mt-10 mb-10 p-4">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] sm:min-w-[600px] table-auto border-collapse border border-gray-300 dark:bg-dark">
            <thead>
              <tr>
                <th className="bg-blue-800 text-white p-3 text-xs sm:text-base border-2  border-gray-300 w-[120px] sm:w-[150px] text-center">
                  HORAS
                </th>
                {days.map((day, index) => (
                  <th
                    key={index}
                    className="bg-blue-800 text-white p-3 text-xs sm:text-base border-2  border-gray-300 w-[120px] sm:w-[150px] text-center"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
            {hours.map((hour, hourIndex) => (
              <tr key={hourIndex}>
                <td className="p-2 text-center border-2  border-gray-300 text-sm">
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
                        className="border-2  border-gray-300 text-center"
                      >
                        {/* Celda vacía sin contenido */}
                      </td>
                    );
                  }

                  return (
                    <td
                      key={`${hourIndex}-${dayIndex}`}
                      className={`text-center align-middle border-2  border-gray-300 text-sm whitespace-normal ${
                        currentCell && currentCell.available === 1 && currentCell.courses[0]?.course
                          ? getCourseColor(currentCell.courses[0].course)
                          : ""
                      }`}
                      
                      rowSpan={rowSpan}
                      onClick={() => toggleCellSelection(dayIndex, hourIndex)}
                    >
                      {currentCell.courses.map((course, index) => (
                        <div key={index} className="text-xs dark:text-dark">
                          <p>{course.course}</p>
                          <p>{course.activity}</p>
                          <p>{course.classroom}</p>
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
      </div>
    </>
  );
};

export default ScheduleTable;
