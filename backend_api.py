from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import joblib
import numpy as np

# Import rice disease model
from Rice_Leaf_Disease import model, class_names, get_predicted_class

# Load crop recommendation model
crop_model = joblib.load(r"D:\AgroSetu\random_forest_crop_prediction\random_forest_crop_model.joblib")

# FastAPI app setup
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ✅ Rice leaf disease prediction endpoint
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    prediction = get_predicted_class(model, file_path, device="cpu", class_names=class_names)

    # Format prediction nicely
    formatted = prediction.replace("_", " ").title()

    # Add descriptions (with solutions included)
    if prediction == "bacterial_leaf_blight":
        description = "Bacterial Leaf Blight is a serious disease caused by Xanthomonas oryzae. It leads to yellowing, drying, and wilting of rice leaves, which can significantly reduce crop yield. Solution: Use resistant varieties, avoid excess nitrogen, improve drainage, and apply bactericides when needed."
    elif prediction == "brown_spot":
        description = "Brown Spot disease causes small, circular brown lesions on rice leaves. It is often linked to nutrient deficiencies or fungal infection, leading to reduced plant vigor and grain quality. Solution: Improve soil fertility, use seed treatments, and apply fungicides like Mancozeb if severe."
    elif prediction == "healthy":
        description = "The rice leaf appears healthy with no visible signs of disease. Solution: Maintain good irrigation, balanced fertilizer use, and regular monitoring."
    elif prediction == "leaf_blast":
        description = "Leaf Blast is caused by the fungus Magnaporthe oryzae, creating spindle-shaped lesions on rice leaves and stems. Severe infections can lead to significant yield loss. Solution: Use resistant varieties, avoid excess nitrogen, maintain spacing, and apply fungicides like Tricyclazole when necessary."
    elif prediction == "leaf_scald":
        description = "Leaf Scald results in elongated brown lesions with yellowish margins on rice leaves. It usually appears under prolonged wet or humid conditions and weakens plant health. Solution: Improve drainage, avoid continuous flooding, and use resistant varieties if available."
    elif prediction == "narrow_brown_spot":
        description = "Narrow Brown Spot produces elongated brown streaks on rice leaves and stems. Over time, it can reduce photosynthesis and negatively impact grain filling. Solution: Ensure proper nutrition, especially potassium, and apply fungicides if infection spreads."
    else:
        description = "Unknown disease detected. Please provide a clearer image for accurate diagnosis. Solution: Try uploading a higher-quality image or consult an expert."

    return {
        "prediction": formatted,
        "description": description
    }

# ✅ Crop recommendation endpoint
@app.post("/recommend_crop/")
async def recommend_crop(N: float, P: float, K: float,
                         temperature: float, humidity: float,
                         ph: float, rainfall: float):
    """
    Recommend crop based on soil & weather values.
    """
    features = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
    crop = crop_model.predict(features)[0]

    return {
        "recommended_crop": crop
    }
