import React, { useState } from 'react';
import data from '../../public/YOKAI_respuestas.json';

export default function YokaiCards() {
  const [search, setSearch] = useState('');
  function normalize(str) {
    return (str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }
  const filtered = data.filter(item =>
    normalize(item["Nombre (incluye si tienes un alias)*"]).includes(normalize(search))
  );

  return (
    <>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="w-full max-w-md px-4 py-2 rounded-lg border border-blue-400 bg-gray-800 text-blue-100 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap justify-center gap-10 px-4 pb-16">
        {filtered.map(item => (
          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-700 rounded-3xl shadow-2xl p-7 w-full max-w-sm hover:scale-105 transition-transform duration-200 border-4 border-blue-500" key={item["Nombre (incluye si tienes un alias)*"]}>
            <div className="mb-4">
              <div className="text-2xl font-extrabold text-blue-200 drop-shadow-sm">{item["Nombre (incluye si tienes un alias)*"] || 'Sin nombre'}</div>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-block w-6 h-6 text-blue-400">🩺</span>
              <span className="font-semibold text-blue-200">Seguro social:</span>
              <span className="bg-blue-900 px-2 py-1 rounded text-blue-100 ml-2">{item["En caso de accidente ¿Tienes seguro social? "] ?? 'No especificado'}</span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-block w-6 h-6 text-indigo-400">🎂</span>
              <span className="font-semibold text-indigo-200">Nacimiento:</span>
              <span className="bg-indigo-900 px-2 py-1 rounded text-indigo-100 ml-2">{item["Fecha de Nacimiento"] ?? 'No especificado'}</span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-block w-6 h-6 text-red-400">🩸</span>
              <span className="font-semibold text-red-200">Tipo de sangre:</span>
              <span className="bg-red-900 px-2 py-1 rounded text-red-100 ml-2">{item["Tipo de sangre"] ?? 'No especificado'}</span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-block w-6 h-6 text-yellow-400">⚠️</span>
              <span className="font-semibold text-yellow-200">Alergias:</span>
              <span className="bg-yellow-900 px-2 py-1 rounded text-yellow-100 ml-2">{item["¿Tienes alguna alergia?"] ?? 'No especificado'}</span>
            </div>
            <div className="mt-4">
              <span className="font-semibold text-blue-200 text-lg">Contactos de emergencia:</span>
              <ul className="mt-2">
                {Array.isArray(item["Contactos de emergencia"]) ? (
                  item["Contactos de emergencia"].map((contact, idx) => (
                    <li className="flex items-center gap-2 text-sm text-gray-200 mb-2" key={idx}>
                      <span className="inline-block w-5 h-5 text-blue-400">📞</span>
                      <span className="font-bold text-blue-100">{contact.nombre ?? 'Sin nombre'}</span>
                      <span className="ml-2 bg-gray-900 px-2 py-1 rounded text-gray-100">{contact.telefono ?? 'Sin teléfono'}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-400">No especificado</li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
