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
  courses: string[]; // Asegúrate de que los cursos sean pasados correctamente
}> = ({ visible, onClose, onSubmit, onDelete, initialData, courses }) => {
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
    onDelete(); // Llamar al método de eliminación que actualizará la celda
    onClose();
  };

return (
  visible && (
    <div
      className="bg-white p-4 rounded shadow-lg transform -translate-y-1/2 -translate-x-1/2"
      style={{ top: '50%', left: '50%', position: 'absolute' }}
    >
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-semibold">Modificar Horario</h2>

        <div className="mb-4">
          <label>Profesor</label>
          <input
            type="text"
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
            className="border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label>Curso</label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="border rounded w-full appearance-none"
          >
            <option value="">Seleccione un curso</option>
            {courses.map((courseName, index) => (
              <option key={index} value={courseName}>
                {courseName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label>Actividad</label>
          <input
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label>Aula</label>
          <input
            type="text"
            value={classroom}
            onChange={(e) => setClassroom(e.target.value)}
            className="border rounded w-full"
          />
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <button onClick={handleSubmit} className="mt-2 bg-blue-500 text-white p-2 rounded w-full">
          Guardar Cambios Temporales
        </button>
        <button
          onClick={handleDelete}
          className="mt-2 bg-red-500 text-white p-2 rounded w-full"
        >
          Borrar Datos de Celda
        </button>
        <button onClick={onClose} className="mt-2 bg-gray-500 text-white p-2 rounded w-full">
          Cerrar
        </button>
      </div>
    </div>
  )
);
};


const ScheduleTable: React.FC = () => {
  const [schedule, setSchedule] = useState<Array<Array<ScheduleItem | null>>>(Array.from({ length: 13 }, () => Array(5).fill(null)));
  const [modalVisible, setModalVisible] = useState(false);
  const [cellIndex, setCellIndex] = useState<{ dayIndex: number; hourIndex: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [ciclo, setCiclo] = useState('');
  const [seccion, setSeccion] = useState('');
  const [horarioID, setHorarioID] = useState(null);
  const [courses, setCourses] = useState<string[]>([]); // Nueva lista de cursos
  const [error, setError] = useState('');

  // Opciones de ciclos y secciones
  const optionsCiclo = {
    'I': ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
  };
  const optionsSeccion = ['A', 'B'];

  const days = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES"];
  const hours = [
    "07:00 AM a 08:00 AM", "08:00 AM a 09:00 AM", "09:00 AM a 10:00 AM",
    "10:00 AM a 11:00 AM", "11:00 AM a 12:00 PM", "12:00 PM a 01:00 PM",
    "01:00 PM a 02:00 PM", "03:00 PM a 04:00 PM", "04:00 PM a 05:00 PM",
    "05:00 PM a 06:00 PM", "06:00 PM a 07:00 PM", "07:00 PM a 08:00 PM",
    "08:00 PM a 09:00 PM",
  ];

  const handleCicloSeccionChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [selectedCiclo, selectedSeccion] = e.target.value.split('-');
    setCiclo(selectedCiclo);
    setSeccion(selectedSeccion);

    try {
      const response = await axios.get(`http://localhost:3000/api/course/search?cycle=${selectedCiclo}`);
      const courses = response.data.map((course: { name: string }) => course.name);
      setCourses(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

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

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!horarioID) return; // Verifica que haya un horarioID antes de buscar

      try {
        // Realiza la solicitud GET para obtener el horario
        const response = await axios.get(`/api/scheduleadmin/${horarioID}`);
        const data = response.data;

        // Si los datos no están completos, lo consideramos como no encontrado
        if (!data || !data.lunes || !data.martes || !data.miercoles || !data.jueves || !data.viernes) {
          console.log('No se encontraron datos completos. Creando un nuevo horario...');

          // Crear un nuevo horario con la estructura predeterminada
          const newSchedule = {
            id: horarioID, // Usamos el horarioID como _id
            slots: {
              lunes: Array(13).fill({ available: 0 }), // 13 slots por día, cada uno con { available: 0 }
              martes: Array(13).fill({ available: 0 }),
              miercoles: Array(13).fill({ available: 0 }),
              jueves: Array(13).fill({ available: 0 }),
              viernes: Array(13).fill({ available: 0 }),
            }
          };

          // Intentamos crear el horario con la solicitud POST
          await axios.post('/api/scheduleadmin', newSchedule);
          console.log("Nuevo horario creado");

          // Ahora que se ha creado el horario, asignamos un valor predeterminado a schedule
          const initialSchedule = Array.from({ length: 13 }, () => Array(5).fill(null));
          setSchedule(initialSchedule);
        } else {
          // Si los datos son válidos, procesarlos y cargarlos en el estado
          const updatedSchedule = Array.from({ length: 13 }, () => Array(5).fill(null));
          const daysMap = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];

          daysMap.forEach((day, dayIndex) => {
            const classes = data[day] || [];
            classes.forEach((item, hourIndex) => {
              if (hourIndex < 13) {
                updatedSchedule[hourIndex][dayIndex] = item; // Asigna los slots a la matriz
              }
            });
          });

          setSchedule(updatedSchedule);
          console.log("Horario cargado:", updatedSchedule);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Si obtenemos un 404, creamos el horario
          console.log("Horario no encontrado, creando un nuevo horario...");
          const newSchedule = {
            id: horarioID,
            slots: {
              lunes: Array(13).fill({ available: 0 }), // 13 slots por día, cada uno con { available: 0 }
              martes: Array(13).fill({ available: 0 }),
              miercoles: Array(13).fill({ available: 0 }),
              jueves: Array(13).fill({ available: 0 }),
              viernes: Array(13).fill({ available: 0 }),
            }
          };

          // Realiza la solicitud POST para crear el nuevo horario
          await axios.post('/api/scheduleadmin', newSchedule);
          setSchedule(Array.from({ length: 13 }, () => Array(5).fill(null)));
        } else {
          // Maneja otros errores
          setError("Error fetching schedule: " + (error instanceof Error ? error.message : "Unknown error"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [horarioID]); // Se ejecuta cuando horarioID cambia

  const handleCellSubmit = async (data: ScheduleItem) => {
    if (cellIndex) {
      const { dayIndex, hourIndex } = cellIndex;
      const updatedSchedule = [...schedule];

      // Actualizar la celda seleccionada
      updatedSchedule[hourIndex][dayIndex] = { available: 1, ...data };

      // Actualizar la celda directamente debajo de la seleccionada (si existe)
      if (hourIndex + 1 < updatedSchedule.length) {
        updatedSchedule[hourIndex + 1][dayIndex] = { available: 1, ...data };
      }

      setSchedule(updatedSchedule);
    }
  };

  const handleCellDelete = () => {
    if (cellIndex) {
      const { dayIndex, hourIndex } = cellIndex;
      const updatedSchedule = [...schedule];
      updatedSchedule[hourIndex][dayIndex] = { available: 0, professor: "", course: "", activity: "", classroom: "" }; // Borra los datos
      setSchedule(updatedSchedule);
    }
  };

  const handleSaveGeneral = async () => {
    if (!horarioID) {
      alert("No se ha encontrado un horario válido para guardar.");
      return;
    }

    const dayMap = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
    const payload = {};

    dayMap.forEach((day, dayIndex) => {
      payload[day] = schedule.map((row) => row[dayIndex] || null).filter(item => item !== null); // Filtrar celdas vacías
    });

    try {
      await axios.put(`/api/scheduleadmin/${horarioID}`, payload); // Usando el ID dinámico en la URL
      alert("Horario guardado exitosamente.");
    } catch (error) {
      console.error("Error al guardar el horario: ", error);
      alert("Error al guardar el horario.");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setCellIndex(null);
    setError(null);
  };

  const toggleCellSelection = (dayIndex: number, hourIndex: number) => {
    setCellIndex({ dayIndex, hourIndex });
    setModalVisible(true);
  };

  const renderCell = (dayIndex: number, hourIndex: number) => {
    const cellData = schedule[hourIndex][dayIndex];

    if (cellData && cellData.available === 1) {
      return (
        <td
          key={`${hourIndex}-${dayIndex}`}
          className="p-3 border border-gray-300 text-center cursor-pointer text-xs dark:bg-dark sm:text-base bg-blue-200"
          onClick={() => toggleCellSelection(dayIndex, hourIndex)}
        >
          {`${cellData.professor} - ${cellData.course} - ${cellData.activity} - ${cellData.classroom}`}
        </td>
      );
    }

    return (
      <td
        key={`${hourIndex}-${dayIndex}`}
        className="p-3 border border-gray-300 text-center cursor-pointer text-xs dark:bg-dark sm:text-base bg-gray-200"
        onClick={() => toggleCellSelection(dayIndex, hourIndex)}
      />
    );
  };

  return (
    <div className="container mx-auto p-4" style={{ marginTop: '5cm' }}>
      <h1 className="text-2xl font-bold mb-4">Buscar Horario</h1>
      <div className="flex space-x-4 mb-4">
        <div>
          <label className="block mb-2" htmlFor="ciclo-seccion">
            Ciclo y Sección
          </label>

          <select
            id="ciclo-seccion"
            value={`${ciclo}-${seccion}`}
            onChange={(e) => {
              const [selectedCiclo, selectedSeccion] = e.target.value.split('-');
              setCiclo(selectedCiclo);
              setSeccion(selectedSeccion);

              // Hacer la llamada a la API para obtener los cursos después de cambiar el ciclo y sección
              axios
                .get(`http://localhost:3000/api/course/search?cycle=${selectedCiclo}`)
                .then((response) => {
                  const courses = response.data.map((course: { name: string }) => course.name);
                  setCourses(courses); // Actualizar el estado de los cursos
                })
                .catch((error) => {
                  console.error("Error fetching courses:", error);
                });
            }}
            className="border rounded p-2"
          >


            <option value="">Seleccione un ciclo y sección</option>
            {Object.keys(optionsCiclo).map((period) =>
              optionsCiclo[period].map((c) =>
                optionsSeccion.map((s) => (
                  <option key={`${c}-${s}`} value={`${c}-${s}`}>
                    {`${c} - ${s}`}
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
      {/* {horarioID && <p className="mt-4">ID del horario encontrado: {horarioID}</p>} */}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      <div className="container mx-auto mt-10 mb-10 p-4" style={{ marginTop: '1cm' }}>
        <div className="overflow-x-auto sm:flex sm:flex-wrap justify-center">
          <table className="w-full sm:w-11/12 md:w-8/12 table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="bg-blue-800 text-white p-3 text-xs sm:text-base border border-gray-300 w-1/6">
                  HORAS
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
              {schedule.map((_, hourIndex) => (
                <tr key={hourIndex}>
                  <td className="p-3 text-xs sm:text-base border border-gray-300 bg-blue-50 text-center whitespace-nowrap w-1/6 dark:bg-dark">
                    {hours[hourIndex]}
                  </td>
                  {days.map((_, dayIndex) => renderCell(dayIndex, hourIndex))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSaveGeneral}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar Horario General"}
          </button>
        </div>
        <ScheduleModal
          visible={modalVisible}
          onClose={closeModal}
          onSubmit={handleCellSubmit}
          onDelete={handleCellDelete}
          initialData={cellIndex ? schedule[cellIndex.hourIndex][cellIndex.dayIndex] : null}
          courses={courses} // Pasamos los cursos al modal
        />
      </div>
    </div>
  );
};

export default ScheduleTable;
