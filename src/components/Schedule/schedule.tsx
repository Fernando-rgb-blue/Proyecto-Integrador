"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const ScheduleTable: React.FC = () => {
  const { data: session, status } = useSession();
  const [schedule, setSchedule] = useState<number[][]>(Array.from({ length: 5 }, () => Array(14).fill(0)));
  const [scheduleId, setScheduleId] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const userId = session?.user?._id;
  const days = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES"];
  const hours = [
    "07:00 AM a 08:00 AM", "08:00 AM a 09:00 AM", "09:00 AM a 10:00 AM", 
    "10:00 AM a 11:00 AM", "11:00 AM a 12:00 PM", "12:00 PM a 01:00 PM", 
    "01:00 PM a 02:00 PM", "03:00 PM a 04:00 PM", "04:00 PM a 05:00 PM", 
    "05:00 PM a 06:00 PM", "06:00 PM a 07:00 PM", "07:00 PM a 08:00 PM", 
    "08:00 PM a 09:00 PM",
  ];

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`/api/schedule/${userId}`);
        if (!response.ok) throw new Error('Error al obtener el horario');
        const userSchedule = await response.json();
        if (userSchedule) {
          setScheduleId(userSchedule._id);
          setSchedule([
            userSchedule.lunes,
            userSchedule.martes,
            userSchedule.miercoles,
            userSchedule.jueves,
            userSchedule.viernes,
          ]);
        } else {
          await createSchedule(userId);
        }
      } catch (error) {
        console.error('Error al hacer la solicitud:', error);
      }
    };
    fetchSchedule();
  }, [userId]);

  useEffect(() => {
    if (modalVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalVisible]);

  const createSchedule = async (userId: string) => {
    try {
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      if (!response.ok) throw new Error('Error al crear el horario');
      const newSchedule = await response.json();
      setScheduleId(newSchedule.schedule._id);
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
    }
  };

  const toggleCellSelection = (dayIndex: number, hourIndex: number) => {
    setSchedule((prevSchedule) => {
      const newSchedule = prevSchedule.map((day) => [...day]);
      newSchedule[dayIndex][hourIndex] = newSchedule[dayIndex][hourIndex] === 0 ? 1 : 0;
      return newSchedule;
    });
  };

  const handleSave = async () => {
    if (!userId) return;
    const updatedSchedule = {
      lunes: schedule[0],
      martes: schedule[1],
      miercoles: schedule[2],
      jueves: schedule[3],
      viernes: schedule[4],
    };
    try {
      const url = scheduleId ? `/api/schedule/${userId}` : '/api/schedule';
      const method = scheduleId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...updatedSchedule }),
      });
      if (!response.ok) throw new Error(`Error al ${scheduleId ? 'actualizar' : 'crear'} el horario`);
      setIsSaved(true);
      setModalMessage("Se registró correctamente");
      setIsError(false);
      // setModalMessage("Error al registrar horario");
      // setIsError(true);
      setModalVisible(true);
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
      setModalMessage("Error al registrar horario");
      setIsError(true);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  if (status === "loading") return <div>Cargando...</div>;
  if (!session) return <div>No estás autenticado. Por favor, inicia sesión.</div>;

  return (
    <>
      <div className="container w-full sm:w-11/12 md:w-8/12 mx-auto">
        <p className="text-center mb-6 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
          Profesores a tiempo completo guardar 20 horas, profesores a tiempo parcial guardar 15 horas.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
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
                    const isSavedCell = isSelected && isSaved;
                    return (
                      <td
                        key={dayIndex}
                        className={`p-3 border border-gray-300 text-center cursor-pointer text-xs dark:bg-dark sm:text-base ${
                          isSavedCell
                            ? "bg-blue-400 dark:bg-gray-500"
                            : isSelected
                            ? "bg-blue-300 dark:bg-gray-500"
                            : "bg-blue-50"
                        }`}
                        onClick={() => toggleCellSelection(dayIndex, hourIndex)}
                      />
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="container mx-auto flex justify-center mt-6 mb-10">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold rounded shadow-md"
        >
          Guardar Horario
        </button>
      </div>

      {modalVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-md shadow-md text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <svg
              className="mx-auto mb-4"
              width="50"
              height="50"
              viewBox="0 0 50 50"
            >
              <circle
                cx="25"
                cy="25"
                r="22"
                fill="none"
                stroke={isError ? "red" : "green"}
                strokeWidth="4"
                strokeDasharray="138"
                strokeDashoffset="138"
                style={{
                  animation: "draw-circle 1s forwards",
                }}
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                fontSize="24"
                fill={isError ? "red" : "green"}
              >
                {isError ? "✕" : "✓"}
              </text>
            </svg>
            <p className="text-lg text-dark">{modalMessage}</p>
            <button
              onClick={closeModal}
              className={`mt-4 px-4 py-2 ${
                isError
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              } text-white rounded`}
            >
              OK
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes draw-circle {
          from {
            stroke-dashoffset: 138;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </>

    
  );
};

export default ScheduleTable;