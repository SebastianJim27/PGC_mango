export default function DiseaseInfo({ info }) {
  return (
    <div className="bg-white rounded-xl border border-green-200 p-5">
      <p className="text-xs font-medium text-green-800 uppercase tracking-wide mb-4">Información de la enfermedad</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {[
          ["Agente causal", info.agente],
          ["Severidad", info.severidad],
          ["Temporada", info.temporada],
          ["Transmisión", info.transmision],
        ].map(([label, val]) => (
          <div key={label} className="bg-green-50 rounded-lg p-3">
            <p className="text-xs text-green-400 uppercase tracking-wide">{label}</p>
            <p className="text-sm text-green-900 font-medium mt-1">{val}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <p className="text-sm font-medium text-green-800 mb-2">Síntomas</p>
          <ul className="space-y-2">
            {info.sintomas.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium text-green-800 mb-2">Tratamiento recomendado</p>
          <ul className="space-y-2">
            {info.tratamiento.map((t, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}