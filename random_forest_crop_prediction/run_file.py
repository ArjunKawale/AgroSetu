import joblib
import numpy as np

# Load the trained model
model = joblib.load("random_forest_crop_model.joblib")

def predict_crop(N, P, K, temperature, humidity, ph, rainfall):
    """
    Predict the best crop given soil & weather values.
    """
    features = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
    return model.predict(features)[0]

if __name__ == "__main__":
    print("🌱 Crop Recommendation System 🌱")
    
    # Take user input
    N = float(input("Nitrogen (N): "))
    P = float(input("Phosphorus (P): "))
    K = float(input("Potassium (K): "))
    temp = float(input("Temperature (°C): "))
    hum = float(input("Humidity (%): "))
    ph = float(input("pH: "))
    rain = float(input("Rainfall (mm): "))

    # Predict crop
    crop = predict_crop(N, P, K, temp, hum, ph, rain)
    print("\n✅ Recommended Crop:", crop)
