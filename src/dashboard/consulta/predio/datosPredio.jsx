import React from "react";

export const DatosPredio = ({ data }) => {
   if (!data) return null;

  const rows = [
    ["Número Predial Nacional", data.numero_predial_nacional],
    ["Código Homologado", data.codigo_homologado],
    ["Departamento", data.departamento],
    ["Municipio", data.municipio],
    ["Matrícula Inmobiliaria", data.orip_matricula],
    ["Condición del Predio", data.condicion_predio],
    ["Destinación Económica", data.destinacion_economica],
    [
      "Área Catastral Terreno",
      data.area_catastral_terreno
        ? `${data.area_catastral_terreno.toLocaleString("es-CO")} m²`
        : "—",
    ],
    ["Estado", data.estado],
    ["Dirección", data.direccion],
    ["Tipo de Predio", data.tipo_predio],
  ];

  // Agrupar en pares
  const pairedRows = [];
  for (let i = 0; i < rows.length; i += 2) {
    pairedRows.push([rows[i], rows[i + 1]]);
  }

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2 text-center">Datos Generales del Predio</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-300">
          <tbody>
            {pairedRows.map((pair, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <td className="border px-2 py-1 font-medium text-gray-700 w-1/6">
                  {pair[0][0]}
                </td>
                <td className="border px-2 py-1 w-1/3">{pair[0][1] || "—"}</td>
                {pair[1] ? (
                  <>
                    <td className="border px-2 py-1 font-medium text-gray-700 w-1/6">
                      {pair[1][0]}
                    </td>
                    <td className="border px-2 py-1 w-1/3">{pair[1][1] || "—"}</td>
                  </>
                ) : (
                  <td colSpan={2} className="border px-2 py-1 text-center italic text-gray-500">
                    Sin dato adicional
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
