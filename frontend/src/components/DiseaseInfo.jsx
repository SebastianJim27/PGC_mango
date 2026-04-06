export default function DiseaseInfo({ info }) {
  return (
    <div className="card">
      <p className="card-label">Informacion de la enfermedad</p>
      <div className="chips">
        {[["Agente causal", info.agente], ["Severidad", info.severidad],
          ["Temporada", info.temporada], ["Transmision", info.transmision]
        ].map(([label, val]) => (
          <div key={label} className="chip">
            <p className="chip-label">{label}</p>
            <p className="chip-val">{val}</p>
          </div>
        ))}
      </div>
      <div className="info-grid">
        <div>
          <p className="info-title">Sintomas</p>
          <ul className="info-list">
            {info.sintomas.map((s, i) => (
              <li key={i}><span className="info-dot" />{s}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="info-title">Tratamiento recomendado</p>
          <ul className="info-list">
            {info.tratamiento.map((t, i) => (
              <li key={i}><span className="info-dot" />{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}