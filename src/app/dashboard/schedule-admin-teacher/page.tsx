'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import BreadDash from "@/components/Common/BreadDash";
import DashboardTabs from "@/components/Dashboard/DashboardTabs";


interface ScheduleItem {
  _id?: string;
  available: number;
  courses: {
    course: string;
    professor: string;
    activity: string;
    classroom: string;
  }[];
}

const ScheduleTable: React.FC = () => {
  interface Docente {
    _id: string;
    fullname: string;
  }

  const [schedule, setSchedule] = useState<Array<Array<ScheduleItem | null>>>(
    Array.from({ length: 14 }, () => Array(5).fill(null))
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [cellIndex, setCellIndex] = useState<{ dayIndex: number; hourIndex: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [selectedDocente, setSelectedDocente] = useState<string>("");
  const [error, setError] = useState<string>('');

  const colors = [
    "bg-gray-200",
    "bg-green-200",
    "bg-blue-200",
    "bg-orange-200",
    "bg-pink-200",
    "bg-red-200",
    "bg-purple-200",
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
      if (!selectedDocente) {
        throw new Error('Por favor, seleccione un docente');
      }
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/scheduleteacher?professor=${selectedDocente}`
      );
      if (response.status !== 200) {
        throw new Error('Error al buscar el horario');
      }
      const data = response.data;
      setSchedule(mapScheduleData(data, 14));
      setError('');
    } catch (err: any) {
      setSchedule(Array.from({ length: 14 }, () => Array(5).fill(null))); 
      setError(err.message || 'Error al buscar el horario');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDocentes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/auth/signup/");
        if (response.status !== 200) throw new Error("Error al obtener los docentes");
        const data = response.data;
        const filteredDocentes = data.filter(
          (docente: any) => docente.role !== "admin" && docente.status === "activo"
        );
        setDocentes(filteredDocentes);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchDocentes();
  }, []);

  const mapScheduleData = (data: any[], slotsPerDay: number) => {
    const updatedSchedule = Array.from({ length: slotsPerDay }, () =>
      Array(5).fill(null)
    );
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


  const toggleCellSelection = (dayIndex: number, hourIndex: number) => {
    setCellIndex({ dayIndex, hourIndex });
    setModalVisible(true);
  };

  return (
    <>
  
      <BreadDash />
      <DashboardTabs />
      
      <div className="container mx-auto px-4 pb-1 sm:px-6 lg:px-8 mt-4">
          <label htmlFor="docentes" className="block text-lg font-medium mb-2">
            Docente
          </label>
          <div className="flex flex-wrap items-center gap-4">
            <select
              id="docentes"
              value={selectedDocente}
              onChange={(e) => setSelectedDocente(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full sm:w-auto dark:bg-dark"
            >
              <option value="">Seleccionar Docente</option>
              {docentes.map((user) => (
                <option key={user._id} value={user.fullname}>
                  {user.fullname}
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

        {loading && <p className="text-blue-500">Cargando horarios...</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}

        <div className="container mx-auto mt-10 mb-10 p-4">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] sm:min-w-[600px] table-auto border-collapse border border-gray-300 dark:bg-dark " >
              <thead>
                <tr>
                  <th className="bg-blue-800 text-white p-3 text-xs sm:text-base border border-gray-300 w-[120px] sm:w-[150px] text-center">
                    HORAS
                  </th>
                  {days.map((day, index) => (
                    <th
                      key={index}
                      className="bg-blue-800 text-white p-3 text-xs sm:text-base border border-gray-300 w-[120px] sm:w-[150px] text-center"
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
                        {/* Celda vacía sin contenido xdd */}
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
