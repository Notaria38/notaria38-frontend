import React, { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false); // Estado para el loading
  const [error, setError] = useState(null); // Estado para manejar errores

  const iniciarSesion = async () => {
    setLoading(true); // Empieza el loading cuando se hace clic
    setError(null); // Limpiar errores previos

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Click en Iniciar sesión" }),
      });

      if (!response.ok) {
        throw new Error("No se pudo completar la solicitud");
      }

      const data = await response.json();
      console.log("Respuesta del servidor:", data);
    } catch (error) {
      setError(error.message); // Manejo de errores
      console.error("Error:", error);
    } finally {
      setLoading(false); // Termina el loading
    }
  };

  return (
    <div className="bg-gray-100 text-gray-900">
      {/* Navbar */}
      <header className="bg-orange-600 text-white py-4 px-6 md:px-16 flex justify-between items-center">
        <div className="flex flex-col items-start">
          <span className="text-xs uppercase tracking-wider mb-0 opacity-80">
            NOTARÍAS ASOCIADAS
          </span>
          <h1 className="text-2xl font-normal">38<span className="font-light text-lg"> y </span>76</h1>
        </div>

        <nav className="hidden md:block">
          <ul className="flex space-x-10">
            <li><a href="#" className="hover:underline font-light text-lg">Inicio</a></li>
            <li><a href="#" className="hover:underline font-light text-lg">Servicios</a></li>
            <li><a href="#" className="hover:underline font-light text-lg">Contactame</a></li>
          </ul>
        </nav>

        <button
          onClick={iniciarSesion}
          className="bg-transparent border border-white text-white px-6 py-2 rounded-full text-sm font-light hover:bg-white hover:text-orange-600 transition duration-300"
          disabled={loading} // Deshabilitar el botón mientras se está cargaOOO
        >
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>
      </header>

      {/* Hero Section */}
      <main className="relative w-full h-screen flex items-center justify-center text-white bg-black">
        <h2 className="text-6xl font-light leading-tight">
          La mejor experiencia notarial en todo Querétaro
        </h2>
      </main>

      {/* Error message */}
      {error && (
        <div className="bg-red-500 text-white text-center py-2 mt-4">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default App;