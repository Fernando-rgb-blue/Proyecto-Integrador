'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";

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

//  Inicio del modal para agregar, editar, borrar

// Componente ScheduleModal actualizado
const ScheduleModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: ScheduleItem) => void;
  onDelete: () => void;
  onDeleteCourse: (index: number) => void;
  initialData?: ScheduleItem | null;
  courses: string[];
}> = ({ visible, onClose, onSubmit, onDelete, onDeleteCourse, initialData, courses }) => {
  const [courseData, setCourseData] = useState(
    initialData?.courses || [
      { course: "", professor: "", activity: "", classroom: "" }
    ]
  );
  const [classrooms, setClassrooms] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (visible && initialData?.courses) {
      setCourseData(initialData.courses);
      setError(null);
    }
  }, [visible, initialData]);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/classroom/");
        const classroomNames = response.data.map((room: { name: string }) => room.name);
        setClassrooms(classroomNames);
      } catch (error) {
        console.error("Error al cargar las aulas:", error);
      }
    };

    fetchClassrooms();
  }, []);

  const handleCourseChange = (index: number, field: string, value: string) => {
    const updatedCourses = [...courseData];
    updatedCourses[index] = { ...updatedCourses[index], [field]: value };

    if (field === "course") {
      const professorName = value.split(' / ')[1] || '';
      updatedCourses[index].professor = professorName;
    }
    setCourseData(updatedCourses);
  };

  const handleAddCourse = () => {
    setCourseData([
      ...courseData,
      { course: "", professor: "", activity: "", classroom: "" },
    ]);
  };

  const handleSubmit = () => {
    if (courseData.some(course => !course.professor || !course.activity || !course.classroom || !course.course)) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    onSubmit({ courses: courseData, available: 1 });
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  const handleDeleteCourse = (index: number) => {
    const updatedCourses = [...courseData];
    updatedCourses.splice(index, 1);
    setCourseData(updatedCourses);
    onDeleteCourse(index);
  };

  return (
    visible && (
      <div
        className="bg-white p-4 rounded shadow-lg transform -translate-y-1/2 -translate-x-1/2"
        style={{ top: '50%', left: '50%', position: 'absolute' }}
      >
        <div className="bg-white p-4 rounded shadow-lg">
          <h2 className="text-xl font-semibold">Modificar Horario</h2>

          {courseData.map((course, index) => (
            <div key={index} className="space-y-4 border-b pb-4">
              <h3 className="text-lg font-medium">Curso {index + 1}</h3>

              <div className="mb-4">
                <label>Curso</label>
                <select
                  value={course.course}
                  onChange={(e) => handleCourseChange(index, "course", e.target.value)}
                  className="border rounded w-full"
                >
                  <option value="">Seleccione un curso</option>
                  {courses.map((courseWithProfessor, i) => (
                    <option key={i} value={courseWithProfessor}>
                      {courseWithProfessor}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label>Profesor</label>
                <input
                  type="text"
                  value={course.professor}
                  readOnly
                  className="border rounded w-full bg-gray-100"
                />
              </div>

              <div className="mb-4">
                <label>Actividad</label>
                <select
                  value={course.activity}
                  onChange={(e) => handleCourseChange(index, "activity", e.target.value)}
                  className="border rounded w-full"
                >
                  <option value="Práctica">Práctica</option>
                  <option value="Laboratorio">Laboratorio</option>
                  <option value="Teoría">Teoría</option>
                </select>
              </div>

              <div className="mb-4">
                <label>Aula</label>
                <select
                  value={course.classroom}
                  onChange={(e) => handleCourseChange(index, "classroom", e.target.value)}
                  className="border rounded w-full"
                >
                  <option value="">Seleccione un aula</option>
                  {classrooms.map((classroom, i) => (
                    <option key={i} value={classroom}>
                      {classroom}
                    </option>
                  ))}
                </select>
              </div>

              {courseData.length > 1 && (
                <button
                  onClick={() => handleDeleteCourse(index)}
                  className="mt-2 bg-red-500 text-white p-2 rounded w-full"
                >
                  Borrar datos de curso {index + 1}
                </button>
              )}
            </div>
          ))}

          {error && <div className="text-red-500 mb-4">{error}</div>}

          {courseData.length === 1 && (
            <button
              onClick={handleAddCourse}
              className="mt-2 bg-green-500 text-white p-2 rounded w-full"
            >
              Agregar otro curso
            </button>
          )}

          <button onClick={handleSubmit} className="mt-2 bg-blue-500 text-white p-2 rounded w-full">
            Guardar Cambios
          </button>

          {courseData.length === 1 && (
            <button
              onClick={handleDelete}
              className="mt-2 bg-red-500 text-white p-2 rounded w-full"
            >
              Borrar Datos de Celda
            </button>
          )}
          <button onClick={onClose} className="mt-2 bg-gray-500 text-white p-2 rounded w-full">
            Cerrar
          </button>
        </div>
      </div>
    )
  );
};



// Fin del modal



// Inicio del cuadro de horario

const ScheduleTable: React.FC = () => {
  const [schedule, setSchedule] = useState<Array<Array<ScheduleItem | null>>>(Array.from({ length: 13 }, () => Array(5).fill(null)));
  const [modalVisible, setModalVisible] = useState(false);
  const [cellIndex, setCellIndex] = useState<{ dayIndex: number; hourIndex: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [anio, setAnio] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [ciclo, setCiclo] = useState('');
  const [seccion, setSeccion] = useState('');
  const [horarioID, setHorarioID] = useState(null);
  const [courses, setCourses] = useState<string[]>([]); // Nueva lista de cursos
  const [error, setError] = useState('');

  const optionsCiclo = {
    'I': ['I', 'III', 'V', 'VII', 'IX'],
    'II': ['II', 'IV', 'VI', 'VIII', 'X']
  };

  const optionsSeccion = ['A', 'B'];
  const optionsAnio = ['2025'];
  const optionsPeriodo = ['I', 'II'];
  const filteredCiclos = periodo ? optionsCiclo[periodo] : [];
  const days = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES"];
  const hours = [
    "07:00 AM a 08:00 AM", "08:00 AM a 09:00 AM", "09:00 AM a 10:00 AM",
    "10:00 AM a 11:00 AM", "11:00 AM a 12:00 PM", "12:00 PM a 01:00 PM",
    "01:00 PM a 02:00 PM", "03:00 PM a 04:00 PM", "04:00 PM a 05:00 PM",
    "05:00 PM a 06:00 PM", "06:00 PM a 07:00 PM", "07:00 PM a 08:00 PM",
    "08:00 PM a 09:00 PM",
  ];

  const handleDeleteCourse = () => { };

  //Buscando el ID de ciclo/periodo
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
      setHorarioID(data._id); 
      setError(''); 
    } catch (err) {
      setError(err.message || 'Error al buscar el horario');
      setHorarioID(null); 
    }
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!horarioID) return;
      try {

        const response = await axios.get(`/api/scheduleadmin/${horarioID}`);
        const data = response.data;

        const requiredDays = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
        const hasCompleteData = requiredDays.every(day =>
          data && data[day] && Array.isArray(data[day])
        );
        if (!hasCompleteData) {
          console.log('Datos incompletos. Creando un nuevo horario...');
          await createNewSchedule(horarioID);
        } else {
          const updatedSchedule = mapScheduleData(data, 13); // 13 slots por día
          setSchedule(updatedSchedule);
          console.log("Horario cargado:", updatedSchedule);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          console.log("Horario no encontrado, creando un nuevo horario...");
          await createNewSchedule(horarioID);
        } else {
          setError("Error al obtener el horario: " + (error instanceof Error ? error.message : "Error desconocido"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [horarioID]);

  // Función para crear un nuevo horario // En base a la estructura de la api

  const createNewSchedule = async (id) => {

    const newSchedule = {
      _id: id, // Usar el ID encontrado
      lunes: Array.from({ length: 13 }, () => ({
        available: 0,
        courses: [
          {
            course: "", professor: "", classroom: "", activity: "",
          },
        ],
      })),
      martes: Array.from({ length: 13 }, () => ({
        available: 0,
        courses: [
          {
            course: "", professor: "", classroom: "", activity: "",
          },
        ],
      })),
      miercoles: Array.from({ length: 13 }, () => ({
        available: 0,
        courses: [
          {
            course: "", professor: "", classroom: "", activity: "",
          },
        ],
      })),
      jueves: Array.from({ length: 13 }, () => ({
        available: 0,
        courses: [
          {
            course: "", professor: "", classroom: "", activity: "",
          },
        ],
      })),
      viernes: Array.from({ length: 13 }, () => ({
        available: 0,
        courses: [
          {
            course: "", professor: "", classroom: "", activity: "",
          },
        ],
      })),
    };

    await axios.post('/api/scheduleadmin', newSchedule);
    setSchedule(
      Array.from({ length: 13 }, () =>
        Array(5).fill({
          courses: [
            {
              course: "", professor: "", classroom: "", activity: "",
            },
          ],
        })
      )
    );
    console.log("Nuevo horario creado:", newSchedule);
  };

  // Función para mapear los datos del horario
  const mapScheduleData = (data, slotsPerDay) => {
    const updatedSchedule = Array.from({ length: slotsPerDay }, () =>
      Array(5).fill({
        courses: [{
          course: "",
          professor: "",
          classroom: "",
          activity: ""
        }]
      })
    );
    const daysMap = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];

    daysMap.forEach((day, dayIndex) => {
      const classes = data[day] || [];
      classes.forEach((item, hourIndex) => {
        if (hourIndex < slotsPerDay) {
          updatedSchedule[hourIndex][dayIndex] = {
            courses: item.courses.map(course => ({
              course: course.course || "",
              professor: course.professor || "",
              classroom: course.classroom || "",
              activity: course.activity || ""
            })),
            available: item.available || 0, 
          };
        }
      });
    });

    return updatedSchedule;
  };

  const handleCellSubmit = async (data: ScheduleItem) => {
    if (cellIndex) {
      const { dayIndex, hourIndex } = cellIndex;
      const updatedSchedule = [...schedule];


      updatedSchedule[hourIndex][dayIndex] = { available: 1, ...data };

      // Actualizar la celda directamente debajo de la seleccionada (si existe)
      if (hourIndex + 1 < updatedSchedule.length) {
        updatedSchedule[hourIndex + 1][dayIndex] = { available: 1, ...data };
      }

      setSchedule(updatedSchedule);
    }
  };

  // Borrar todos los datos de la celda
  const handleCellDelete = () => {
    if (cellIndex) {
      const { dayIndex, hourIndex } = cellIndex;
      if (schedule[hourIndex] && schedule[hourIndex][dayIndex]) {
        const updatedSchedule = [...schedule];
        updatedSchedule[hourIndex][dayIndex] = {
          available: 0,
          courses: [{
            course: "",
            professor: "",
            activity: "",
            classroom: ""
          }],
        };

        setSchedule(updatedSchedule);
      } else {
        setError("Índice fuera de rango.");
      }
    } else {
      setError("No se ha seleccionado una celda válida.");
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
      payload[day] = schedule.map((row) => row[dayIndex] || null).filter(item => item !== null);
    });

    try {
      await axios.put(`/api/scheduleadmin/${horarioID}`, payload);
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

  // Pantalla de la busqueda de ciclo y horario - Cuadro de horario 

  return (
    <div className="container mx-auto p-4" style={{ marginTop: '5cm' }}>
      <h1 className="text-2xl font-bold mb-4">Buscar Horario</h1>

      {/* Fila de busqueda por ciclo - Modificar xD */}

      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          {/* Año */}
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

        <div className="flex-1">
          <label className="block mb-2" htmlFor="ciclo-seccion">Ciclo y Sección</label>
          <select
            id="ciclo-seccion"
            value={`${ciclo}-${seccion}`}
            onChange={(e) => {
              const [selectedCiclo, selectedSeccion] = e.target.value.split('-');
              setCiclo(selectedCiclo);
              setSeccion(selectedSeccion);
              axios
                .get(`http://localhost:3000/api/course/search?ciclo=${selectedCiclo}`)
                .then((response) => {
                  const coursesWithProfessors = response.data.flatMap((course: { nombre: string, profesores: string[] }) =>
                    course.profesores.map((profesor) => `${course.nombre} / ${profesor}`)
                  );
                  setCourses(coursesWithProfessors);
                })
                .catch((error) => {
                  console.error("Error fetching courses:", error);
                });
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

      <div className="flex justify-center mb-4">
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto">
          Buscar
        </button>
      </div>


      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Fin de fila de busqueda por ciclo*/}

      {/* Cuadro de horario */}

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
                  {days.map((_, dayIndex) => (
                    <td
                      key={`${dayIndex}-${hourIndex}`}
                      className="p-3 text-xs sm:text-base border border-gray-300 text-center cursor-pointer whitespace-nowrap"
                      onClick={() => toggleCellSelection(dayIndex, hourIndex)} // Abre el modal al hacer clic
                    >
                      {schedule[hourIndex][dayIndex]?.courses && schedule[hourIndex][dayIndex].courses.length > 0 ? (
                        <ul className="list-none bg-blue-100">
                          {schedule[hourIndex][dayIndex].courses.map((course, courseIndex) => (
                            <li key={courseIndex} className="text-sm sm:text-base">
                              {course.course && <><strong>Curso:</strong> {course.course} <br /></>}
                              {course.professor && <><strong>Profesor:</strong> {course.professor} <br /></>}
                              {course.classroom && <><strong>Aula:</strong> {course.classroom} <br /></>}
                              {course.activity && <><strong>Actividad:</strong> {course.activity}</>}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "" // Si no hay cursos, mostramos un mensaje alternativo
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Boton de guardado */}

      <div className="mt-4 flex justify-center">
        <button
          onClick={handleSaveGeneral}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar Horario General"}
        </button>
      </div>

      {/* Fin cuadro de horario */}

      <ScheduleModal
        visible={modalVisible}
        onClose={closeModal}
        onSubmit={handleCellSubmit}
        onDelete={handleCellDelete}
        onDeleteCourse={handleDeleteCourse} // Pasa la función correctamente
        initialData={cellIndex ? schedule[cellIndex.hourIndex][cellIndex.dayIndex] : null}
        courses={courses} // Pasamos los cursos al modal
      />
    </div>
  );
};

export default ScheduleTable;
