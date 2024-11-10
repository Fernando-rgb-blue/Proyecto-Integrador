'use client'
import { useEffect, useState } from 'react';

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
  const [selectedDocente, setSelectedDocente] = useState<string>('');

  useEffect(() => {


    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/course');
        if (!response.ok) throw new Error('Error al obtener los cursos');
        const data = await response.json();

        // Ordena los cursos por ciclo
        const orderedData = data.sort((a: Course, b: Course) => {
          const cicloOrder = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
          return cicloOrder.indexOf(a.ciclo) - cicloOrder.indexOf(b.ciclo);
        });

        setAllCourses(orderedData);
        setCourses(orderedData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };



    const fetchDocentes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/signup/');
        if (!response.ok) throw new Error('Error al obtener los docentes');
        const data = await response.json();
        setDocentes(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchCourses();
    fetchDocentes();
  }, []);

  const fetchFilteredCourses = () => {
    if (!selectedDocente) {
      setCourses(allCourses);
      setSelectedCourses(new Set());
    } else {
      const filteredCourses = allCourses.filter(course =>
        course.profesores.includes(selectedDocente)
      );
      setCourses(filteredCourses);
      const selectedCourseIds = new Set(filteredCourses.map((course: Course) => course._id));
      setSelectedCourses(selectedCourseIds);
    }
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedCourses(prevSelectedCourses => {
      const newSelectedCourses = new Set(prevSelectedCourses);
      if (newSelectedCourses.has(id)) newSelectedCourses.delete(id);
      else newSelectedCourses.add(id);
      return newSelectedCourses;
    });
  };

  const handleDocenteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDocente(e.target.value);
  };


  const handleSave = async () => {
    if (!selectedDocente) {
      alert('Por favor, seleccione un docente para agregar o eliminar.');
      return;
    }

    // Cursos donde se debe agregar el docente (marcados)
    const coursesToAddDocente = allCourses.filter(
      (course) => selectedCourses.has(course._id) && !course.profesores.includes(selectedDocente)
    );

    // Cursos donde se debe eliminar el docente (desmarcados)
    const coursesToRemoveDocente = allCourses.filter(
      (course) => !selectedCourses.has(course._id) && course.profesores.includes(selectedDocente)
    );

    // Actualizar cursos para agregar el docente
    for (const course of coursesToAddDocente) {
      try {
        await fetch(`http://localhost:3000/api/course/${course._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: course.nombre,
            ciclo: course.ciclo,
            profesores: [...course.profesores, selectedDocente],
          }),
        });
      } catch (error) {
        console.error('Error al agregar el docente al curso:', error);
      }
    }

    // Actualizar cursos para eliminar el docente
    for (const course of coursesToRemoveDocente) {
      try {
        await fetch(`http://localhost:3000/api/course/${course._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: course.nombre,
            ciclo: course.ciclo,
            profesores: course.profesores.filter((prof) => prof !== selectedDocente),
          }),
        });
      } catch (error) {
        console.error('Error al eliminar el docente del curso:', error);
      }
    }

    alert('Los cambios en los cursos seleccionados han sido guardados.');
  };


  return (
    <div className="container mx-auto p-6 mt-[150px]">
      <h1 className="text-3xl font-semibold mb-6">Lista de Cursos</h1>
      <div className="flex gap-6">
        <div className="w-1/3">
          <label htmlFor="docentes" className="block text-lg font-medium mb-2">Selecciona un Docente</label>
          <select
            id="docentes"
            value={selectedDocente}
            onChange={handleDocenteChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Seleccione un docente</option>
            {docentes.map(users => (
              <option key={users._id} value={users.fullname}>
                {users.fullname}
              </option>
            ))}
          </select>
          <button
            onClick={fetchFilteredCourses}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Buscar
          </button>
          <button
            onClick={handleSave}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg"
          >
            Guardar
          </button>
        </div>
        <div className="w-2/3">
          {loading ? (
            <div className="text-center text-lg">Cargando cursos...</div>
          ) : error ? (
            <div className="text-center text-lg text-red-500">Error: {error}</div>
          ) : (
            <div className="grid gap-8">
              {["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"].map((ciclo) => {
                const coursesInCycle = allCourses.filter((course) => course.ciclo === ciclo);

                return coursesInCycle.length > 0 ? (
                  <div key={ciclo}>
                    <h2 className="text-2xl font-semibold mb-4">Ciclo {ciclo}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {coursesInCycle.map((course) => (
                        <div key={course._id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                          <label className="flex items-center gap-4">
                            <input
                              type="checkbox"
                              checked={selectedCourses.has(course._id)}
                              onChange={() => handleCheckboxChange(course._id)}
                              className="w-5 h-5"
                            />
                            <span className="text-lg">{course.nombre}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );



};

export default CoursesList;
