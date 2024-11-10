"use client";

import { useState } from "react";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

// cambio luis debajo
import { usePathname, redirect } from "next/navigation";

const UserProfile = () => {
  const { data: session, status } = useSession();
  const [password, setPassword] = useState("");
  const email = session?.user?.email || "";

  // Si el usuario no está autenticado, redirigirlo
  if (status === "unauthenticated") {
    redirect("/login"); // Redirige a la página de login si no está autenticado
    return null; // Evita que el componente se renderice
  }

  // Cargando estado
  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  const isAdmin = session?.user?.role === "admin";
  const isDocente = session?.user?.role === "profesor";

  // el de abajo cambio luis
  const path = usePathname();

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

  return (
    <div>
      <div className="flex items-center justify-center my-8 mx-5 bg-white dark:bg-black sm:my-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
        >
          <h2 className="text-2xl text-center font-bold mb-6 text-gray-800 dark:text-white">
            Actualizar Contraseña
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Email:
            </label>
            <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight bg-gray-200 dark:bg-gray-600">
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
