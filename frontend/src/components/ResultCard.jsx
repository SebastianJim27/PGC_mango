export default function ResultCard({ resultado }) {
  const { clase, confianza } = resultado
  const nombre = resultado.info.nombre
  const esano = clase === "Mango__Healthy"

  return (
    <div className="bg-white rounded-xl border border-green-200 p-5">
      <p className="text-xs font-medium text-green-800 uppercase tracking-wide mb-3">Diagnóstico</p>
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-3 ${esano ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
        <div className={`w-2 h-2 rounded-full ${esano ? "bg-green-500" : "bg-amber-500"}`} />
        {nombre}
      </div>
      <p className="text-4xl font-medium text-green-900">{confianza}%</p>
      <p className="text-xs text-green-500 mt-1">nivel de confianza</p>
    </div>
  )
}