// "use client";

// import { useSession } from "next-auth/react";

// function ProfileIDPage() {
//   const { data: session, status } = useSession();

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-5">
//       {/* Título y descripción alineados a la izquierda */}
//       <div className="w-full text-left mb-4">
//         <h1 className="text-2xl font-bold">Perfil del Usuario</h1>
//         <p className="text-gray-600">Aquí puedes ver el ID de tu perfil.</p>
//       </div>

//       {/* Mostrar el _id del usuario */}
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center mb-4">
//         <p className="font-medium text-lg">ID de Usuario: {session?.user?._id || "ID no disponible"}</p>
//       </div>
//     </div>
//   );
// }

// export default ProfileIDPage;

"use client";

import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const EditUser = () => {
  const { data: session } = useSession(); // Obtener los datos de la sesión actual
  const [fullname, setFullname] = useState(session?.user?.fullname || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(session?.user?.role || "profesor"); // Establecer el rol inicial

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Enviar la solicitud PUT al backend
      const response = await axios.put("/api/auth/edituser/[id]", {
        fullname,
        email,
        password, // Se envía solo si se cambia
        role,
      });

      console.log("Datos actualizados:", response.data);
      alert("Perfil actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      alert("Error al actualizar los datos");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-6">Editar Perfil</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre Completo:
          </label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder={session?.user?.fullname}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={session?.user?.email}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nueva Contraseña:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={session?.user?.password}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Nuevo campo select para el rol */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Rol:
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="profesor">Profesor</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Actualizar Perfil
        </button>
      </form>
    </div>
  );
};

export default EditUser;
