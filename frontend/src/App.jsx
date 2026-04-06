import { useState } from "react"
import UploadZone from "./components/UploadZone"
import ResultCard from "./components/ResultCard"
import ProbChart from "./components/ProbChart"
import DiseaseInfo from "./components/DiseaseInfo"
import logo from "./assets/LogoMangoCuadrado.png" 
import "./index.css"

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
      const res = await fetch("/api/predecir", { method: "POST", body: form })
      const data = await res.json()
      setResultado(data)
    } catch (e) {
      alert("Error conectando con el servidor")
    }
    setCargando(false)
  }

  return (
    <div>
      <nav>
        <img 
          src={logo} 
          alt="MangoScan logo" 
          style={{ height: "40px", width: "auto", borderRadius: "6px" }} 
        />
        <div>
          <p className="nav-title">Mango</p>
          <p className="nav-sub">Deteccion de enfermedades · UdeC Facatativa</p>
        </div>
      </nav>
      <div className="main">
        <UploadZone onAnalizar={analizar} cargando={cargando} preview={preview} />
        {resultado && (
          <>
            <ResultCard resultado={resultado} />
            <div className="full"><ProbChart probabilidades={resultado.probabilidades} /></div>
            <div className="full"><DiseaseInfo info={resultado.info} /></div>
          </>
        )}
      </div>
    </div>
  )
}