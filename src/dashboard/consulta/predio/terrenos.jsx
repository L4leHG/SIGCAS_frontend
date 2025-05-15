import React from "react";

export const Terrenos = ({data}) => {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2 text-center">Terrenos</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-300 text-xs text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1 rounded-tl-md">Área Catastral</th>
              <th className="border px-2 py-1">Avalúo Terreno</th>
              <th className="border px-2 py-1">Zona Física</th>
              <th className="border px-2 py-1 rounded-tr-md">
                Zona Geoeconómica
              </th>
            </tr>
          </thead>
          <tbody>
            {!hasData ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center text-gray-500 italic py-4"
                >
                  No hay terrenos disponibles.
                </td>
              </tr>
            ) : (
              data.map((item, index) => {
                const isLast = index === data.length - 1;
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td
                      className={`border px-2 py-1 ${
                        isLast ? "rounded-bl-md" : ""
                      }`}
                    >
                      {parseFloat(item.area_catastral_terreno).toLocaleString(
                        "es-CO"
                      )}{" "}
                      m²
                    </td>
                    <td className="border px-2 py-1">
                      {item.avaluo_terreno.toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                        maximumFractionDigits: 0,
                      })}
                    </td>
                    <td className="border px-2 py-1">{item.zona_fisica}</td>
                    <td
                      className={`border px-2 py-1 ${
                        isLast ? "rounded-br-md" : ""
                      }`}
                    >
                      {item.zona_geoeconomica}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};