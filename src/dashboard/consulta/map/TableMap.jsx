import React from 'react';

const TableMap = ({ detailPredio }) => {
  return (
    <>
      <div className="w-full border rounded-lg bg-white shadow-md m-1">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden border border-gray-300">
            <thead className="bg-gray-200 text-gray-700">
              <tr className="text-center">
                <th className="px-4 py-2 border border-gray-300 bg-gray-200 font-bold text-sm">
                  Area Cartografica
                </th>
                <th className="px-4 py-2 border border-gray-300 bg-gray-200 font-bold text-sm">
                  Area Digitada
                </th>
                <th className="px-4 py-2 border border-gray-300 bg-gray-200 font-bold text-sm">
                  EPSG
                </th>
                <th className="px-4 py-2 border border-gray-300 bg-gray-200 font-bold text-sm">
                  Sistema de proyeccion
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="text-center text-sm">
                <td className="px-4 py-2 border border-gray text-sm">
                  {detailPredio?.terreno_geo.properties?.area_cartografica}
                </td>
                <td className="px-4 py-2 border border-gray text-sm">
                  {detailPredio?.area_total_terreno}
                </td>
                <td className="px-4 py-2 border border-gray text-sm">9377</td>
                <td className="px-4 py-2 border border-gray text-sm">
                  Magna Sirgas - Origen Nacional
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full border rounded-lg bg-white shadow-md m-1">
        <div className="overflow-x-auto mt-2">
          <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden border border-gray-300">
            <thead className="bg-gray-200 text-gray-700">
              <tr className="text-center">
                <th className="px-2 py-1 border border-gray-300 bg-gray-200 font-bold text-sm">
                  Identificador
                </th>
                <th className="px-2 py-1 border border-gray-300 bg-gray-200 font-bold text-sm">
                  Id Caracteristica
                </th>
                <th className="px-2 py-1 border border-gray-300 bg-gray-200 font-bold text-sm">
                  Id Unidad
                </th>
                <th className="px-2 py-1 border border-gray-300 bg-gray-200 font-bold text-sm">
                  Planta ubicacion
                </th>
                <th className="px-2 py-1 border border-gray-300 bg-gray-200 font-bold text-sm">
                  Area construida
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {detailPredio?.unidades_geo?.features?.length > 0 ? (
              detailPredio?.unidades_geo?.features?.map((feature, index) => (
                  <tr key={index} className="text-center">
                    <td className="px-2 py-1 border border-gray text-sm">
                      {feature.properties.identificador}
                    </td>
                    <td className="px-2 py-1 border border-gray text-sm">
                      {feature.properties.unidad_construccion}
                    </td>
                    <td className="px-2 py-1 border border-gray text-sm">
                      {feature.properties.id_unidad_geom}
                    </td>
                    <td className="px-2 py-1 border border-gray text-sm">
                      {feature.properties.planta_ubicacion}
                    </td>
                    <td className="px-2 py-1 border border-gray text-sm">
                      {feature.properties.area_construida} m²
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-2 py-1 text-center"
                  >
                    No hay unidades de construccion
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TableMap;
