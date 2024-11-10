'use client';
import { useEffect, useState } from "react";

interface Course {
    _id: string;
    name: string;
    cycle: string;
}

const Courses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [currentCourse, setCurrentCourse] = useState<Course | null>(null);

    // Función para bloquear el scroll
    const disableScroll = () => {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollBarWidth}px`; // Compensa el espacio de la barra de desplazamiento
    };

    // Función para habilitar el scroll
    const enableScroll = () => {
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = '0px'; // Elimina el padding de la barra de desplazamiento
    };

    // Obtener todos los cursos
    const fetchCourses = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/course", { method: "GET" });
            if (!response.ok) throw new Error("Error al obtener los cursos");
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.error("Error al obtener los cursos:", error);
            setError("Error al obtener los cursos");
        } finally {
            setLoading(false);
        }
    };

    // Crear un nuevo curso
    const createCourse = async (name: string, cycle: string, event: React.MouseEvent) => {
        event.preventDefault(); // Prevenir la recarga al guardar
        try {
            const response = await fetch("/api/course", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, cycle }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error al crear el curso:", errorData.message);
                alert("Error al crear el curso: " + errorData.message);
                return;
            }

            fetchCourses(); // Recargar la lista
            setShowAddPopup(false); // Cerrar el modal
            enableScroll(); // Habilitar el scroll
        } catch (error) {
            console.error("Error en la solicitud de creación:", error);
            alert("Error en la solicitud de creación.");
        }
    };

    // Eliminar un curso
    const deleteCourse = async (id: string, event: React.MouseEvent) => {
        event.preventDefault(); // Prevenir la recarga al eliminar
        try {
            const response = await fetch("/api/course", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error al eliminar el curso:", errorData.message);
                alert("Error al eliminar el curso: " + errorData.message);
                return;
            }

            fetchCourses(); // Recargar la lista
            setShowDeletePopup(false); // Cerrar el modal
            enableScroll(); // Habilitar el scroll
        } catch (error) {
            console.error("Error en la solicitud de eliminación:", error);
            alert("Error en la solicitud de eliminación.");
        }
    };

    // Actualizar un curso
    const updateCourse = async (id: string, name: string, cycle: string, event: React.MouseEvent) => {
        event.preventDefault(); // Prevenir la recarga al guardar
        try {
            const response = await fetch("/api/course", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, name, cycle }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error al actualizar el curso:", errorData.message);
                alert("Error al actualizar el curso: " + errorData.message);
                return;
            }

            fetchCourses(); // Recargar la lista
            setShowEditPopup(false); // Cerrar el modal
            enableScroll(); // Habilitar el scroll
        } catch (error) {
            console.error("Error en la solicitud de actualización:", error);
            alert("Error en la solicitud de actualización.");
        }
    };

    const openEditPopup = (course: Course) => {
        setCurrentCourse(course);
        setShowEditPopup(true);
        disableScroll(); // Bloquear scroll al abrir modal
    };

    const openDeletePopup = (course: Course) => {
        setCurrentCourse(course);
        setShowDeletePopup(true);
        disableScroll(); // Bloquear scroll al abrir modal
    };

    const closeModals = (event: React.MouseEvent) => {
        event.stopPropagation();
        setShowAddPopup(false);
        setShowEditPopup(false);
        setShowDeletePopup(false);
        enableScroll(); // Habilitar scroll al cerrar modal
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <>
            <div className="max-w-52 mx-auto text-center pt-10">
                <div
                    onClick={() => {
                        setShowAddPopup(true);
                        disableScroll(); // Bloquear scroll al abrir modal de agregar curso
                    }}
                    className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/60 cursor-pointer mb-8"
                >
                    Agregar Curso
                </div>
            </div>

            <div className="max-w-3xl sm:mx-auto mx-4">
                {loading ? (
                    <p>Cargando cursos...</p>
                ) : error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : (
                    <ul>
                        {courses.map((course) => (
                            <li key={course._id} className="bg-primary/30 dark:bg-slate-800 p-4 my-2 rounded-md text-center flex flex-col dark:text-white transition-all">
                                <div className="flex flex-col md:flex-row md:gap-4 w-full">
                                    <div className="grow text-center md:text-left md:w-1/3 flex flex-col justify-center items-center md:items-start">
                                        <h4 className="font-bold text-xl md:text-2xl pb-3">{course.name}</h4>
                                        <div className="flex flex-col gap-y-3 text-start">
                                            <p>Ciclo: {course.cycle}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center gap-4 mt-4 md:mt-0 md:w-1/3">
                                        <div
                                            onClick={() => openEditPopup(course)}
                                            className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/60 cursor-pointer"
                                        >
                                            Editar
                                        </div>
                                        <div
                                            onClick={() => openDeletePopup(course)}
                                            className="rounded-sm border-2 border-primary px-8 py-4 text-base font-semibold text-primary duration-300 ease-in-out hover:bg-primary/30 cursor-pointer"
                                        >
                                            Eliminar
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Modal Agregar Curso */}
            {showAddPopup && (
                <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 transition-opacity duration-150" onClick={closeModals}>
                    <div onClick={(e) => e.stopPropagation()} className="p-6 rounded-lg max-w-sm w-full bg-white dark:bg-dark overflow-hidden">
                        <label>Nombre del Curso</label>
                        <input type="text" placeholder="Nombre del curso" id="name" className="w-full mt-1 mb-5 border rounded" />

                        <label>Ciclo</label>
                        <select id="cycle" className="w-full mt-1 mb-5 border rounded">
                            <option value="I">I</option>
                            <option value="II">II</option>
                            <option value="III">III</option>
                            <option value="IV">IV</option>
                            <option value="V">V</option>
                            <option value="VI">VI</option>
                            <option value="VII">VII</option>
                            <option value="VIII">VIII</option>
                            <option value="IX">IX</option>
                            <option value="X">X</option>
                        </select>

                        <div className="flex justify-between">
                            <button
                                onClick={(e) => {
                                    const name = (document.getElementById("name") as HTMLInputElement).value;
                                    const cycle = (document.getElementById("cycle") as HTMLSelectElement).value;
                                    createCourse(name, cycle, e);
                                }}
                                className="px-8 py-4 bg-primary text-white rounded hover:bg-primary/60 cursor-pointer"
                            >
                                Guardar
                            </button>
                            <button onClick={closeModals} className="secondary px-8 py-4 bg-gray-200 rounded">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Editar Curso */}
            {showEditPopup && currentCourse && (
                <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 transition-opacity duration-150" onClick={closeModals}>
                    <div onClick={(e) => e.stopPropagation()} className="p-6 rounded-lg max-w-sm w-full bg-white dark:bg-dark">
                        <label>Nombre del Curso</label>
                        <input type="text" placeholder="Nombre del curso" id="name" defaultValue={currentCourse.name} className="w-full mt-1 mb-5 border rounded" />

                        <label>Ciclo</label>
                        <select id="cycle" className="w-full mt-1 mb-5 border rounded" defaultValue={currentCourse.cycle}>
                            <option value="I">I</option>
                            <option value="II">II</option>
                            <option value="III">III</option>
                            <option value="IV">IV</option>
                            <option value="V">V</option>
                            <option value="VI">VI</option>
                            <option value="VII">VII</option>
                            <option value="VIII">VIII</option>
                            <option value="IX">IX</option>
                            <option value="X">X</option>
                        </select>

                        <div className="flex justify-between">
                            <button
                                onClick={(e) => {
                                    const name = (document.getElementById("name") as HTMLInputElement).value;
                                    const cycle = (document.getElementById("cycle") as HTMLSelectElement).value;
                                    updateCourse(currentCourse._id, name, cycle, e);
                                }}
                                className="px-8 py-4 bg-primary text-white rounded hover:bg-primary/60 cursor-pointer"
                            >
                                Guardar
                            </button>
                            <button onClick={closeModals} className="secondary px-8 py-4 bg-gray-200 rounded">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Eliminar Curso */}
            {showDeletePopup && currentCourse && (
                <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 transition-opacity duration-150" onClick={closeModals}>
                    <div onClick={(e) => e.stopPropagation()} className="p-6 rounded-lg max-w-sm w-full bg-white dark:bg-dark">
                        <p>¿Estás seguro de eliminar el curso <b>{currentCourse.name}</b>?</p>
                        <div className="flex justify-between mt-4">
                            <button onClick={(e) => deleteCourse(currentCourse._id, e)} className="px-8 py-4 bg-primary text-white rounded hover:bg-primary/60 cursor-pointer">
                                Eliminar
                            </button>
                            <button onClick={closeModals} className="secondary px-8 py-4 bg-gray-200 rounded">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Courses;