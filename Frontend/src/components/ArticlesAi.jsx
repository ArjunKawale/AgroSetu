import { BookOpen, TrendingUp, MessageSquare } from "lucide-react";

function KnowledgeHub() {
  return (
    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            Knowledge Hub & AI Assistant
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Access farming guides, expert articles, and get instant answers from our AI chatbot
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Latest Articles */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-100 p-6">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="text-green-600 w-6 h-6" />
              <h2 className="text-2xl font-bold text-gray-800">
                Latest Articles & Guides
              </h2>
            </div>

            <div className="space-y-4">
              {/* Article Card */}
              {[
                {
                  tag: "Crop Management",
                  trending: true,
                  title: "Modern Rice Farming Techniques for Higher Yield",
                  desc: "Learn about scientific approaches to increase rice productivity using precision farming.",
                  time: "5 min read",
                },
                {
                  tag: "Pest Control",
                  trending: false,
                  title: "Integrated Pest Management in Vegetable Crops",
                  desc: "Strategies that reduce chemical usage while maintaining crop health.",
                  time: "7 min read",
                },
                {
                  tag: "Schemes",
                  trending: true,
                  title: "Government Subsidies and Agricultural Schemes 2024",
                  desc: "Guide to subsidies, support, and loan schemes available for farmers.",
                  time: "4 min read",
                },
                {
                  tag: "Technology",
                  trending: false,
                  title: "Smart Irrigation Systems and Water Conservation",
                  desc: "How IoT-based systems reduce water use by 30% while improving yields.",
                  time: "6 min read",
                },
              ].map((article, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-xl p-4 bg-white/60 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                      {article.tag}
                    </span>
                    {article.trending && (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Trending
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{article.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{article.time}</span>
                    <button className="text-sm text-green-600 font-medium hover:underline">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Assistant */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-100 p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="text-green-600 w-6 h-6" />
              <h2 className="text-2xl font-bold text-gray-800">AI Farming Assistant</h2>
            </div>

            {/* Chat Window */}
            <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 p-4 overflow-y-auto mb-4 space-y-3">
              {/* Example messages */}
              <div className="bg-green-50 p-3 rounded-lg text-sm text-gray-800">
                <strong>Q:</strong> What fertilizer should I use for rice crops? <br />
                <strong>A:</strong> Use NPK 4:2:1. Apply 120kg N, 60kg P₂O₅, and 40kg K₂O per hectare.
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-sm text-gray-800">
                <strong>Q:</strong> How to identify and treat brown spot disease? <br />
                <strong>A:</strong> Brown lesions on leaves. Treat with Propiconazole 0.1% spray every 10–12 days.
              </div>
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask about farming techniques, diseases, fertilizers..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
              />
              <button className="px-5 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition">
                Send
              </button>
            </div>

            {/* Quick Topics */}
            <div className="mt-4 flex flex-wrap gap-2">
              {["Crop Diseases", "Fertilizers", "Pest Control", "Irrigation", "Market Prices"].map(
                (topic, i) => (
                  <button
                    key={i}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-green-100 text-gray-700 rounded-full transition"
                  >
                    {topic}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KnowledgeHub;
