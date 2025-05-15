import PredioMap from "./map/PredioMap";
import { useState } from "react";
import { PreviewPredio, buscarPredio } from "../../auth/authService";
import { FaEye, FaWindowMinimize, FaWindowMaximize } from "react-icons/fa";
import PredioDetalle from "./predios";

export default function Consulta() {
  const [npn, setNpn] = useState("");
  const [data, setData] = useState(null);
  const [detalle, setDetalle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBoxMinimized, setIsBoxMinimized] = useState(false);

  const handleOpenModal = async (npn) => {
    await handleDetalle(npn); // <-- traer y setear los datos
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setData(null); // limpia el mapa
  };

  const handleBuscar = async () => {
    try {
      const data = await PreviewPredio(npn);
      setDetalle(data);
      setIsBoxMinimized(false);
    } catch (err) {
      console.error(err); // así lo usás y no da warning
    }
  };

  const handleDetalle = async (npn) => {
    try {
      const data = await buscarPredio(npn);
      setData(data);
    } catch (err) {
      console.error(err); // así lo usás y no da warning
    }
  };

  const toggleBoxMinimize = () => {
    if (!detalle) return; // ⚠️ Solo si hay datos
    setIsBoxMinimized(!isBoxMinimized);
  };

  return (
    <div className="relative w-full h-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Módulo de Consulta
      </h1>
      <hr className="border-blue-500 w-32 mb-6" />
      <div className="relative w-full h-[500px] bg-gray-200 rounded-md">
        <div className="flex-1 relative">
          <PredioMap detailPredio={data} />
        </div>
        {/* Caja flotante */}
        <div
          className={`
            absolute top-6 right-0 bg-white p-4 rounded-l-xl shadow-lg z-50
            transition-all duration-500 ease-in-out overflow-hidden
            ${isBoxMinimized ? "w-16" : detalle ? "w-[700px]" : "w-64"}
          `}
        >
          {/* Header con botón minimizar */}
          <div className="flex justify-between items-center mb-2">
            {!isBoxMinimized && (
              <label className="text-sm font-semibold text-gray-700">
                Buscar Predio
              </label>
            )}
            <button onClick={toggleBoxMinimize}>
              {isBoxMinimized ? (
                <FaWindowMaximize className="text-gray-500" />
              ) : (
                <FaWindowMinimize className="text-gray-500" />
              )}
            </button>
          </div>
          {/* Contenido que se oculta al minimizar */}
          {!isBoxMinimized && (
            <>
              <input
                value={npn}
                onChange={(e) => setNpn(e.target.value)}
                placeholder="Buscar Predio"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="mb-3 text-sm">
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
                <div className="overflow-x-auto mt-4">
                  <table className="w-full border border-gray-300 text-xs text-center">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-2 py-1 border">NPN</th>
                        <th className="px-2 py-1 border">Dirección</th>
                        <th className="px-2 py-1 border">Área Total</th>
                        <th className="px-2 py-1 border">Matrícula</th>
                        <th className="px-2 py-1 border">Estado</th>
                        <th className="px-2 py-1 border text-center">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="px-2 py-1 border">{detalle.npn}</td>
                        <td className="px-2 py-1 border">
                          {detalle.direccion}
                        </td>
                        <td className="px-2 py-1 border">
                          {detalle["area total"]} m²
                        </td>
                        <td className="px-2 py-1 border">
                          {detalle.orip_matricula}
                        </td>
                        <td className="px-2 py-1 border">{detalle.estado}</td>
                        <td className="px-2 py-1 border text-center">
                          <button
                            onClick={() => handleOpenModal(detalle.npn)}
                            className="px-1 py-1"
                          >
                            <FaEye className="text-lg" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
          <PredioDetalle
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            data={data}
          />
        </div>
      </div>
    </div>
  );
}