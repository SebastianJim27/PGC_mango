const LABELS = {
  "Mango__Gall_Midge": "Gall Midge",
  "Mango__Healthy": "Healthy",
  "Mango__Powdery_Mildew": "Powdery Mildew",
  "Mango__Sooty_Mould": "Sooty Mould"
}

export default function ProbChart({ probabilidades }) {
  const max = Math.max(...Object.values(probabilidades))
  return (
    <div className="card">
      <p className="card-label">Distribucion de probabilidades</p>
      {Object.entries(probabilidades).map(([clase, prob]) => (
        <div key={clase} className="bar-row">
          <span className="bar-label">{LABELS[clase]}</span>
          <div className="bar-track">
            <div className={`bar-fill ${prob === max ? "main" : "sec"}`} style={{ width: `${prob}%` }} />
          </div>
          <span className="bar-val">{prob}%</span>
        </div>
      ))}
    </div>
  )
}