import { useRef } from "react"

export default function UploadZone({ onAnalizar, cargando, preview }) {
  const inputRef = useRef()

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) onAnalizar(file)
  }

  return (
    <div className="bg-white rounded-xl border border-green-200 p-5">
      <p className="text-xs font-medium text-green-800 uppercase tracking-wide mb-3">Cargar imagen</p>
      <div
        className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center bg-green-50 cursor-pointer hover:bg-green-100 transition"
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]) }}
      >
        {preview ? (
          <img src={preview} alt="preview" className="max-h-48 mx-auto rounded-lg object-contain" />
        ) : (
          <>
            <div className="text-4xl mb-2">🌿</div>
            <p className="text-green-700 font-medium text-sm">Arrastra una imagen aquí</p>
            <p className="text-green-400 text-xs mt-1">o haz clic para seleccionar</p>
            <p className="text-green-400 text-xs mt-1">JPG, PNG · máx 10MB</p>
          </>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => handleFile(e.target.files[0])} />
      <button
        onClick={() => inputRef.current.click()}
        disabled={cargando}
        className="mt-3 w-full bg-green-800 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition"
      >
        {cargando ? "Analizando..." : "Analizar hoja"}
      </button>
    </div>
  )
}