'use client'
import React, { useState } from 'react';

const ScheduleSearch = () => {
  const [anio, setAnio] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [ciclo, setCiclo] = useState('');
  const [seccion, setSeccion] = useState('');
  const [horarioID, setHorarioID] = useState(null);
  const [error, setError] = useState('');

  // Opciones de ciclos y secciones
  const optionsCiclo = {
    'I': ['I', 'III', 'V', 'VII', 'IX'],  // Ciclos impares
    'II': ['II', 'IV', 'VI', 'VIII', 'X'] // Ciclos pares
  };

  const optionsSeccion = ['A', 'B', 'C'];

  // Opciones de año y periodo
  const optionsAnio = ['2024', '2025'];
  const optionsPeriodo = ['I', 'II'];

  // Filtrar los ciclos según el periodo seleccionado
  const filteredCiclos = periodo ? optionsCiclo[periodo] : [];

  const handleSearch = async () => {
    try {
      // Asegurarse de que todos los parámetros estén definidos
      if (!anio || !periodo || !ciclo || !seccion) {
        throw new Error('Por favor complete todos los campos');
      }

      const response = await fetch('http://localhost:3000/api/cicloperiodo/search?' + new URLSearchParams({
        anio,
        periodo,
        ciclo,
        seccion
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

      {/* Flexbox para alinear los campos en una fila */}
      <div className="flex space-x-4 mb-4">
        
        {/* Año */}

        <div className="flex-1">
          <label className="block mb-2" htmlFor="anio">Año</label>
          <select
            id="anio"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="">Seleccione un año</option>
            {optionsAnio.map((anio) => (
              <option key={anio} value={anio}>
                {anio}
              </option>
            ))}
          </select>
        </div>

        {/* Periodo */}
        
        <div className="flex-1">
          <label className="block mb-2" htmlFor="periodo">Periodo</label>
          <select
            id="periodo"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="">Seleccione un periodo</option>
            {optionsPeriodo.map((periodo) => (
              <option key={periodo} value={periodo}>
                {periodo}
              </option>
            ))}
          </select>
        </div>

        {/* Ciclo y Sección */}
        <div className="flex-1">
          <label className="block mb-2" htmlFor="ciclo-seccion">Ciclo y Sección</label>
          <select
            id="ciclo-seccion"
            value={`${ciclo}-${seccion}`}
            onChange={(e) => {
              const [selectedCiclo, selectedSeccion] = e.target.value.split('-');
              setCiclo(selectedCiclo);
              setSeccion(selectedSeccion);
            }}
            className="border rounded p-2 w-full"
          >
            <option value="">Seleccione un ciclo y sección</option>
            {filteredCiclos.map((c) =>
              optionsSeccion.map((s) => (
                <option key={`${c}-${s}`} value={`${c}-${s}`}>
                  {`${c} - ${s}`}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {/* Botón de Buscar */}
      <div className="flex justify-center mb-4">
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto">
          Buscar
        </button>
      </div>

      {/* Resultados */}
      {horarioID && <p className="mt-4">ID del horario encontrado: {horarioID}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default ScheduleSearch;
