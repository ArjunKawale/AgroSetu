import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Weather from './components/Weather.jsx'
import DiseaseDetection from './components/DiseaseDetection.jsx'
import CropRecommendation from './components/CropRecommendation.jsx'
import KnowledgeHub from './components/ArticlesAi.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      
      <Weather />
      <DiseaseDetection></DiseaseDetection>
      <CropRecommendation></CropRecommendation>
      <KnowledgeHub></KnowledgeHub>

    </div>
  )
}

export default App