import React from "react";

export const Avaluos = ({ data }) => {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2 text-center">Avalúos</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-300 text-xs text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Avalúo Catastral</th>
              <th className="border px-2 py-1">Vigencia</th>
            </tr>
          </thead>
          <tbody>
            {!hasData ? (
              <tr>
                <td
                  colSpan={3}
                  className="text-center text-gray-500 italic py-4"
                >
                  No hay avalúos disponibles.
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-2 py-1">
                    {item.avaluo_catastral.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                      maximumFractionDigits: 0,
                    })}
                  </td>
                  <td className="border px-2 py-1">{item.vigencia}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};