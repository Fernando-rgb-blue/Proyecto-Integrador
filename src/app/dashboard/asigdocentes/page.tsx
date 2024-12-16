"use client";
import { useEffect, useState } from "react";
import DashboardTabs from "@/components/Dashboard/DashboardTabs";
import BreadDash from "@/components/Common/BreadDash";
import ProtectedRoute from "@/components/Proteccion"

interface Course {
  _id: string;
  nombre: string;
  ciclo: string;
  profesores: string[];
}

interface Docente {
  _id: string;
  fullname: string;
}

const CoursesList = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(new Set());
  const [selectedDocente, setSelectedDocente] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/course");
        if (!response.ok) throw new Error("Error al obtener los cursos");
        const data = await response.json();

        const orderedData = data.sort((a: Course, b: Course) => {
          const cicloOrder = [
            "I",
            "II",
            "III",
            "IV",
            "V",
            "VI",
            "VII",
            "VIII",
            "IX",
            "X",
          ];
          return cicloOrder.indexOf(a.ciclo) - cicloOrder.indexOf(b.ciclo);
        });

        setAllCourses(orderedData);
        setCourses(orderedData);
      } catch (error: any) {
        setError(error.message);
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
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchCourses();
    fetchDocentes();
  }, []);

  const handleCheckboxChange = (id: string) => {
    setSelectedCourses((prevSelectedCourses) => {
      const newSelectedCourses = new Set(prevSelectedCourses);
      if (newSelectedCourses.has(id)) newSelectedCourses.delete(id);
      else newSelectedCourses.add(id);
      return newSelectedCourses;
    });
  };

  const handleDocenteChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDocente = e.target.value;
    setSelectedDocente(newDocente);

    if (newDocente) {
      const filteredCourses = allCourses.filter((course) =>
        course.profesores.includes(newDocente)
      );

      const selectedCourseIds = new Set(filteredCourses.map((course: Course) => course._id));
      setSelectedCourses(selectedCourseIds);
      setCourses(filteredCourses);
    } else {
      setCourses(allCourses);
      setSelectedCourses(new Set());
    }
  };

  const handleSave = async () => {
    if (!selectedDocente) {
      alert("Por favor, seleccione un docente para agregar o eliminar.");
      return;
    }

    const coursesToAddDocente = allCourses.filter(
      (course) => selectedCourses.has(course._id) && !course.profesores.includes(selectedDocente)
    );

    const coursesToRemoveDocente = allCourses.filter(
      (course) => !selectedCourses.has(course._id) && course.profesores.includes(selectedDocente)
    );

    for (const course of coursesToAddDocente) {
      try {
        const response = await fetch(`/api/course/${course._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: course.nombre,
            ciclo: course.ciclo,
            profesores: [...course.profesores, selectedDocente],
          }),
        });
        if (response.ok) {
          setCourses((prevCourses) =>
            prevCourses.map((c) =>
              c._id === course._id
                ? { ...c, profesores: [...c.profesores, selectedDocente] }
                : c
            )
          );
        }
      } catch (error) {
        console.error("Error al agregar el docente al curso:", error);
        setModalMessage("Error al registrar");
        setIsError(true);
        setModalVisible(true);
      }
    }

    for (const course of coursesToRemoveDocente) {
      try {
        const response = await fetch(`/api/course/${course._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: course.nombre,
            ciclo: course.ciclo,
            profesores: course.profesores.filter((prof) => prof !== selectedDocente),
          }),
        });
        if (response.ok) {
          setCourses((prevCourses) =>
            prevCourses.map((c) =>
              c._id === course._id
                ? { ...c, profesores: c.profesores.filter((prof) => prof !== selectedDocente) }
                : c
            )
          );
        }
      } catch (error) {
        console.error("Error al eliminar el docente del curso:", error);
        setModalMessage("Error al registrar el docente en los cursos.");
        setIsError(true);
        setModalVisible(true);
      }
    }

    const fetchUpdatedCourses = async () => {
      try {
        const response = await fetch("/api/course");
        if (!response.ok) throw new Error("Error al obtener los cursos actualizados");
        const updatedCourses = await response.json();

        const orderedData = updatedCourses.sort((a: Course, b: Course) => {
          const cicloOrder = [
            "I",
            "II",
            "III",
            "IV",
            "V",
            "VI",
            "VII",
            "VIII",
            "IX",
            "X",
          ];
          return cicloOrder.indexOf(a.ciclo) - cicloOrder.indexOf(b.ciclo);
        });

        setAllCourses(orderedData);
        setCourses(orderedData);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchUpdatedCourses();

    setModalMessage("Se registró correctamente");
    setIsError(false);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <ProtectedRoute /> 
      <BreadDash />
      <DashboardTabs />
      <div className="container mx-auto px-4 pb-9 sm:px-6 lg:px-8 mt-4">
        <div className="mb-6">
          
          <label htmlFor="docentes" className="block text-lg font-medium mb-2">
            Docente
          </label>
          <div className="flex flex-wrap items-center gap-4">
            <select
              id="docentes"
              value={selectedDocente}
              onChange={handleDocenteChange}
              className="p-2 border border-gray-300 rounded-lg w-full sm:w-auto dark:bg-dark"
            >
              <option value="">Seleccionar Docente</option>
              {docentes.map((users) => (
                <option key={users._id} value={users.fullname}>
                  {users.fullname}
                </option>
              ))}
            </select>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white py-2 px-4 rounded-lg w-full sm:w-auto"
            >
              Guardar
            </button>
          </div>
        </div>

        <div>
          {loading ? (
            <div className="text-center text-lg">Cargando cursos...</div>
          ) : error ? (
            <div className="text-center text-lg text-red-500">Error: {error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"].map((ciclo) => {
                const coursesInCycle = allCourses.filter((course) => course.ciclo === ciclo);
                return coursesInCycle.length > 0 ? (
                  <div key={ciclo} className="bg-gray-100 p-4 rounded-lg shadow-md dark:bg-slate-800">
                    <h2 className="text-xl font-semibold mb-4 text-center">Ciclo {ciclo}</h2>
                    <div className="flex flex-col gap-4">
                      {coursesInCycle.map((course) => (
                        <div key={course._id} className="flex items-center justify-between">
                          <label className="text-sm font-medium">{course.nombre}</label>
                          <input
                            type="checkbox"
                            checked={selectedCourses.has(course._id)}
                            onChange={() => handleCheckboxChange(course._id)}
                            className="w-5 h-5"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>

        {/* Modal */}
        {modalVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white p-6 rounded-md shadow-md text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <svg
              className="mx-auto mb-4"
              width="50"
              height="50"
              viewBox="0 0 50 50"
            >
              <circle
                cx="25"
                cy="25"
                r="22"
                fill="none"
                stroke={isError ? "red" : "green"}
                strokeWidth="4"
                strokeDasharray="138"
                strokeDashoffset="138"
                style={{
                  animation: "draw-circle 1s forwards",
                }}
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                fontSize="24"
                fill={isError ? "red" : "green"}
              >
                {isError ? "✕" : "✓"}
              </text>
            </svg>
            <p className="text-lg dark:text-black">{modalMessage}</p>
            <button
              onClick={closeModal}
              className={`mt-4 px-4 py-2 rounded-lg text-white ${isError ? "bg-red-500" : "bg-green-500"}`}
            >
              Ok
            </button>
          </div>
        </div>
        )}

        <style jsx>{`
          @keyframes draw-circle {
            0% {
              stroke-dashoffset: 138; /* Empieza sin dibujo */
            }
            100% {
              stroke-dashoffset: 0; /* Termina con el círculo completamente dibujado */
            }
          }
        `}</style>
    </div>
  </>
);
};

export default CoursesList;