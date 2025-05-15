import React, { useState } from "react";
import { FaWindowMinimize, FaWindowMaximize, FaTimes } from "react-icons/fa";
import Tablas from "./tablas";

export default function PredioDetalle({ isOpen, onClose, data }) {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      {/* Fondo oscuro solo cuando no está minimizado */}
      {!isMinimized && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40" />
      )}
      <div
        className={`fixed z-50 transition-all duration-300 shadow-xl bg-white rounded-md overflow-hidden ${
          isMinimized
            ? "bottom-4 right-4 w-80 h-12"
            : "inset-0 flex flex-col w-[800px] h-[400px] m-auto"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between bg-blue-600 text-white px-4 py-2 ${
            isMinimized ? "h-full" : "rounded-t-md"
          }`}
        >
          <h2 className="text-base font-semibold truncate">
            Detalle del Predio
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="hover:text-gray-200 transition-colors"
              title={isMinimized ? "Maximizar" : "Minimizar"}
            >
              {isMinimized ? <FaWindowMaximize /> : <FaWindowMinimize />}
            </button>
            <button
              onClick={onClose}
              className="hover:text-gray-200 transition-colors"
              title="Cerrar"
            >
              <FaTimes />
            </button>
          </div>
        </div>
        {!isMinimized && (
          <div className="p-4 text-sm overflow-y-auto">
            {data ? <Tablas data={data} /> : <p>Cargando información...</p>}
          </div>
        )}
      </div>
    </>
  );
}
