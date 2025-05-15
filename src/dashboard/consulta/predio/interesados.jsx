import React from "react";

export const Interesados = ({ data }) => {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2 text-center">Interesados</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-300 text-xs text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Nombre</th>
              <th className="border px-2 py-1">Tipo Documento</th>
              <th className="border px-2 py-1">Número Documento</th>
              <th className="border px-2 py-1">Tipo Interesado</th>
              <th className="border px-2 py-1">Sexo</th>
            </tr>
          </thead>
          <tbody>
            {!hasData ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-gray-500 italic py-4"
                >
                  No hay interesados disponibles.
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
                      {item.nombre}
                    </td>
                    <td className="border px-2 py-1">{item.tipo_documento}</td>
                    <td className="border px-2 py-1">
                      {item.numero_documento}
                    </td>
                    <td className="border px-2 py-1">{item.tipo_interesado}</td>
                    <td
                      className={`border px-2 py-1 ${
                        isLast ? "rounded-br-md" : ""
                      }`}
                    >
                      {item.sexo}
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