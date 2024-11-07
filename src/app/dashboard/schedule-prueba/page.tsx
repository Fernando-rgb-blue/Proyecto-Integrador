'use client'
import React, { useState } from 'react';

const ScheduleSearch = () => {
  const [ciclo, setCiclo] = useState('');
  const [seccion, setSeccion] = useState('');
  const [horarioID, setHorarioID] = useState(null);
  const [error, setError] = useState('');

  // Opciones de ciclos y secciones
  const optionsCiclo = {
    'I': ['I', 'III', 'V', 'VII', 'IX'],
    'II': ['II', 'IV', 'VI', 'VIII', 'X']
  };

  const optionsSeccion = ['A', 'B', 'C'];

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/scheduleprueba/search?' + new URLSearchParams({
        ciclo,
        seccion,
      }));

      if (!response.ok) {
        throw new Error('Error al buscar el horario');
      }

      const data = await response.json();
      setHorarioID(data._id); // Asignar el ID del horario
      setError(''); // Limpiar error si hay
    } catch (err) {
      setError(err.message || 'Error al buscar el horario');
      setHorarioID(null); // Limpiar ID en caso de error
    }
  };

  return (

    <div className="container mx-auto p-4" style={{ marginTop: '5cm' }}>
      <h1 className="text-2xl font-bold mb-4">Buscar Horario</h1>

      <div className="flex space-x-4 mb-4">
        <div>
          <label className="block mb-2" htmlFor="ciclo-seccion">Ciclo y Sección</label>
          <select
            id="ciclo-seccion"
            value={`${ciclo}-${seccion}`}
            onChange={(e) => {
              const [selectedCiclo, selectedSeccion] = e.target.value.split('-');
              setCiclo(selectedCiclo);
              setSeccion(selectedSeccion);
            }}
            className="border rounded p-2"
          >
            <option value="">Seleccione un ciclo y sección</option>
            {Object.keys(optionsCiclo).map((period) => (
              optionsCiclo[period].map((c) =>
                optionsSeccion.map((s) => (
                  <option key={`${c}-${s}`} value={`${c}-${s}`}>
                    {`${c} - ${s}`}
                  </option>
                ))
              )
            ))}
          </select>
        </div>

      </div>

      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
        Buscar
      </button>

      {horarioID && <p className="mt-4">ID del horario encontrado: {horarioID}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      
    </div>
    
  );
};

export default ScheduleSearch;
