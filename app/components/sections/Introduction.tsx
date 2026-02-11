import React from 'react'

interface IntroductionProps {
  backToMenu: () => void
  isActive: boolean
}

export default function Introduction({ backToMenu, isActive }: IntroductionProps) {
  const [activeTab, setActiveTab] = React.useState<'dashboard' | 'skills'>('dashboard')

  React.useEffect(() => {
    if (!isActive) {
      setActiveTab('dashboard')
    }
  }, [isActive])

  return (
    <>
      <button className="back-btn" onClick={backToMenu}>Kembali ke Menu</button>
      
      {/* Hero Banner */}
      <div className="intro-hero">
        <div className="intro-hero-content">
          
          <h1 className="intro-headline">Intinya GEUWAT, menjadi variabel<br/><span>dalam takdirmu, that's simple</span></h1>
          <p className="intro-subtext">Platform khusus dengan jalur pengucapan, kosakata, tata bahasa, speaking, pelacakan progres serta learning path terarah.</p>
          <div className="tab-buttons">
            <button
              className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
              type="button"
            >
              Keuntungan
            </button>
          </div>
        </div>
        <div className="intro-hero-visual">
          <div className="intro-floating-card card-1">
            <span className="card-text">Pengucapan?</span>
          </div>
          <div className="intro-floating-card card-2">
            <span className="card-text">Kosakata?</span>
          </div>
          <div className="intro-floating-card card-3">
            <span className="card-text">Tata Bahasa?</span>
          </div>
          <div className="intro-floating-card card-4">
            <span className="card-text">Speaking?</span>
          </div>
          <div className="intro-orb"></div>
        </div>
      </div>

      {/* Core Values */}
      {activeTab === 'dashboard' && (
        <div className="intro-values">
          <div className="value-card">
            <div className="value-number">01</div>
            <h3>Jalur Personal</h3>
            <p>Tentukan tujuanmu dan dapatkan learning path terstruktur sesuai target bahasa Inggrismu.</p>
          </div>
          <div className="value-card">
            <div className="value-number">02</div>
            <h3>Modul Skill</h3>
            <p>Fokus pada pengucapan, kosakata, tata bahasa, dan speaking dengan pembelajaran terarah.</p>
          </div>
          <div className="value-card">
            <div className="value-number">03</div>
            <h3>Akses Aman</h3>
            <p>Akses khusus member dengan keamanan perangkat menjaga data belajarmu tetap aman dan konsisten.</p>
          </div>
        </div>
      )}

      {/* Tech Stack */}
      <div className="intro-tech">
        <p className="tech-label">Modul Inti Pembelajaran</p>
        <div className="tech-marquee">
          <div className="tech-track">
            {['Pengucapan', 'Kosakata', 'Tata Bahasa', 'Speaking', 'Learning Path', 'Progres', 'Tutorial', 'Achievement'].map((tech, index) => (
              <span key={index} className="tech-item">{tech}</span>
            ))}
            {['Pengucapan', 'Kosakata', 'Tata Bahasa', 'Speaking', 'Learning Path', 'Progres', 'Tutorial', 'Achievement'].map((tech, index) => (
              <span key={`dup-${index}`} className="tech-item">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}




