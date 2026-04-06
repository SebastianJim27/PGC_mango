import { useRef } from "react"

export default function UploadZone({ onAnalizar, cargando, preview }) {
  const inputRef = useRef()
  const handleFile = (file) => { if (file?.type.startsWith("image/")) onAnalizar(file) }

  return (
    <div className="card">
      <p className="card-label">Cargar imagen</p>
      <div className="upload-zone"
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]) }}>
        {preview
          ? <img src={preview} alt="preview" />
          : <>
              <div className="upload-icon">🌿</div>
              <p className="upload-text">Arrastra una imagen aqui</p>
              <p className="upload-sub">o haz clic para seleccionar · JPG, PNG max 10MB</p>
            </>
        }
      </div>
      <input ref={inputRef} type="file" accept="image/*"
        onChange={(e) => handleFile(e.target.files[0])} />
      <button className="btn" onClick={() => inputRef.current.click()} disabled={cargando}>
        {cargando ? "Analizando..." : "Analizar hoja"}
      </button>
    </div>
  )
}