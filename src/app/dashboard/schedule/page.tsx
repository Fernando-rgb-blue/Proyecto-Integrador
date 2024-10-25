"use client";

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

const ScheduleTable: React.FC = () => {
  const { data: session, status } = useSession();

  // Comprobar el estado de la sesión
  if (status === 'loading') {
    return <div>Cargando...</div>;
  }

  // Si no hay sesión, puedes redirigir o mostrar un mensaje
  if (!session) {
    return <div>No estás autenticado. Por favor, inicia sesión.</div>;
  }
  
  console.log (session.user._id);

  const userId = session.user._id; // Obtener el ID del usuario de la sesión
  const days = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES'];
  const hours = [
    '07:00 AM a 08:00 AM',
    '08:00 AM a 09:00 AM',
    '09:00 AM a 10:00 AM',
    '10:00 AM a 11:00 AM',
    '11:00 AM a 12:00 PM',
    '12:00 PM a 01:00 PM',
    '01:00 PM a 02:00 PM',
    '02:00 PM a 03:00 PM',
    '03:00 PM a 04:00 PM',
    '04:00 PM a 05:00 PM',
    '05:00 PM a 06:00 PM',
    '06:00 PM a 07:00 PM',
    '07:00 PM a 08:00 PM',
    '08:00 PM a 09:00 PM',
  ];

  // Estado para las celdas seleccionadas
  const [selectedCells, setSelectedCells] = useState<{ [key: string]: boolean }>({});

  // Manejar selección de celdas
  const toggleCellSelection = (day: string, hour: string) => {
    const cellKey = `${day}-${hour}`;
    setSelectedCells((prevSelectedCells) => ({
      ...prevSelectedCells,
      [cellKey]: !prevSelectedCells[cellKey], // Alternar selección
    }));
  };

  // Guardar los horarios seleccionados
  const handleSave = async () => {
    const selectedSlots = Object.entries(selectedCells)
      .filter(([, isSelected]) => isSelected) // Filtrar solo las celdas seleccionadas
      .map(([cellKey]) => {
        const [day, hour] = cellKey.split('-');
        return { day, timeSlot: hour }; // Formato para enviar al servidor
      });

    // Preparar el cuerpo de la solicitud
    const body = {
      action: 'save', // Esta acción puede ser utilizada en la API para guardar
      user: userId,
      selectedSlots,
    };

    try {
      const response = await fetch('/api/schedule', {
        method: 'PUT', // Cambia esto según el método que uses en la API para guardar
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Horarios guardados:', data);
        // Aquí puedes mostrar un mensaje de éxito o limpiar la selección si lo deseas
      } else {
        console.error('Error al guardar los horarios');
      }
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
    }
  };

  return (
    <div className="mt-[3cm] mb-[3cm] p-4">
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
          {hours.map((hour, index) => (
            <tr key={index}>
              <td className="p-2 border border-gray-200 bg-blue-50 text-center">{hour}</td>
              {days.map((day, dayIndex) => {
                const cellKey = `${day}-${hour}`;
                const isSelected = selectedCells[cellKey];

                return (
                  <td
                    key={dayIndex}
                    className={`p-2 border border-gray-200 text-center cursor-pointer ${
                      isSelected ? 'bg-blue-300' : 'bg-blue-50'
                    }`}
                    onClick={() => toggleCellSelection(day, hour)}
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
