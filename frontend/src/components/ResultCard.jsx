export default function ResultCard({ resultado }) {
  const { confianza } = resultado
  const { nombre } = resultado.info
  const sano = resultado.clase === "Mango__Healthy"

  return (
    <div className="card">
      <p className="card-label">Diagnostico</p>
      <div className={`badge ${sano ? "sano" : "enfermo"}`}>
        <span className="badge-dot" />
        {nombre}
      </div>
      <p className="confianza">{confianza}%</p>
      <p className="confianza-sub">nivel de confianza</p>
    </div>
  )
}