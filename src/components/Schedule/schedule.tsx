"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const ScheduleTable: React.FC = () => {
  const { data: session, status } = useSession();
  const [schedule, setSchedule] = useState<number[][]>(Array.from({ length: 5 }, () => Array(14).fill(0)));
  const [scheduleId, setScheduleId] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const userId = session?.user?._id;
  const days = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES"];
  const hours = [
    "07:00 AM a 08:00 AM", "08:00 AM a 09:00 AM", "09:00 AM a 10:00 AM", 
    "10:00 AM a 11:00 AM", "11:00 AM a 12:00 PM", "12:00 PM a 01:00 PM", 
    "01:00 PM a 02:00 PM", "02:00 PM a 03:00 PM", "03:00 PM a 04:00 PM", 
    "04:00 PM a 05:00 PM", "05:00 PM a 06:00 PM", "06:00 PM a 07:00 PM", 
    "07:00 PM a 08:00 PM", "08:00 PM a 09:00 PM",
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
      console.log('Horarios guardados:', updatedSchedule);
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
    }
  };

  if (status === "loading") return <div>Cargando...</div>;
  if (!session) return <div>No estás autenticado. Por favor, inicia sesión.</div>;

  return (
    <div className="container mx-auto mt-10 mb-10 p-4">
      <div className="overflow-x-auto sm:flex sm:flex-wrap justify-center ">
        <table className="w-full sm:w-11/12 md:w-8/12 table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="bg-blue-800 text-white p-3 text-xs sm:text-base border border-gray-300 w-1/6">HORARIO</th>
              {days.map((day, index) => (
                <th key={index} className="bg-blue-800 text-white p-3 text-xs sm:text-base border border-gray-300 w-1/6">
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
                        isSavedCell ? 'bg-blue-400 dark:bg-body-color' : isSelected ? 'bg-blue-300 dark:bg-body-color' : 'bg-blue-50'
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
      <div className="flex justify-center">
        <button
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold rounded shadow-md"
        >
          Guardar Horario
        </button>
      </div>
    </div>
  );
};

export default ScheduleTable;