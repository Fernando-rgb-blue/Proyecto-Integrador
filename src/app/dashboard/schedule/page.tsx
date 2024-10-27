"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const ScheduleTable: React.FC = () => {
  const { data: session, status } = useSession();
  const [schedule, setSchedule] = useState<number[][]>(Array.from({ length: 5 }, () => Array(14).fill(0)));
  const [scheduleId, setScheduleId] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const userId = session?.user?._id;
  console.log(session?.user?._id)

  const days = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES"];
  const hours = [
    "07:00 AM a 08:00 AM",
    "08:00 AM a 09:00 AM",
    "09:00 AM a 10:00 AM",
    "10:00 AM a 11:00 AM",
    "11:00 AM a 12:00 PM",
    "12:00 PM a 01:00 PM",
    "01:00 PM a 02:00 PM",
    "02:00 PM a 03:00 PM",
    "03:00 PM a 04:00 PM",
    "04:00 PM a 05:00 PM",
    "05:00 PM a 06:00 PM",
    "06:00 PM a 07:00 PM",
    "07:00 PM a 08:00 PM",
    "08:00 PM a 09:00 PM",
  ];

  // Cargar el horario del usuario desde la API
  useEffect(() => {
    const fetchSchedule = async () => {
      if (!userId) return; // Asegúrate de que hay un userId

      try {
        // Realizar la solicitud GET para obtener el horario del usuario
        const response = await fetch(`/api/schedule/${userId}`); // Usa el endpoint correcto

        if (!response.ok) {
          throw new Error('Error al obtener el horario'); // Manejo de errores si la respuesta no es correcta
        }

        const userSchedule = await response.json();
        console.log('User Schedule:', userSchedule); // Imprimir el horario obtenido

        // Verifica si se recibió un horario
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
          // Si no hay horario, crear uno nuevo
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) throw new Error('Error al crear el horario');
      const newSchedule = await response.json();
      setScheduleId(newSchedule.schedule._id);
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
    }
  };

  // Manejar selección de celdas
  const toggleCellSelection = (dayIndex: number, hourIndex: number) => {
    setSchedule((prevSchedule) => {
      const newSchedule = prevSchedule.map((day) => [...day]);
      newSchedule[dayIndex][hourIndex] = newSchedule[dayIndex][hourIndex] === 0 ? 1 : 0; // Cambiar entre 0 y 1
      return newSchedule;
    });
  };

  // Guardar los horarios seleccionados
  // const handleSave = async () => {
  //   if (!scheduleId) return;

  //   const updatedSchedule = {
  //     lunes: schedule[0],
  //     martes: schedule[1],
  //     miercoles: schedule[2],
  //     jueves: schedule[3],
  //     viernes: schedule[4],
  //   };

  //   try {
  //     const response = await fetch(`/api/schedule/${userId}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(updatedSchedule),
  //     });

  //     if (!response.ok) throw new Error('Error al guardar los horarios');

  //     setIsSaved(true);
  //     const data = await response.json();
  //     console.log('Horarios guardados:', data);
  //   } catch (error) {
  //     console.error('Error al hacer la solicitud:', error);
  //   }
  // };


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
      if (!scheduleId) {
        // Si no hay scheduleId, crea un nuevo horario
        const createResponse = await fetch('/api/schedule', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, ...updatedSchedule }),
        });

        if (!createResponse.ok) throw new Error('Error al crear el horario');

        const newSchedule = await createResponse.json();
        setScheduleId(newSchedule.schedule._id);
      } else {
        // Si ya hay un horario, actualízalo
        const updateResponse = await fetch(`/api/schedule/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedSchedule),
        });

        if (!updateResponse.ok) throw new Error('Error al guardar los horarios');
      }

      setIsSaved(true);
      console.log('Horarios guardados:', updatedSchedule);
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
    }
  };


  // Si la sesión está cargando, muestra un mensaje
  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  // Si no hay sesión, muestra un mensaje de error
  if (!session) {
    return <div>No estás autenticado. Por favor, inicia sesión.</div>;
  }

  return (
    <div className="mt-10 mb-10 p-4">
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="bg-blue-800 text-white p-2 border border-gray-200">HORARIO</th>
            {days.map((day, index) => (
              <th key={index} className="bg-blue-800 text-white p-2 border border-gray-200">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, hourIndex) => (
            <tr key={hourIndex}>
              <td className="p-2 border border-gray-200 bg-blue-50 text-center">{hour}</td>
              {days.map((_, dayIndex) => {
                const isSelected = schedule[dayIndex][hourIndex] === 1; // Verificar si la celda está seleccionada
                const isSavedCell = isSelected && isSaved; // Indica si la celda debe estar sombreada por estar guardada
                return (
                  <td
                    key={dayIndex}
                    className={`p-2 border border-gray-200 text-center cursor-pointer ${isSavedCell ? 'bg-blue-300' : isSelected ? 'bg-blue-300' : 'bg-blue-50'}`}
                    onClick={() => toggleCellSelection(dayIndex, hourIndex)}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleSave}
        className="mt-4 bg-blue-600 text-white p-2 rounded"
      >
        Guardar Horario
      </button>
    </div>
  );
};

export default ScheduleTable;
