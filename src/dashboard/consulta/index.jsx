import React from "react";

export default function Consulta() {
  return (
    <div className="relative w-full h-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Módulo de Consulta
      </h1>
      <hr className="border-blue-500 w-32 mb-6" />

      {/* Contenedor del mapa */}
      <div className="relative w-full h-[500px] bg-gray-200 rounded-md overflow-hidden">
        {/* Aquí iría tu mapa */}
        <iframe
          title="Mapa"
          className="w-full h-full"
          src="https://maps.google.com/maps?q=bogota&t=&z=13&ie=UTF8&iwloc=&output=embed"
        ></iframe>

        {/* Caja flotante */}
        <div className="absolute top-6 right-6 w-64 bg-white p-4 rounded-xl shadow-lg z-10">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Buscar Predio
          </label>
          <input
            type="text"
            placeholder="Buscar Predio"
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="mb-3">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="tipo"
                className="form-radio text-blue-500"
                checked
                readOnly
              />
              <span className="ml-2 text-sm">NPN</span>
            </label>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}