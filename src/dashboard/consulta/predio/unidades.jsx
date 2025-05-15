import React from "react";

export const Unidades = ({ data }) => {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2 text-center">Unidades de Construcción</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-300 text-xs text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Identificador</th>
              <th className="border px-2 py-1">Total Plantas</th>
              <th className="border px-2 py-1">Uso</th>
              <th className="border px-2 py-1">Año Construcción</th>
              <th className="border px-2 py-1">Área Construida</th>
              <th className="border px-2 py-1">Avalúo Unidad</th>
              <th className="border px-2 py-1">Puntaje</th>
            </tr>
          </thead>
          <tbody>
            {!hasData ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center text-gray-500 italic py-4"
                >
                  No hay unidades disponibles.
                </td>
              </tr>
            ) : (
              data.map((unidad, index) => {
                const item = unidad.properties?.caracteristicas_unidadconstruccion || {};
                const isLast = index === data.length - 1;
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td
                      className={`border px-2 py-1 ${
                        isLast ? "rounded-bl-md" : ""
                      }`}
                    >
                      {item.identificador}
                    </td>
                    <td className="border px-2 py-1">{item.total_plantas}</td>
                    <td className="border px-2 py-1">{item.uso}</td>
                    <td className="border px-2 py-1">
                      {item.anio_construccion}
                    </td>
                    <td className="border px-2 py-1">
                      {parseFloat(item.area_construida).toLocaleString("es-CO")}{" "}
                      m²
                    </td>
                    <td className="border px-2 py-1">
                      {item.avaluo_unidad.toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                        maximumFractionDigits: 0,
                      })}
                    </td>
                    <td
                      className={`border px-2 py-1 ${
                        isLast ? "rounded-br-md" : ""
                      }`}
                    >
                      {item.puntaje}
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
