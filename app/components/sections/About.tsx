'use client'

import React from 'react'

interface AboutProps {
  backToMenu: () => void
  isActive: boolean
}

export default function About({ backToMenu, isActive }: AboutProps) {
  const [fastActiveIndex, setFastActiveIndex] = React.useState(-1)
  const [slowActiveIndex, setSlowActiveIndex] = React.useState(-1)
  const [isRunning, setIsRunning] = React.useState(false)
  const timeoutsRef = React.useRef<number[]>([])

  const fastSteps = ['User', 'English', 'Gerbang 1', 'Gerbang 2', 'Gerbang 3']
  const slowSteps = ['User', 'English', 'Gerbang 1', 'Gerbang 2', 'Gerbang 3']

  const clearTimers = () => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id))
    timeoutsRef.current = []
  }

  const runProgress = (speed: 'fast' | 'slow') => {
    const steps = speed === 'fast' ? fastSteps : slowSteps
    const delay = speed === 'fast' ? 500 : 1600

    steps.forEach((_, index) => {
      const id = window.setTimeout(() => {
        if (speed === 'fast') {
          setFastActiveIndex(index)
        } else {
          setSlowActiveIndex(index)
        }
      }, index * delay)
      timeoutsRef.current.push(id)
    })
  }

  const handleStart = () => {
    clearTimers()
    setFastActiveIndex(-1)
    setSlowActiveIndex(-1)
    setIsRunning(true)
    runProgress('fast')
    runProgress('slow')

    const total = Math.max((fastSteps.length - 1) * 500, (slowSteps.length - 1) * 1600)
    const doneId = window.setTimeout(() => {
      setIsRunning(false)
    }, total + 300)
    timeoutsRef.current.push(doneId)
  }

  React.useEffect(() => {
    if (!isActive) {
      clearTimers()
      setIsRunning(false)
      setFastActiveIndex(-1)
      setSlowActiveIndex(-1)
    }
  }, [isActive])

  return (
    <>
      <button className="back-btn" onClick={backToMenu}>Kembali ke Menu</button>
      
      <div className="section-header">
        <h2 className="section-title">Tentang GEUWAT</h2>
        <p className="section-subtitle">Cerita, misi, dan nilai kami</p>
      </div>

      <div className="about-content">
        <div className="about-text">
          <h3>GEUWAT: Membangun Fondasi Bahasa Inggris Masa Depan</h3>
          <p>Aplikasi website GEUWAT ini berfokus pada Digital Learning digital sebagai tahapan awal untuk membangun fondasi belajar yang terstruktur.</p>
          <p>Ke depannya, GEUWAT akan mengintegrasikan AI dalam aplikasi untuk memberikan pengalaman belajar yang lebih personal dan interaktif.</p>
          <p>Aplikasi ini diluncurkan pada tahun 2026 sebagai langkah awal menuju ekosistem Digital Learning modern.</p>
        </div>
        <div className="about-image">
          <div className="workflow-root">
            <div className="workflow-header">
              <h3 className="workflow-title">GEUWAT Progress Simulation</h3>
              <button type="button" className="tab-btn active" onClick={handleStart}>
                {isRunning ? 'Running...' : 'Start Progress'}
              </button>
            </div>
            <div className="workflow-status">
              {isRunning ? 'Simulasi berjalan' : 'Klik untuk memulai simulasi'}
            </div>

            <div className="workflow-grid">
              <div className="workflow-card">
                <h4>Pakai aplikasi GEUWAT</h4>
                <div className="workflow-steps">
                  {fastSteps.map((step, index) => (
                    <div
                      key={step}
                      className={`workflow-step${index <= fastActiveIndex ? ' active' : ''}`}
                    >
                      <span className="workflow-step-label">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="workflow-card">
                <h4>Tanpa aplikasi GEUWAT</h4>
                <div className="workflow-steps">
                  {slowSteps.map((step, index) => (
                    <div
                      key={step}
                      className={`workflow-step${index <= slowActiveIndex ? ' active' : ''}`}
                    >
                      <span className="workflow-step-label">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}




