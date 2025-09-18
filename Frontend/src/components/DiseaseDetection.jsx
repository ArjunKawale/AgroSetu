import React, { useState } from "react";
import { Upload, Image as ImageIcon, Loader2, AlertTriangle } from "lucide-react";

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError("");
    }
  };

  const handleSampleImage = () => {
    // Example sample image (replace with your hosted sample image)
    const sample = "https://via.placeholder.com/200x200.png?text=Sample+Crop+Image";
    setPreview(sample);
    setSelectedImage(null);
    setResult(null);
    setError("");
  };

  const handleAnalyze = async () => {
    if (!selectedImage && !preview) {
      setError("Please upload an image first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();

      if (selectedImage) {
        formData.append("file", selectedImage); // send image file
      } else {
        formData.append("url", preview); // if sample image
      }

      const response = await fetch("http://localhost:8000/predict/", {
      method: "POST",
      body: formData,
      });


      if (!response.ok) {
        throw new Error("Server error: " + response.statusText);
      }

      const data = await response.json();

      // API returns { prediction: "...", description: "..." }
      setResult({
        disease: data.prediction,
        description: data.description,
      });
    } catch (err) {
      setError("Failed to analyze the image. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 p-25 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            AI Crop Disease Detection
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Upload crop images for instant AI-powered disease identification
          </p>
        </div>

        {/* Upload & Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Upload Crop Image</h2>

            <div className="border-2 border-dashed border-green-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 bg-green-50/40">
              {preview ? (
                <img
                  src={preview}
                  alt="Crop Preview"
                  className="w-full h-64 object-cover rounded-xl shadow-md"
                />
              ) : (
                <>
                  <Upload className="w-10 h-10 text-green-500" />
                  <p className="text-gray-500 text-sm text-center">
                    Upload an image of your crop for disease analysis
                  </p>
                </>
              )}

              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <span className="px-4 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition-all inline-flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Choose Image
                </span>
              </label>

              <button
                onClick={handleSampleImage}
                className="w-full py-2 rounded-xl bg-yellow-50 border border-yellow-200 text-yellow-700 hover:bg-yellow-100 transition"
              >
                Try Sample Image
              </button>

              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow hover:from-green-600 hover:to-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin w-5 h-5" />
                    Analyzing...
                  </span>
                ) : (
                  "Analyze Image"
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Analysis Results</h2>

            {!preview && (
              <p className="text-gray-500 text-center py-16">
                Upload an image to see AI analysis results
              </p>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                {error}
              </div>
            )}

            {result && !loading && (
            <div className="space-y-4">
              {result.disease?.toLowerCase() === "healthy" ? (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                  <h3 className="font-semibold text-green-700 mb-1">Crop is Healthy</h3>
                  <p className="text-gray-700">{result.description}</p>
                </div>
              ) : (
                <>
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 p-4 rounded-xl border border-red-100">
                    <h3 className="font-semibold text-red-700 mb-1">Detected Disease</h3>
                    <p className="text-gray-700">{result.prediction}</p>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
                    <h3 className="font-semibold text-yellow-700 mb-1">Description</h3>
                    <p className="text-gray-700">{result.description}</p>
                  </div>
                </>
              )} 
            </div>
)}

          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;