const LABELS = {
  "Mango__Gall_Midge": "Gall Midge",
  "Mango__Healthy": "Healthy",
  "Mango__Powdery_Mildew": "Powdery Mildew",
  "Mango__Sooty_Mould": "Sooty Mould"
}

export default function ProbChart({ probabilidades }) {
  const max = Math.max(...Object.values(probabilidades))
  return (
    <div className="bg-white rounded-xl border border-green-200 p-5">
      <p className="text-xs font-medium text-green-800 uppercase tracking-wide mb-4">Distribución de probabilidades</p>
      <div className="space-y-3">
        {Object.entries(probabilidades).map(([clase, prob]) => (
          <div key={clase} className="flex items-center gap-3">
            <p className="text-xs text-gray-500 w-32 shrink-0">{LABELS[clase]}</p>
            <div className="flex-1 bg-green-50 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${prob}%`, background: prob === max ? "#2e7d32" : "#a5d6a7" }}
              />
            </div>
            <p className="text-xs text-green-700 w-10 text-right font-medium">{prob}%</p>
          </div>
        ))}
      </div>
    </div>
  )
}