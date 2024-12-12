"use client";

import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const UserProfile = () => {
  const { data: session, status } = useSession();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null); // Mensaje de éxito o error
  const email = session?.user?.email || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de la longitud de la contraseña
    if (password.length < 6) {
      setMessage("Error al editar contraseña. La cantidad mínima es de 6 caracteres.");
      return;
    }

    try {
      const response = await axios.put(`/api/auth/edituser/${session?.user?.id}`, {
        password,
      });

      console.log("Datos actualizados:", response.data);
      setMessage("Contraseña actualizada con éxito.");
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      setMessage("Error al actualizar la contraseña. Inténtalo nuevamente.");
    }
  };

  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  if (status === "unauthenticated") {
    return <p>No estás autenticado.</p>;
  }

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

          {/* Mostrar el mensaje de éxito o error */}
          {message && (
            <div
              className={`p-2 mb-4 rounded text-white ${
                message.includes("éxito") ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {message}
            </div>
          )}

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
