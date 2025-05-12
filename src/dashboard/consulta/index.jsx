import React from "react";
import PredioMap from "./map/PredioMap";
import { useState } from "react";
import { buscarPredio } from "../../auth/authService";

export default function Consulta() {
  const [npn, setNpn] = useState("");
  const [detalle, setDetalle] = useState(null);

  const handleBuscar = async () => {
    try {
      const data = await buscarPredio(npn);
      setDetalle(data);
    } catch (err) {
      console.error(err); // así lo usás y no da warning
    }
  };

  return (
    <div className="relative w-full h-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Módulo de Consulta
      </h1>
      <hr className="border-blue-500 w-32 mb-6" />

      {/* Contenedor del mapa */}
      <div className="relative w-full h-[500px] bg-gray-200 rounded-md">
        {/* Aquí iría tu mapa */}
        <div className="flex-1 relative">
          <PredioMap detailPredio={detalle} />
        </div>
        {/* <iframe
          title="Mapa"
          className="w-full h-full"
          src="https://maps.google.com/maps?q=bogota&t=&z=13&ie=UTF8&iwloc=&output=embed"
        ></iframe> */}

        {/* Caja flotante */}
        <div className="absolute top-6 right-6 w-64 bg-white p-4 rounded-xl shadow-lg z-50">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Buscar Predio
          </label>
          <input
            value={npn}
            onChange={(e) => setNpn(e.target.value)}
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
          <button
            onClick={handleBuscar}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Buscar
          </button>
          {detalle && (
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                <strong>Dirección:</strong> {detalle.direccion}
              </p>
              <p>
                <strong>Tipo:</strong> {detalle.tipo_predio}
              </p>
              <p>
                <strong>Condición:</strong> {detalle.condicion_predio}
              </p>
              <p>
                <strong>Área:</strong> {detalle.area_catastral_terreno} m²
              </p>
              <p>
                <strong>Destino:</strong> {detalle.destinacion_economica}
              </p>
              <p>
                <strong>Estado:</strong> {detalle.estado}
              </p>
              <p>
                <strong>Nombre:</strong> {detalle.interesado?.[0]?.nombre}
              </p>
              <p>
                <strong>Documento:</strong>{" "}
                {detalle.interesado?.[0]?.numero_documento}
              </p>
              <p>
                <strong>Último Avalúo:</strong> $
                {detalle.avaluo?.[0]?.avaluo_catastral}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
