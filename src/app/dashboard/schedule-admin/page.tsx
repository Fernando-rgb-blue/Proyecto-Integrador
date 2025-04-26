

'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import BreadDash from "@/components/Common/BreadDash";
import DashboardTabs from "@/components/Dashboard/DashboardTabs";
import ProtectedRoute from "@/components/Proteccion"

interface ScheduleItem {
  _id?: string;
  available: number;
  courses: {
    course: string;
    professor: string;
    activity: string;
    classroom: string;
    hours?: number;
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
  const makeDefault = () => [{ course: "", professor: "", activity: "", classroom: "", hours: 2 }];
  const initialCourses = (initialData?.courses && initialData.courses.length > 0)
    ? initialData!.courses
    : makeDefault();
  const [courseData, setCourseData] = useState(initialCourses);
  const [classrooms, setClassrooms] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [docentes, setDocentes] = useState<any[]>([]);

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
    if (visible) {
      // si vienen cursos, úsalos; si no, arranca con uno vacío
      const newCourses = (initialData?.courses && initialData.courses.length > 0)
        ? initialData.courses
        : makeDefault();
      setCourseData(newCourses);
      setError(null);
    }
  }, [visible, initialData]);


  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await axios.get("/api/classroom/");
        const classroomNames = response.data.map((room: { name: string }) => room.name);
        setClassrooms(classroomNames);
      } catch (error) {
        console.error("Error al cargar las aulas:", error);
      }
    };

    const fetchDocentes = async () => {
      try {
        const response = await fetch("/api/auth/signup/");
        if (!response.ok) throw new Error("Error al obtener los docentes");
        const data = await response.json();

        const filteredDocentes = data.filter(
          (docente: any) => docente.role !== "admin" && docente.status === "activo"
        );

        setDocentes(filteredDocentes);
      } catch (error) {
        console.error("Error cargando docentes:", error);
      }
    };

    fetchDocentes();

    fetchClassrooms();
  }, []);






  const handleAddCourse = () => {
    setCourseData([
      ...courseData,
      { course: "", professor: "", activity: "", classroom: "" },
    ]);
  };

  const handleCourseChange = (index: number, field: string, value: string) => {
    const updatedCourses = [...courseData];
    updatedCourses[index] = { ...updatedCourses[index], [field]: value };

    if (field === "course") {
      const [courseName, professorId] = value.split(" / ");
      updatedCourses[index].course = courseName;
      updatedCourses[index].professor = professorId;
    }

    setCourseData(updatedCourses);
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
                value={`${course.course} / ${course.professor}`}
                onChange={(e) => handleCourseChange(index, "course", e.target.value)}
                className="border rounded w-full p-2"
              >
                <option value="">Seleccione un curso</option>
                {courses.map((courseWithProfessor, i) => {
                  const [courseName, professorId] = courseWithProfessor.split(" / ");
                  const professor = docentes.find((d) => d._id === professorId);
                  const professorName = professor ? professor.fullname : "Desconocido";

                  return (
                    <option key={i} value={courseWithProfessor}>
                      {courseName} / {professorName}
                    </option>
                  );
                })}
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
                <option value="Teoría">Teoría</option>
                <option value="Laboratorio 1">Laboratorio 1</option>
                <option value="Laboratorio 2">Laboratorio 2</option>
                <option value="Laboratorio 3">Laboratorio 3</option>
                <option value="Laboratorio 4">Laboratorio 4</option>
                <option value="Grupo 1">Grupo 1</option>
                <option value="Grupo 2">Grupo 2</option>
                <option value="Grupo 3">Grupo 3</option>
                <option value="Grupo 4">Grupo 4</option>
                <option value="Grupo 5">Grupo 5</option>
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

            {/* //"nuevoooo" */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Horas</label>
              <select
                value={course.hours || 1}
                onChange={(e) => handleCourseChange(index, "hours", e.target.value)}
                className="border rounded w-full p-2"
              >
                {[1, 2, 3, 4, 5].map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>

            {/* fin nuevo */}
            {courseData.length >= 1 && (
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


        {(courseData.length === 1 || courseData.length === 2)&& (
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


        {/* {courseData.length === 1 && (
          <button
            onClick={handleDelete}
            className="mt-2 bg-red-500 text-white p-2 rounded w-full"
          >
            Borrar Datos de Celda
          </button>
        )} */}
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

  //aaaaaaaaaaaaaa
  const [initialCourses, setInitialCourses] = useState<ScheduleItem['courses']>([]);

  const [schedule, setSchedule] = useState<Array<Array<ScheduleItem | null>>>(Array.from({ length: 14 }, () => Array(5).fill(null)));
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
  const [selectedDocente, setSelectedDocente] = useState<string>("");
  const [selectedAula, setSelectedAula] = useState<string>("");
  const [docentes, setDocentes] = useState<any[]>([]);
  //colores

  const colors = [
    "bg-red-200",
    "bg-gray-200",
    "bg-green-200",
    "bg-blue-200",
    "bg-orange-200",
    "bg-pink-200",
    "bg-purple-200",
  ];

  // Objeto para almacenar el mapeo curso -> color

  const courseColorMap: { [key: string]: string } = {};

  // Función para obtener un color basado en el curso

  const getCourseColor = (courseName: string) => {

    // Extraer la parte antes del '/'

    const baseCourseName = courseName.split('/')[0].trim();

    // Si no existe un color asignado para el nombre base, asignar uno

    if (!courseColorMap[baseCourseName]) {
      const colorIndex = Object.keys(courseColorMap).length % colors.length; // Ciclar colores si se acaban
      courseColorMap[baseCourseName] = colors[colorIndex];
    }

    // Retornar el color correspondiente
    return courseColorMap[baseCourseName];

  };

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
    "07:00 AM a 08:00 AM", "08:00 AM a 09:00 AM", "09:00 AM a 10:00 AM",
    "10:00 AM a 11:00 AM", "11:00 AM a 12:00 PM", "12:00 PM a 01:00 PM",
    "01:00 PM a 02:00 PM", "02:00 PM a 03:00 PM",
    "03:00 PM a 04:00 PM", "04:00 PM a 05:00 PM",
    "05:00 PM a 06:00 PM", "06:00 PM a 07:00 PM",
    "07:00 PM a 08:00 PM", "08:00 PM a 09:00 PM",
  ];

  const handleDeleteCourse = () => { };


  //Buscando el ID de ciclo/periodo
  const handleSearch = async () => {
    try {
      // Asegurarse de que todos los parámetros estén definidos
      if (!anio || !periodo || !ciclo || !seccion) {
        throw new Error('Por favor complete todos los campos');
      }
      const response = await fetch('/api/cicloperiodo/search?' + new URLSearchParams({
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
          const updatedSchedule = mapScheduleData(data, 14); // 14 slots por día
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

    const fetchDocentes = async () => {
      try {
        const res = await fetch("/api/auth/signup");
        if (!res.ok) throw new Error("Error al obtener docentes");
        const data = await res.json();

        const activos = data.filter((u: any) => u.status === "activo" && u.role !== "admin");
        setDocentes(activos);
      } catch (err) {
        console.error("Error cargando docentes:", err);
      }
    };

    fetchDocentes();

    fetchSchedule();
  }, [horarioID]);


  const handleDocenteChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDocente = e.target.value;
    setSelectedDocente(newDocente);
  };

  const handleDocenteAula = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const neweAula = e.target.value;
    setSelectedAula(neweAula);
  };

  const getNombreDocente = (id: string) => {
    const docente = docentes.find((d) => d._id === id);
    return docente ? docente.fullname : id; // fallback por si aún no cargó
  };

  // Función para crear un nuevo horario // En base a la estructura de la api


  const createNewSchedule = async (id) => {


    const newSchedule = {
      _id: id, // Usar el ID encontrado
      lunes: Array.from({ length: 14 }, () => ({
        available: 0,
        courses: [
          {
            course: "", professor: "", classroom: "", activity: "",
          },
        ],
      })),
      martes: Array.from({ length: 14 }, () => ({
        available: 0,
        courses: [
          {
            course: "", professor: "", classroom: "", activity: "",
          },
        ],
      })),
      miercoles: Array.from({ length: 14 }, () => ({
        available: 0,
        courses: [
          {
            course: "", professor: "", classroom: "", activity: "",
          },
        ],
      })),
      jueves: Array.from({ length: 14 }, () => ({
        available: 0,
        courses: [
          {
            course: "", professor: "", classroom: "", activity: "",
          },
        ],
      })),
      viernes: Array.from({ length: 14 }, () => ({
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
      Array.from({ length: 14 }, () =>
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


  const handleCellSubmit = (data: ScheduleItem) => {
    if (!cellIndex) return;
    const { dayIndex, hourIndex } = cellIndex;
  
    // 1) Copia profunda
    const updated = schedule.map(row =>
      row.map(cell => ({
        available: cell?.available ?? 0,
        courses: cell?.courses.map(c => ({ ...c }))
      }))
    );
  
    // 2) Detectar cursos que existían pero ya no están en `data.courses`
    const removed = initialCourses.filter(ic =>
      !data.courses.some(nc =>
        nc.course    === ic.course    &&
        nc.activity  === ic.activity  &&
        nc.classroom === ic.classroom &&
        nc.professor === ic.professor
      )
    );
  
    // 3) Para cada curso eliminado, barrer hacia arriba y abajo y quitarlo
    removed.forEach(rem => {
      // Hacia arriba (incluyendo la fila actual)
      for (let r = hourIndex; r >= 0; r--) {
        const cell = updated[r][dayIndex];
        const before = cell.courses.length;
        cell.courses = cell.courses.filter(c =>
          !(c.course    === rem.course    &&
            c.activity  === rem.activity  &&
            c.classroom === rem.classroom &&
            c.professor === rem.professor)
        );
        if (cell.courses.length === 0) cell.available = 0;
        if (cell.courses.length === before) break;  // si en esa fila no había rem, paramos
      }
      // Hacia abajo
      for (let r = hourIndex + 1; r < updated.length; r++) {
        const cell = updated[r][dayIndex];
        const before = cell.courses.length;
        cell.courses = cell.courses.filter(c =>
          !(c.course    === rem.course    &&
            c.activity  === rem.activity  &&
            c.classroom === rem.classroom &&
            c.professor === rem.professor)
        );
        if (cell.courses.length === 0) cell.available = 0;
        if (cell.courses.length === before) break;
      }
    });
  
    // 4) Insertar/actualizar los cursos que vienen en `data.courses`
    data.courses.forEach(courseEntry => {
      const h = Number(courseEntry.hours) || 1;
      for (let offset = 0; offset < h; offset++) {
        const r = hourIndex + offset;
        if (r >= updated.length) break;
        const cell = updated[r][dayIndex];
        cell.available = 1;
        // reemplazamos la lista de courses por la nueva (sin duplicados)
        const exists = cell.courses.some(c =>
          c.course    === courseEntry.course    &&
          c.activity  === courseEntry.activity  &&
          c.classroom === courseEntry.classroom &&
          c.professor === courseEntry.professor
        );
        if (!exists) {
          cell.courses.push({ ...courseEntry });
        }
      }
    });
  
    setSchedule(updated);
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
    const payload: Record<string, any[]> = {};
  
    dayMap.forEach((day, dayIndex) => {
      // Recorremos cada fila del schedule para este día
      payload[day] = schedule.map((row) => {
        const cell = row[dayIndex] || { available: 0, courses: [] };
  
        // Si no hay ningún curso, metemos el placeholder
        const courses = cell.courses.length > 0
          ? cell.courses
          : [{
              course:    "",
              professor: "",
              classroom: "",
              activity:  ""
            }];
  
        return {
          available: cell.available ?? 0,
          courses
        };
      });
      // Si realmente quieres omitir los null (no recomendable aquí), podrías filtrar:
      // .filter(item => item !== null)
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
    setInitialCourses(schedule[hourIndex][dayIndex].courses);
    setModalVisible(true);
  }


  // Pantalla de la busqueda de ciclo y horario - Cuadro de horario


  return (

    <>
      <ProtectedRoute />
      <BreadDash />
      <DashboardTabs />

      <div className="container mx-auto p-4 pt-10">

        {/* Fila de busqueda por ciclo */}
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label className="block mb-2" htmlFor="anio">
              Año
            </label>
            <select
              id="anio"
              value={anio}
              onChange={(e) => setAnio(e.target.value)}
              className="border rounded p-2 w-full"
            >
              <option value="">Seleccione un año</option>
              {optionsAnio.map((anioOption) => (
                <option key={anioOption} value={anioOption}>
                  {anioOption}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block mb-2" htmlFor="periodo">
              Periodo
            </label>
            <select
              id="periodo"
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="border rounded p-2 w-full"
            >
              <option value="">Seleccione un periodo</option>
              {optionsPeriodo.map((periodoOption) => (
                <option key={periodoOption} value={periodoOption}>
                  {periodoOption}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block mb-2" htmlFor="ciclo-seccion">
              Ciclo
            </label>
            <select
              id="ciclo-seccion"
              value={`${ciclo}-${seccion}`}
              onChange={(e) => {
                const [selectedCiclo, selectedSeccion] = e.target.value.split('-');
                setCiclo(selectedCiclo);
                setSeccion(selectedSeccion);
                axios
                  .get(`/api/course/search?ciclo=${selectedCiclo}`)
                  .then((response) => {
                    const coursesWithProfessors = response.data.flatMap(
                      (course: { nombre: string; profesores: string[] }) =>
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
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto"
          >
            Buscar
          </button>
        </div>

        {error && <p className="mt-4 text-red-500">{error}</p>}

        {/* Cuadro de horario */}
        {/* Cuadro de horario (sin tabla crj) */}
        <div className="overflow-x-auto container mx-auto mt-10 mb-10 p-4" style={{ marginTop: '1cm' }}>
          <div className=" min-w-[800px] sm:min-w-[600px]">
            <div className="grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${days.length + 1}, minmax(120px, 1fr))` }}>
              {/* Encabezado */}
              <div className="bg-blue-800 text-white p-3 text-xs sm:text-base border-[4px] border-gray-300 dark:border-dark text-center font-bold">
                HORAS
              </div>
              {days.map((day, index) => (
                <div
                  key={index}
                  className="bg-blue-800 text-white p-3 text-xs sm:text-base border-[4px] border-gray-300 dark:border-dark text-center font-bold"
                >
                  {day}
                </div>
              ))}

              {/* Cuerpo */}
              {hours.map((hour, hourIndex) => (
                <React.Fragment key={hourIndex}>
                  {/* Celda de la hora */}
                  <div className="p-2 text-center border-[4px] border-gray-300 dark:border-dark text-sm flex items-center justify-center">
                    {hour}
                  </div>
                  {/* Celdas del horario */}
                  {days.map((_, dayIndex) => {
                    const currentCell = schedule[hourIndex][dayIndex];
                    return (
                      <div
                        key={`${hourIndex}-${dayIndex}`}
                        className="text-center align-middle border-[4px] border-gray-300 dark:border-dark text-sm whitespace-normal flex flex-col justify-center items-center p-2"
                        style={{ gridRow: 'span 1' }}
                        onClick={() => toggleCellSelection(dayIndex, hourIndex)}
                      >
                        {currentCell && currentCell.courses.length > 0 && currentCell.available === 1 ? (
                          currentCell.courses.map((course, idx) => (
                            <div key={idx} className="text-xs dark:text-dark">
                              <p className={course.course ? getCourseColor(course.course) : ""}>
                                {course.course}
                              </p>
                              <p className={course.course ? getCourseColor(course.course) : ""}>
                                {getNombreDocente(course.professor)}
                              </p>
                              <p className={course.course ? getCourseColor(course.course) : ""}>
                                {course.activity}
                              </p>
                              <p className={course.course ? getCourseColor(course.course) : ""}>
                                {course.classroom}
                              </p>
                            </div>
                          ))
                        ) : (
                          <span
                            className="text-xs text-gray-500"
                            onClick={() => toggleCellSelection(dayIndex, hourIndex)}
                          >
                            -
                          </span>
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
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