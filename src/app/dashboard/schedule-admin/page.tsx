'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import BreadDash from "@/components/Common/BreadDash";
import DashboardTabs from "@/components/Dashboard/DashboardTabs";


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


  // Bloquear scroll en el fondo cuando el modal esté visible
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }


    // Limpieza del efecto al desmontar el componente
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);


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


  if (!visible) return null;


  return (
    <div className="fixed inset-0 flex items-center justify-center z-[5000]">
      {/* Fondo oscuro */}
      <div className="fixed inset-0 bg-black bg-opacity-80" onClick={onClose}></div>


      {/* Contenido del modal */}
      <div className="bg-white w-full max-w-2xl  p-4 rounded-lg shadow-lg z-10 relative max-h-[90vh] overflow-y-auto mx-3 dark:bg-dark">
        <h2 className="text-xl font-semibold mb-4">Modificar Horario</h2>


        {courseData.map((course, index) => (
          <div key={index} className="space-y-4 border-b pb-4">
            <h3 className="text-lg font-medium">Curso {index + 1}</h3>


            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Curso</label>
              <select
                value={course.course}
                onChange={(e) => handleCourseChange(index, "course", e.target.value)}
                className="border rounded w-full p-2"
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
              <label className="block text-sm font-medium mb-1">Actividad</label>
              <select
                value={course.activity}
                onChange={(e) => handleCourseChange(index, "activity", e.target.value)}
                className="border rounded w-full p-2"
              >
                <option value="">Seleccione una Actividad</option>
                <option value="Práctica">Práctica</option>
                <option value="Laboratorio">Laboratorio</option>
                <option value="Teoría">Teoría</option>
              </select>
            </div>


            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Aula</label>
              <select
                value={course.classroom}
                onChange={(e) => handleCourseChange(index, "classroom", e.target.value)}
                className="border rounded w-full p-2"
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
    'I': ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'],
    'II': ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
  };


  const optionsSeccion = ['A', 'B'];
  const optionsAnio = ['2025'];
  const optionsPeriodo = ['I', 'II'];
  const filteredCiclos = periodo ? optionsCiclo[periodo] : [];
  const days = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES"];
  const hours = [
    "07:00 - 08:00 AM", "08:00 - 09:00 AM", "09:00 - 10:00 AM",
    "10:00 - 11:00 AM", "11:00 - 12:00 PM", "12:00 - 01:00 PM",
    "01:00 - 02:00 PM", "03:00 - 04:00 PM", "04:00 - 05:00 PM",
    "05:00 - 06:00 PM", "06:00 - 07:00 PM", "07:00 - 08:00 PM",
    "08:00 - 09:00 PM",
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
  
      // Validar si la celda seleccionada es válida
      const currentCell = schedule[hourIndex][dayIndex];
      if (!currentCell || currentCell.available !== 1) {
        setError("No hay datos para borrar en esta celda.");
        return;
      }
  
      // Crear una copia del horario
      const updatedSchedule = [...schedule];
  
      // Identificar y borrar datos hacia abajo
      for (let i = hourIndex; i < updatedSchedule.length; i++) {
        const nextCell = updatedSchedule[i][dayIndex];
        if (
          nextCell &&
          nextCell.courses[0]?.course === currentCell.courses[0]?.course &&
          nextCell.courses[0]?.activity === currentCell.courses[0]?.activity &&
          nextCell.available === 1
        ) {
          updatedSchedule[i][dayIndex] = {
            available: 0,
            courses: [
              {
                course: "",
                professor: "",
                activity: "",
                classroom: "",
              },
            ],
          };
        } else {
          break;
        }
      }
  
      // Identificar y borrar datos hacia arriba
      for (let i = hourIndex - 1; i >= 0; i--) {
        const prevCell = updatedSchedule[i][dayIndex];
        if (
          prevCell &&
          prevCell.courses[0]?.course === currentCell.courses[0]?.course &&
          prevCell.courses[0]?.activity === currentCell.courses[0]?.activity &&
          prevCell.available === 1
        ) {
          updatedSchedule[i][dayIndex] = {
            available: 0,
            courses: [
              {
                course: "",
                professor: "",
                activity: "",
                classroom: "",
              },
            ],
          };
        } else {
          break;
        }
      }
  
      // Actualizar el estado del horario
      setSchedule(updatedSchedule);
      setError(""); // Limpiar cualquier error previo
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
    <>
      <BreadDash/>
      <DashboardTabs/>
      <div className="container mx-auto p-4 pt-10" >
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
            <label className="block mb-2" htmlFor="ciclo-seccion">Ciclo</label>
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
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] sm:min-w-[600px] table-auto border-collapse border border-gray-300 dark:bg-dark">
              <thead>
                <tr>
                  <th className="bg-blue-800 text-white p-3 text-xs sm:text-base border border-gray-300 w-[120px] sm:w-[150px] text-center">
                    HORAS
                  </th>
                  {days.map((day, index) => (
                    <th
                      key={index}
                      className="bg-blue-800 text-white p-3 text-xs sm:text-base border border-gray-300 w-[120px] sm:w-[150px] text-center"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {hours.map((hour, hourIndex) => {
                  return (
                    <tr key={hourIndex}>
                      {/* Columna de las horas */}
                      <td className="p-2 text-center border border-gray-300 text-sm">
                        {hour}
                      </td>
                      {/* Iterar sobre los días */}
                      {days.map((_, dayIndex) => {
                        const currentCell = schedule[hourIndex][dayIndex];
                        let isMasterCell = true; // Si esta celda es la "principal" del grupo
                        let rowSpan = 1;

                        // Verificar si es parte de un grupo de celdas
                        if (hourIndex > 0) {
                          const previousCell = schedule[hourIndex - 1][dayIndex];
                          if (
                            previousCell &&
                            currentCell &&
                            previousCell.courses[0]?.course === currentCell.courses[0]?.course &&
                            previousCell.courses[0]?.activity === currentCell.courses[0]?.activity &&
                            currentCell.available === 1
                          ) {
                            isMasterCell = false; // No renderizar esta celda
                          }
                        }

                        // Calcular cuántas filas debe abarcar esta celda
                        if (isMasterCell) {
                          for (let i = hourIndex + 1; i < schedule.length; i++) {
                            const nextCell = schedule[i][dayIndex];
                            if (
                              nextCell &&
                              currentCell &&
                              nextCell.courses[0]?.course === currentCell.courses[0]?.course &&
                              nextCell.courses[0]?.activity === currentCell.courses[0]?.activity &&
                              nextCell.available === 1
                            ) {
                              rowSpan++;
                            } else {
                              break;
                            }
                          }
                        }

                        // Si no es la celda principal, no renderizar nada
                        if (!isMasterCell) return null;

                        // Renderizar celda con `rowSpan` adecuado
                        return (
                          <td
                            key={`${hourIndex}-${dayIndex}`}
                            className="p-2 text-center border border-gray-300 text-sm whitespace-normal align-top"
                            rowSpan={rowSpan}
                            onClick={() => toggleCellSelection(dayIndex, hourIndex)}
                          >
                            {currentCell && currentCell.courses.length > 0 ? (
                              currentCell.courses.map((course, index) => (
                                <div key={index} className="text-xs">
                                  <p>{course.course}</p>
                                  <p>{course.activity}</p>
                                  <p>{course.classroom}</p>
                                </div>
                              ))
                            ) : (
                              <span className="text-xs text-gray-500">Vacío</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
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
          {loading ? (
            <span className="text-black">Elija horario</span>
          ) : (
            "Guardar Horario General"
          )}
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
    </>
  
  );
};


export default ScheduleTable;