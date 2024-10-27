"use client";

import { useState } from "react";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const UserProfile = () => {
  const { data: session, status } = useSession();
  const [password, setPassword] = useState("");
  const email = session?.user?.email || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/auth/edituser/${session?.user?.id}`, {
        password,
      });

      console.log("Datos actualizados:", response.data);
      alert("Contraseña actualizada con éxito");
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      alert("Error al actualizar la contraseña");
    }
  };

  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  if (status === "unauthenticated") {
    return <p>No estás autenticado.</p>;
  }

  const isAdmin = session?.user?.role === "admin";
  const isDocente = session?.user?.role === "profesor";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-800 p-5">

      <div className="w-full text-left mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Bienvenido {isAdmin ? "Administrador" : "Docente"}: {session?.user?.fullname}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {isAdmin
            ? "Administra el sistema accediendo a las opciones de gestión."
            : "Cambia tu contraseña."}
        </p>
      </div>


      <div className="flex justify-center space-x-4 mb-5 mt-5">
        {isAdmin && (
          <>
            <Link href="/dashboard/profile">
              <button className="bg-blue-600 text-white py-2 px-4 rounded">Perfil</button>
            </Link>
            <Link href="/dashboard/teachers">
              <button className="bg-blue-600 text-white py-2 px-4 rounded">Docentes</button>
            </Link>
            <Link href="/dashboard/courses">
              <button className="bg-blue-600 text-white py-2 px-4 rounded">Cursos</button>
            </Link>
            <Link href="/dashboard/schedule">
              <button className="bg-blue-600 text-white py-2 px-4 rounded">Ver Horarios</button>
            </Link>
          </>
        )}
        {isDocente && (
          <>
            <Link href="/dashboard/profile">
              <button className="bg-blue-600 text-white py-2 px-4 rounded">Perfil</button>
            </Link>
            <Link href="/dashboard/schedule">
              <button className="bg-blue-600 text-white py-2 px-4 rounded">Registrar Horario</button>
            </Link>
          </>
        )}
        <button
          onClick={() => signOut()}
          className="bg-gray-800 text-white py-2 px-4 rounded"
        >
          Cerrar Sesión
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <h2 className="text-2xl text-center font-bold mb-6 text-gray-800 dark:text-white">Actualizar datos</h2>
        

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Email:
          </label>
          <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-200 dark:bg-gray-600">
            {email}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Nueva Contraseña:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Introduce una nueva contraseña"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Actualizar Contraseña
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
