import { useState } from "react"
import UploadZone from "./components/UploadZone"
import ResultCard from "./components/ResultCard"
import ProbChart from "./components/ProbChart"
import DiseaseInfo from "./components/DiseaseInfo"

export default function App() {
  const [resultado, setResultado] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [preview, setPreview] = useState(null)

  const analizar = async (archivo) => {
    setCargando(true)
    setPreview(URL.createObjectURL(archivo))
    const form = new FormData()
    form.append("file", archivo)
    try {
      const res = await fetch("/api/predecir", {
        method: "POST",
        body: form
      })
      const data = await res.json()
      setResultado(data)
    } catch (e) {
      alert("Error conectando con el servidor")
    }
    setCargando(false)
  }

  return (
    <div className="min-h-screen bg-green-50">
      <nav className="bg-green-900 px-6 py-3 flex items-center gap-3">
        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">M</div>
        <div>
          <p className="text-white font-medium text-sm">MangoScan</p>
          <p className="text-green-300 text-xs">Detección de enfermedades · UdeC Facatativá</p>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <UploadZone onAnalizar={analizar} cargando={cargando} preview={preview} />
        {resultado && (
          <>
            <ResultCard resultado={resultado} />
            <div className="md:col-span-2">
              <ProbChart probabilidades={resultado.probabilidades} />
            </div>
            <div className="md:col-span-2">
              <DiseaseInfo info={resultado.info} clase={resultado.clase} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}