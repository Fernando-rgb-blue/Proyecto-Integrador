'use client';
import { useEffect, useState } from "react";

interface Classroom {
    _id: string;
    name: string;
    capacity: number;
    description: string;
}

const Classrooms = () => {
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [currentClassroom, setCurrentClassroom] = useState<Classroom | null>(null);

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

    // Obtener todas las aulas
    const fetchClassrooms = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/classroom", { method: "GET" });
            if (!response.ok) throw new Error("Error al obtener las aulas");
            const data = await response.json();
            setClassrooms(data);
        } catch (error) {
            console.error("Error al obtener las aulas:", error);
            setError("Error al obtener las aulas");
        } finally {
            setLoading(false);
        }
    };

    // Crear una nueva aula
    const createClassroom = async (name: string, capacity: number, description: string, event: React.MouseEvent) => {
        event.preventDefault(); // Prevenir la recarga al guardar
        try {
            const response = await fetch("/api/classroom", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, capacity, description }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error al crear el aula:", errorData.message);
                alert("Error al crear el aula: " + errorData.message);
                return;
            }

            fetchClassrooms(); // Recargar la lista
            setShowAddPopup(false); // Cerrar el modal
            enableScroll(); // Habilitar el scroll
        } catch (error) {
            console.error("Error en la solicitud de creación:", error);
            alert("Error en la solicitud de creación.");
        }
    };

    // Eliminar una aula
    const deleteClassroom = async (id: string, event: React.MouseEvent) => {
        event.preventDefault(); // Prevenir la recarga al eliminar
        try {
            const response = await fetch(`/api/classroom/${id}`, { // Usamos el id pasado como parámetro
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }), // El cuerpo no es necesario para un DELETE, solo el ID en la URL
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error al eliminar el aula:", errorData.message);
                alert("Error al eliminar el aula: " + errorData.message);
                return;
            }

            fetchClassrooms(); // Recargar la lista
            setShowDeletePopup(false); // Cerrar el modal
            enableScroll(); // Habilitar el scroll
        } catch (error) {
            console.error("Error en la solicitud de eliminación:", error);
            alert("Error en la solicitud de eliminación.");
        }
    };

    // Actualizar una aula
    const updateClassroom = async (id: string, name: string, capacity: number, description: string, event: React.MouseEvent) => {
        event.preventDefault(); // Prevenir la recarga al guardar
        try {
            const response = await fetch(`/api/classroom/${id}`, { // Usamos el id pasado como parámetro
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, capacity, description }), // Solo pasar name, capacity y description en el cuerpo
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error al actualizar el aula:", errorData.message);
                alert("Error al actualizar el aula: " + errorData.message);
                return;
            }

            fetchClassrooms(); // Recargar la lista
            setShowEditPopup(false); // Cerrar el modal
            enableScroll(); // Habilitar el scroll
        } catch (error) {
            console.error("Error en la solicitud de actualización:", error);
            alert("Error en la solicitud de actualización.");
        }
    };

    const openEditPopup = (classroom: Classroom) => {
        setCurrentClassroom(classroom);
        setShowEditPopup(true);
        disableScroll(); // Bloquear scroll al abrir modal
    };

    const openDeletePopup = (classroom: Classroom) => {
        setCurrentClassroom(classroom);
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
        fetchClassrooms();
    }, []);

    return (
        <>
            <div className="max-w-52 mx-auto text-center pt-10">
                <div
                    onClick={() => {
                        setShowAddPopup(true);
                        disableScroll(); // Bloquear scroll al abrir modal de agregar aula
                    }}
                    className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/60 cursor-pointer mb-8"
                >
                    Agregar Aula
                </div>
            </div>

            <div className="max-w-3xl sm:mx-auto mx-4">
                {loading ? (
                    <p>Cargando aulas...</p>
                ) : error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : (
                    <ul>
                        {classrooms.map((classroom) => (
                            <li key={classroom._id} className="bg-primary/30 dark:bg-slate-800 p-4 my-2 rounded-md text-center flex flex-col dark:text-white transition-all">
                                <div className="flex flex-col md:flex-row md:gap-4 w-full">
                                    <div className="grow text-center md:text-left md:w-1/3 flex flex-col justify-center items-center md:items-start">
                                        <h4 className="font-bold text-xl md:text-2xl pb-3">{classroom.name}</h4>
                                        <div className="flex flex-col gap-y-3 text-start">
                                            <p>Capacidad: {classroom.capacity}</p>
                                            <p>Descripción: {classroom.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center gap-4 mt-4 md:mt-0 md:w-1/3">
                                        <div
                                            onClick={() => openEditPopup(classroom)}
                                            className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/60 cursor-pointer"
                                        >
                                            Editar
                                        </div>
                                        <div
                                            onClick={() => openDeletePopup(classroom)}
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

            {/* Modal Agregar Aula */}
            {showAddPopup && (
                <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 transition-opacity duration-150" onClick={closeModals}>
                    <div onClick={(e) => e.stopPropagation()} className="p-6 rounded-lg max-w-sm w-full bg-white dark:bg-dark overflow-hidden">
                        <label>Nombre del Aula</label>
                        <input type="text" placeholder="Nombre del aula" id="name" className="w-full mt-1 mb-5 border rounded" />

                        <label>Capacidad</label>
                        <input type="number" placeholder="Capacidad" id="capacity" className="w-full mt-1 mb-5 border rounded" />

                        <label>Descripción</label>
                        <textarea placeholder="Descripción del aula" id="description" className="w-full mt-1 mb-5 border rounded" />

                        <div className="flex justify-between">
                            <button onClick={(e) => createClassroom(
                                (document.getElementById("name") as HTMLInputElement).value,
                                parseInt((document.getElementById("capacity") as HTMLInputElement).value),
                                (document.getElementById("description") as HTMLTextAreaElement).value,
                                e
                            )} className="px-8 py-4 bg-primary text-white rounded-md">
                                Guardar
                            </button>
                            <button onClick={closeModals} className="px-8 py-4 border-2 border-primary text-primary rounded-md">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Editar Aula */}
            {showEditPopup && currentClassroom && (
                <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 transition-opacity duration-150" onClick={closeModals}>
                    <div onClick={(e) => e.stopPropagation()} className="p-6 rounded-lg max-w-sm w-full bg-white dark:bg-dark overflow-hidden">
                        <label>Nombre del Aula</label>
                        <input type="text" defaultValue={currentClassroom.name} id="name" className="w-full mt-1 mb-5 border rounded" />

                        <label>Capacidad</label>
                        <input type="number" defaultValue={currentClassroom.capacity} id="capacity" className="w-full mt-1 mb-5 border rounded" />

                        <label>Descripción</label>
                        <textarea defaultValue={currentClassroom.description} id="description" className="w-full mt-1 mb-5 border rounded" />

                        <div className="flex justify-between">
                            <button onClick={(e) => updateClassroom(
                                currentClassroom._id,
                                (document.getElementById("name") as HTMLInputElement).value,
                                parseInt((document.getElementById("capacity") as HTMLInputElement).value),
                                (document.getElementById("description") as HTMLTextAreaElement).value,
                                e
                            )} className="px-8 py-4 bg-primary text-white rounded-md">
                                Guardar
                            </button>
                            <button onClick={closeModals} className="px-8 py-4 border-2 border-primary text-primary rounded-md">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Eliminar Aula */}
            {showDeletePopup && currentClassroom && (
                <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 transition-opacity duration-150" onClick={closeModals}>
                    <div onClick={(e) => e.stopPropagation()} className="p-6 rounded-lg max-w-sm w-full bg-white dark:bg-dark overflow-hidden">
                        <h4>¿Estás seguro de que deseas eliminar el aula "{currentClassroom.name}"?</h4>
                        <div className="flex justify-between mt-4">
                            <button onClick={(e) => deleteClassroom(currentClassroom._id, e)} className="px-8 py-4 bg-red-600 text-white rounded-md">
                                Eliminar
                            </button>
                            <button onClick={closeModals} className="px-8 py-4 border-2 border-primary text-primary rounded-md">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Classrooms;
