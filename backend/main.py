from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = FastAPI(title="MangoScan API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

modelo = tf.keras.models.load_model("modelo_mango_cnn.keras")

CLASES = [
    "Mango__Gall_Midge",
    "Mango__Healthy",
    "Mango__Powdery_Mildew",
    "Mango__Sooty_Mould"
]

INFO = {
    "Mango__Gall_Midge": {
        "nombre": "Mosca de la Agalla",
        "agente": "Procontarinia matteiana",
        "severidad": "Alta",
        "temporada": "Brotacion",
        "transmision": "Insecto vector",
        "sintomas": [
            "Agallas o protuberancias en hojas",
            "Deformacion del tejido foliar",
            "Amarillamiento y caida de hojas"
        ],
        "tratamiento": [
            "Aplicar insecticidas sistemicos en brotacion",
            "Recolectar y destruir hojas afectadas",
            "Control biologico con parasitoides"
        ]
    },
    "Mango__Healthy": {
        "nombre": "Hoja Sana",
        "agente": "N/A",
        "severidad": "Ninguna",
        "temporada": "Todo el año",
        "transmision": "N/A",
        "sintomas": ["La hoja no presenta sintomas de enfermedad"],
        "tratamiento": ["Mantener riego y fertilizacion adecuados"]
    },
    "Mango__Powdery_Mildew": {
        "nombre": "Mildeo Polvoso",
        "agente": "Oidium mangiferae",
        "severidad": "Alta",
        "temporada": "Floracion",
        "transmision": "Esporas por viento",
        "sintomas": [
            "Polvo blanco en hojas y flores",
            "Deformacion de brotes jovenes",
            "Caida prematura de flores"
        ],
        "tratamiento": [
            "Aplicar azufre mojable cada 15 dias",
            "Fungicidas sistemicos (trifloxistrobina)",
            "Podar ramas afectadas y eliminar residuos"
        ]
    },
    "Mango__Sooty_Mould": {
        "nombre": "Fumagina",
        "agente": "Capnodium mangiferae",
        "severidad": "Media",
        "temporada": "Humeda",
        "transmision": "Melaza de insectos",
        "sintomas": [
            "Capa negra polvorienta en hojas",
            "Reduccion de fotosintesis",
            "Hojas opacas y pegajosas"
        ],
        "tratamiento": [
            "Controlar insectos chupadores (cochinillas)",
            "Lavar hojas con agua jabonosa",
            "Aplicar aceite mineral al 1%"
        ]
    }
}


@app.post("/predecir")
async def predecir(file: UploadFile = File(...)):
    contenido = await file.read()
    img = Image.open(io.BytesIO(contenido)).convert("RGB").resize((224, 224))
    arr = np.array(img) / 255.0
    arr = np.expand_dims(arr, axis=0)
    probs = modelo.predict(arr, verbose=0)[0]
    idx = int(np.argmax(probs))
    clase = CLASES[idx]
    return {
        "clase": clase,
        "confianza": round(float(probs[idx]) * 100, 1),
        "probabilidades": {c: round(float(p) * 100, 1) for c, p in zip(CLASES, probs)},
        "info": INFO[clase]
    }

@app.get("/")
def root():
    return {"status": "MangoScan API activa"}
