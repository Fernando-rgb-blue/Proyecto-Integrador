"use client";

import React, { useState } from 'react';

const ScheduleTable: React.FC = () => {
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
    </div>
  );
};

export default ScheduleTable;
