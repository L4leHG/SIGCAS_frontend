import React, { useState, useRef } from 'react';
import { FaEye, FaFileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const Tramites = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef();

  const handleSearch = async () => {
    const sade = selectedValue || searchTerm;
    if (!sade) return;

    try {
      const response = await api.post('/reportes/listar_radicados/', { sade });
      setResults(response.data || []);
    } catch (error) {
      console.error('Error al buscar trámites:', error);
    }
  };

  const handleSelect = (item) => {
    const isEditable = item.estado_tramite === 1;
    navigate(`/tramites/detalle/${item.sade}?edit=${isEditable}`, {
      state: { tramite: item },
    });
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">Trámites de Mutaciones</h1>
      <hr className="border-blue-500 w-32 mb-6" />
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center gap-2 relative">
          <input
            type="text"
            placeholder="Buscar radicado..."
            ref={inputRef}
            value={selectedValue || searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedValue(null);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Buscar
          </button>
          {suggestions.length > 0 && !selectedValue && (
            <ul className="absolute top-12 z-10 bg-white border w-full md:w-80 max-h-40 overflow-y-auto rounded shadow-sm">
              {suggestions.map((item, i) => (
                <li
                  key={i}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedValue(item.label || item);
                    setSuggestions([]);
                  }}
                >
                  {item.label || item}
                </li>
              ))}
            </ul>
          )}
        </div>
        {results.length > 0 && (
          <div className="mt-6 overflow-x-auto border rounded-lg shadow-sm">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">Radicado</th>
                  <th className="px-4 py-2 border">NPN</th>
                  <th className="px-4 py-2 border">Tipo Trámite</th>
                  <th className="px-4 py-2 border">Mixta</th>
                  <th className="px-4 py-2 border">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{item.sade}</td>
                    <td className="px-4 py-2 border">{item.npn}</td>
                    <td className="px-4 py-2 border">{item.tipo_tramite_radicado}</td>
                    <td className="px-4 py-2 border">{item.mixta || 'N/A'}</td>
                    <td className="px-4 py-2 border text-center">
                      <button
                        onClick={() => handleSelect(item)}
                        className="text-blue-600 hover:text-blue-800"
                        title={item.estado_tramite === 1 ? 'Editar' : 'Ver'}
                      >
                        {item.estado_tramite === 1 ? (
                          <FaFileAlt className="inline text-xl" />
                        ) : (
                          <FaEye className="inline text-xl" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tramites;