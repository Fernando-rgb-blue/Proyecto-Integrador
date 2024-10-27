"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

function ProfilePage() {
  const { data: session, status } = useSession();

  // Verificar el estado de la sesión
  if (status === "loading") {
    return <p>Cargando...</p>; // Puedes reemplazar esto por un spinner o un mensaje personalizado
  }

  if (status === "unauthenticated") {
    return <p>No estás autenticado.</p>;
  }

  // Verificar el rol del usuario
  const isAdmin = session?.user?.role === "admin";
  const isDocente = session?.user?.role === "profesor";

  console.log("Rol del usuario:", session?.user?.role); // Para verificar en la consola

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-5">
      {/* Título y descripción alineados a la izquierda */}
      <div className="w-full text-left mb-0">
        <h1 className="text-2xl font-bold">
          Bienvenido {isAdmin ? "Administrador" : "Docente"}: {session?.user?.fullname}
        </h1>
        <p className="text-gray-600">
          {isAdmin
            ? "Administra el sistema accediendo a las opciones de gestión."
            : "Cambia tu contraseña o registra tu horario con el tiempo que tengas libre."}
        </p>
      </div>

      {/* Margen de 7 cm entre el texto y los botones */}
      <div style={{ marginBottom: "2cm" }} />

      {/* Botones para administradores */}
      {isAdmin && (
        <div className="flex justify-center space-x-4 mb-5 mt-5">
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

          <button
            onClick={() => signOut()}
            className="bg-gray-800 text-white py-2 px-4 rounded"
          >
            Cerrar Sesión
          </button>
        </div>
      )}

      {/* Botones para docentes */}
      {isDocente && (
        <div className="flex justify-center space-x-4 mb-5 mt-5">
          <Link href="/dashboard/profile">
            <button className="bg-blue-600 text-white py-2 px-4 rounded">Perfil</button>
          </Link>

          <Link href="/dashboard/schedule">
            <button className="bg-blue-600 text-white py-2 px-4 rounded">Registrar Horario</button>
          </Link>

          <button
            onClick={() => signOut()}
            className="bg-gray-800 text-white py-2 px-4 rounded"
          >
            Cerrar Sesión
          </button>
        </div>
      )}

      {/* Mostrar el nombre y correo */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center mb-4">
        <p className="font-medium text-lg">
          Nombre: {session?.user?.fullname || "Nombre de usuario"}
        </p>
        <p className="text-gray-600">
          Correo: {session?.user?.email || "Correo de usuario"}
        </p>
      </div>

      {/* Mostrar el cuadro para cambiar la contraseña solo si NO es administrador */}
      {!isAdmin && (
        <>
          {/* Mensaje para cambiar la contraseña */}
          <div className="w-full text-center mb-4">
            <p className="text-gray-600">¿Deseas cambiar tu contraseña?</p>
          </div>

          {/* Cuadro para cambiar la contraseña */}
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                Nueva Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <button className="bg-blue-600 text-white py-2 px-4 rounded w-full">
              Guardar
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
