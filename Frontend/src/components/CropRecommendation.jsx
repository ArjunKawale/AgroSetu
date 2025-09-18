import React, { useState } from "react";

const CropRecommendation = () => {
  const [soilData, setSoilData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSoilData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleAnalyze = async () => {
  const { ph, nitrogen, phosphorus, potassium, temperature, humidity, rainfall } = soilData;

  if (!ph || !nitrogen || !phosphorus || !potassium || !temperature || !humidity || !rainfall) {
    setError("Please fill out all fields before submitting.");
    return;
  }

  setLoading(true);
  setError("");
  setRecommendations([]);

  try {
    // Build query params for FastAPI
    const params = new URLSearchParams({
      N: nitrogen,
      P: phosphorus,
      K: potassium,
      temperature,
      humidity,
      ph,
      rainfall,
    });

    const response = await fetch(`http://127.0.0.1:8000/recommend_crop/?${params.toString()}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    setRecommendations([data.recommended_crop]); // since API returns a single crop
  } catch (err) {
    console.error(err);
    setError("Failed to get recommendations. Please try again.");
  } finally {
    setLoading(false);
  }
};

  // Custom loader
  const Loader = () => (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
      <span className="ml-2">Analyzing...</span>
    </div>
  );

  // Alert icon
  const AlertTriangle = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            AI Crop Recommendation System
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Input soil & climate data to receive AI-powered crop suggestions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Soil & Climate Data Input
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "Nitrogen (N)", name: "nitrogen", max: 150 },
                { label: "Phosphorus (P)", name: "phosphorus", max: 150 },
                { label: "Potassium (K)", name: "potassium", max: 200 },
                { label: "Temperature (°C)", name: "temperature", max: 50 },
                { label: "Humidity (%)", name: "humidity", max: 100 },
                { label: "pH", name: "ph", max: 14, step: 0.1 },
              ].map((field, idx) => (
                <div key={idx}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                  <input
                    type="number"
                    name={field.name}
                    value={soilData[field.name]}
                    onChange={handleChange}
                    min="0"
                    max={field.max}
                    step={field.step || "1"}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                  />
                </div>
              ))}

              {/* Rainfall */}
              <div className="lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Rainfall (mm)</label>
                <input
                  type="number"
                  name="rainfall"
                  value={soilData.rainfall}
                  onChange={handleChange}
                  min="0"
                  max="300"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                />
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full py-3.5 mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow hover:from-green-600 hover:to-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg"
            >
              {loading ? <Loader /> : "Get Recommendations"}
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-2 text-red-600 mt-4">
                <AlertTriangle />
                {error}
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Recommended Crops
            </h2>

            {recommendations.length === 0 && !loading ? (
              <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-2xl">
                <p className="text-gray-500">Fill out soil data and click "Get Recommendations" to see AI-powered crop suggestions</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map((crop, index) => (
                  <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <span className="text-xl">🌱</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-green-800">{crop}</h3>
                        <p className="text-sm text-green-600">Ideal for your soil</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropRecommendation;
