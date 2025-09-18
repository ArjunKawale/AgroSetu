import React, { useEffect, useState } from "react";
import { Search, MapPin, Thermometer, Droplets, Wind, Eye, Gauge } from "lucide-react";

const Weather = () => {
  const [city, setCity] = useState("Mumbai");
  const [query, setQuery] = useState("Mumbai");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Replace this with your actual API integration
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const API_URL = import.meta.env.VITE_WEATHER_API_URL;

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      setError("");
      
      try {
        // For real implementation, uncomment this and remove mock data:
        
        const response = await fetch(
          `${API_URL}?key=${API_KEY}&q=${query}&aqi=no`
        );
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        setWeather(data);
        
        
        // // Mock data for demonstration - remove this in production
        // await new Promise(resolve => setTimeout(resolve, 800));
        // const mockData = {
        //   location: {
        //     name: query,
        //     country: "India",
        //     region: "Maharashtra"
        //   },
        //   current: {
        //     temp_c: 28,
        //     condition: {
        //       text: "Partly Cloudy",
        //       icon: "https://cdn.weatherapi.com/weather/64x64/day/116.png"
        //     },
        //     humidity: 72,
        //     wind_kph: 15.2,
        //     pressure_mb: 1013,
        //     vis_km: 10,
        //     uv: 6,
        //     feelslike_c: 31
        //   }
        // };
        // setWeather(mockData);
        
      } catch (err) {
        setError(err.message || "Unable to fetch weather data");
        setWeather(null);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [query, API_KEY, API_URL]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) setQuery(city.trim());
  };

  const getTemperatureColor = (temp) => {
    if (temp >= 35) return "text-red-500";
    if (temp >= 25) return "text-orange-500";
    if (temp >= 15) return "text-yellow-500";
    return "text-blue-500";
  };

  const getHumidityColor = (humidity) => {
    if (humidity >= 70) return "text-blue-500";
    if (humidity >= 40) return "text-green-500";
    return "text-yellow-500";
  };

  return (
    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
            <span className="text-2xl">🌱</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            Smart Farming Dashboard
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Monitor your farm's vital statistics and get AI-powered insights for better decision-making
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name..."
                className="w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-sm border border-green-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 shadow-lg text-gray-800 placeholder-gray-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weather Card */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
                  <span className="text-white text-xl">🌤</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Current Weather</h2>
              </div>

              {loading && (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                  <span className="ml-3 text-gray-600">Loading weather data...</span>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-600 flex items-center gap-2">
                    <span>⚠️</span>
                    {error}
                  </p>
                </div>
              )}

              {weather && !loading && (
                <div>
                  {/* Location */}
                  <div className="flex items-center gap-2 mb-6">
                    <MapPin className="text-green-500 w-5 h-5" />
                    <span className="text-xl font-semibold text-gray-800">
                      {weather.location.name}, {weather.location.country}
                    </span>
                  </div>

                  {/* Main Temperature Display */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className={`text-6xl font-bold ${getTemperatureColor(weather.current.temp_c)}`}>
                        {weather.current.temp_c}°
                      </div>
                      <div>
                        <p className="text-2xl text-gray-700 font-medium">
                          {weather.current.condition.text}
                        </p>
                        <p className="text-gray-500">
                          Feels like {weather.current.feelslike_c}°C
                        </p>
                      </div>
                    </div>
                    <img
                      src={weather.current.condition.icon}
                      alt={weather.current.condition.text}
                      className="w-20 h-20"
                    />
                  </div>

                  {/* Weather Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Droplets className="text-blue-500 w-5 h-5" />
                        <span className="text-sm font-medium text-gray-600">Humidity</span>
                      </div>
                      <div className={`text-2xl font-bold ${getHumidityColor(weather.current.humidity)}`}>
                        {weather.current.humidity}%
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Wind className="text-green-500 w-5 h-5" />
                        <span className="text-sm font-medium text-gray-600">Wind Speed</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        {weather.current.wind_kph} <span className="text-sm font-normal">kph</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Gauge className="text-purple-500 w-5 h-5" />
                        <span className="text-sm font-medium text-gray-600">Pressure</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-600">
                        {weather.current.pressure_mb} <span className="text-sm font-normal">mb</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="text-orange-500 w-5 h-5" />
                        <span className="text-sm font-medium text-gray-600">Visibility</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-600">
                        {weather.current.vis_km} <span className="text-sm font-normal">km</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Crop Prediction Card */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                  <span className="text-white text-xl">🌱</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Crop Insights</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                  <h3 className="font-semibold text-green-700 mb-2">Recommended Crops</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-sm text-gray-700">Rice (Monsoon Season)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-sm text-gray-700">Cotton (High Humidity)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-sm text-gray-700">Sugarcane (Optimal Temp)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-100">
                  <h3 className="font-semibold text-orange-700 mb-2">Weather Alerts</h3>
                  <p className="text-sm text-gray-700">High humidity detected. Consider fungicide application for crops.</p>
                </div>
              </div>
            </div>

            {/* Farm Statistics */}
            
          </div>
          
        </div>
        {/* Farming Recommendations */}
<div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300 mt-6">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">
    Today&apos;s Farming Recommendations
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* Irrigation */}
    <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
      <h3 className="font-semibold text-yellow-800 mb-2">Irrigation</h3>
      <p className="text-sm text-gray-700">
        Current soil moisture is optimal. Next irrigation recommended in 2-3 days.
      </p>
    </div>

    {/* Fertilization */}
    <div className="bg-green-50 rounded-xl p-4 border border-green-100">
      <h3 className="font-semibold text-green-800 mb-2">Fertilization</h3>
      <p className="text-sm text-gray-700">
        Apply nitrogen fertilizer (50kg/hectare) based on current growth stage.
      </p>
    </div>

    {/* Disease Prevention */}
    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
      <h3 className="font-semibold text-emerald-800 mb-2">Disease Prevention</h3>
      <p className="text-sm text-gray-700">
        High humidity detected. Monitor for fungal diseases and apply preventive spray.
      </p>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default Weather;