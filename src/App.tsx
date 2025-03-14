import React from 'react'
import Header from './components/header'
import Footer from './components/footer'
import AirQualityDashboard from './components/air-quality-dashboard'
import './theme.css'
const App: React.FC = () => {
  return (
    <div>
      <Header />
      <main style={{ padding: '24px' }}>
        <AirQualityDashboard />
      </main>
      <Footer />
    </div>
  )
}

export default App
