# 🌾 AgroSetu – AI-Powered Farmer Support Platform

**AgroSetu** is an AI-driven platform designed to **improve farmer productivity and yield** by combining **crop disease diagnosis** and **data-driven crop recommendations**. It leverages deep learning and machine learning models, delivered through a farmer-friendly web/mobile interface.

---

## 🚜 Features

* **Crop Disease Classification (CNN Model)**
  Farmers upload crop images (via phone camera). The system:

  1. Preprocesses the image.
  2. Classifies disease using a **Convolutional Neural Network (PyTorch)**.
  3. Provides disease name, severity insights, and preventive measures.

* **Crop Recommendation (Random Forest Model)**
  Based on soil data, weather, and farmer inputs, the system:

  1. Processes metadata.
  2. Runs a **Random Forest model (scikit-learn)**.
  3. Suggests the most suitable crops for higher yield and profitability.

* **Farmer-Friendly UI (React + FastAPI backend)**

  * Multilingual interface (planned).
  * Simple photo upload & form entry.
  * Recommendations shown in an easy-to-understand format.

---

## 🧠 Tech Stack

* **Frontend:** React
* **Backend:** FastAPI
* **ML/DL Frameworks:** PyTorch (CNN), scikit-learn (Random Forest)
* **Other Tools:** Pandas, NumPy, Matplotlib for data preprocessing & analysis

---

## 📌 System Architecture

1. **Frontend (React):** Farmer uploads crop images & metadata.
2. **Backend (FastAPI):** Handles requests, routes data to ML models.
3. **CNN Model (PyTorch):** Classifies crop diseases from images.
4. **Random Forest Model (scikit-learn):** Recommends suitable crops.
5. **Results:** Sent back to frontend → displayed with disease info & crop suggestions.

---

## 🔗 Example Flow

1. Farmer captures a **leaf photo** → Uploads via AgroSetu app.
2. **CNN model** detects disease type.
3. Farmer enters soil/weather details.
4. **Random Forest model** recommends profitable/suitable crops.
5. Farmer receives **disease insights + crop recommendations** in one dashboard.

---



## 🎯 Future Work

* Add **multilingual support** (Marathi, Hindi, English).
* Integrate **weather API + soil sensors** for real-time recommendations.
* Expand disease classification dataset for more crops.
* Deploy mobile-first app version.

---

Do you want me to also **add pipeline diagrams (like ASCII/Markdown flowchart)** for AgroSetu’s CNN + Random Forest workflows, similar to the other project’s README?
