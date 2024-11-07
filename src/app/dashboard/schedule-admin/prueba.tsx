'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";

interface ScheduleItem {
  _id?: string;
  professor: string;
  course: string;
  activity: string;
  classroom: string;
  available: number;
}

const ScheduleModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: ScheduleItem) => void;
  onDelete: () => void;
  initialData?: ScheduleItem | null;
}> = ({ visible, onClose, onSubmit, onDelete, initialData }) => {
  const [professor, setProfessor] = useState(initialData?.professor || "");
  const [course, setCourse] = useState(initialData?.course || "");
  const [activity, setActivity] = useState(initialData?.activity || "");
  const [classroom, setClassroom] = useState(initialData?.classroom || "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (visible) {
      setProfessor(initialData?.professor || "");
      setCourse(initialData?.course || "");
      setActivity(initialData?.activity || "");
      setClassroom(initialData?.classroom || "");
      setError(null);
    }
  }, [visible, initialData]);

  const handleSubmit = () => {
    if (!professor || !course || !activity || !classroom) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    onSubmit({ professor, course, activity, classroom, available: 1 });
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    visible && (
      <div className="bg-white p-4 rounded shadow-lg transform -translate-y-1/2 -translate-x-1/2" style={{ top: '50%', left: '50%', position: 'absolute' }}>
        <div className="bg-white p-4 rounded shadow-lg">
          <h2 className="text-xl font-semibold">Modificar Horario</h2>
          <div>
            <label>Profesor</label>
            <input
              type="text"
              value={professor}
              onChange={(e) => setProfessor(e.target.value)}
              className="border rounded w-full"
            />
          </div>
          <div>
            <label>Curso</label>
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="border rounded w-full"
            />
          </div>
          <div>
            <label>Actividad</label>
            <input
              type="text"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="border rounded w-full"
            />
          </div>
          <div>
            <label>Aula</label>
            <input
              type="text"
              value={classroom}
              onChange={(e) => setClassroom(e.target.value)}
              className="border rounded w-full"
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <button onClick={handleSubmit} className="mt-2 bg-blue-500 text-white p-2 rounded">Guardar Cambios Temporales</button>
          <button onClick={handleDelete} className="mt-2 bg-red-500 text-white p-2 rounded">Borrar Datos de Celda</button>
          <button onClick={onClose} className="mt-2 bg-gray-500 text-white p-2 rounded">Cerrar</button>
        </div>
      </div>
    )
  );
};




const ScheduleCiclo: React.FC<{ onScheduleIDFound: (id: string) => void }> = ({ onScheduleIDFound }) => {
  const [ciclo, setCiclo] = useState('');
  const [seccion, setSeccion] = useState('');
  const [error, setError] = useState('');

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

      if (!response.ok) throw new Error('Error al buscar el horario');

      const data = await response.json();
      onScheduleIDFound(data._id); 
      setError('');
    } catch (err) {
      setError(err.message || 'Error al buscar el horario');
      onScheduleIDFound(null);
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
            {Object.keys(optionsCiclo).map((period) =>
              optionsCiclo[period].map((cicloOption) =>
                optionsSeccion.map((seccionOption) => (
                  <option key={`${cicloOption}-${seccionOption}`} value={`${cicloOption}-${seccionOption}`}>
                    {`${cicloOption} - ${seccionOption}`}
                  </option>
                ))
              )
            )}
          </select>
        </div>
      </div>
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
        Buscar
      </button>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};




const ScheduleTable: React.FC<{ scheduleID: string | null }> = ({ scheduleID }) => {
  const [schedule, setSchedule] = useState<Array<Array<ScheduleItem | null>>>(Array.from({ length: 13 }, () => Array(5).fill(null)));
  const [modalVisible, setModalVisible] = useState(false);
  const [cellIndex, setCellIndex] = useState<{ dayIndex: number; hourIndex: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const days = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES"];
  const hours = [
    "07:00 AM a 08:00 AM", "08:00 AM a 09:00 AM", // Completar lista de horas
  ];

  useEffect(() => {
    if (scheduleID) {
      fetchSchedule(scheduleID);
    }
  }, [scheduleID]);

  const fetchSchedule = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/scheduleadmin/${id}`);
      const data = response.data;

      if (!Array.isArray(data) || data.length === 0 || typeof data[0] !== 'object') {
        throw new Error("La respuesta de la API no contiene datos válidos.");
      }

      const updatedSchedule = Array.from({ length: 13 }, () => Array(5).fill(null));
      const daysMap = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];

      daysMap.forEach((day, dayIndex) => {
        const classes = data[day] || [];
        classes.forEach((item, hourIndex) => {
          if (hourIndex < 13) {
            updatedSchedule[hourIndex][dayIndex] = item;
          }
        });
      });

      setSchedule(updatedSchedule);
      setError(null);
    } catch (error) {
      setError("Error fetching schedule: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setLoading(false);
    }
  };


  
  const handleSaveGeneral = async () => {
    const dayMap = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
    const payload = {};

    dayMap.forEach((day, dayIndex) => {
      payload[day] = schedule.map((row) => row[dayIndex] || null).filter(item => item !== null);
    });

    try {
      await axios.put(`/api/scheduleadmin/${scheduleID}`, payload);
      alert("Horario guardado exitosamente.");
    } catch (error) {
      console.error("Error al guardar el horario: ", error);
      alert("Error al guardar el horario.");
    }
  };

  return (
    <div>
      {/* Renderizar la tabla del horario */}
      <button onClick={handleSaveGeneral} className="bg-green-500 text-white px-4 py-2 rounded">
        Guardar Cambios
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedScheduleID, setSelectedScheduleID] = useState<string | null>(null);

  return (
    <div>
      <ScheduleCiclo onScheduleIDFound={setSelectedScheduleID} />
      {selectedScheduleID && <ScheduleTable scheduleID={selectedScheduleID} />}
    </div>
  );
};

export default App;
