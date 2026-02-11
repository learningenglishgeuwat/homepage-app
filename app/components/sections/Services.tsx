import React from 'react'

interface ServicesProps {
  backToMenu: () => void
  isActive: boolean
}

export default function Services({ backToMenu, isActive }: ServicesProps) {
  const [activeTab, setActiveTab] = React.useState<'modul' | 'desain' | 'konsultasi' | 'dukungan'>('modul')
  const [showPronunciationTopics, setShowPronunciationTopics] = React.useState(false)
  const pronunciationTopics = [
    { title: 'Alphabet', shortDesc: 'The Foundation' },
    { title: 'Phonetic Symbols', shortDesc: 'IPA Mastery' },
    { title: 'Stressing', shortDesc: 'Rhythm & Beat' },
    { title: 'Final Sound', shortDesc: 'Ending Precision' },
    { title: 'American /t/', shortDesc: 'Flap & Glottal' },
    { title: 'Connected Speech', shortDesc: 'Flow & Link' },
  ]

  React.useEffect(() => {
    if (!isActive) {
      setActiveTab('modul')
      setShowPronunciationTopics(false)
    }
  }, [isActive])

  return (
    <>
      <button className="back-btn" onClick={backToMenu}>Kembali ke Menu</button>
      
      <div className="section-header">
        <h2 className="section-title">Fitur Kami</h2>
        <p className="section-subtitle">Fitur utama untuk Digital Learning yang menyeluruh</p>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === 'modul' ? 'active' : ''}`}
            onClick={() => setActiveTab('modul')}
            type="button"
          >
            Modul Digital
          </button>
          <button
            className={`tab-btn ${activeTab === 'desain' ? 'active' : ''}`}
            onClick={() => setActiveTab('desain')}
            type="button"
          >
            Desain
          </button>
          <button
            className={`tab-btn ${activeTab === 'konsultasi' ? 'active' : ''}`}
            onClick={() => setActiveTab('konsultasi')}
            type="button"
          >
            Konsultasi
          </button>
          <button
            className={`tab-btn ${activeTab === 'dukungan' ? 'active' : ''}`}
            onClick={() => setActiveTab('dukungan')}
            type="button"
          >
            Dukungan
          </button>
        </div>
        
        {activeTab === 'modul' && (
          <div className="tab-pane active">
            <div className="services-subject-grid">
              {[
                { label: 'Pronunciation', locked: false },
                { label: 'Vocabulary', locked: true },
                { label: 'Grammar', locked: true },
                { label: 'Speaking', locked: true },
              ].map(({ label, locked }) => (
                <div
                  key={label}
                  className={`services-subject-card${locked ? ' locked' : ''}`}
                  {...(label === 'Pronunciation'
                    ? {
                        role: 'button',
                        tabIndex: 0,
                        onClick: () => setShowPronunciationTopics((prev) => !prev),
                        onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            setShowPronunciationTopics((prev) => !prev)
                          }
                        },
                      }
                    : {})}
                >
                  <h4>{label}</h4>
                  <p>Modul digital terarah untuk meningkatkan {label.toLowerCase()}.</p>
                  {label === 'Pronunciation' && (
                    <div className="services-topic-toggle">
                      {showPronunciationTopics ? 'Sembunyikan topik' : 'Lihat topik'}
                    </div>
                  )}
                  {locked && <span className="services-locked">Locked</span>}
                  {label === 'Pronunciation' && (
                    <div className={`services-topic-dropdown${showPronunciationTopics ? ' show' : ''}`}>
                      <ul className="services-topic-list">
                        {pronunciationTopics.map((topic) => (
                          <li key={topic.title}>
                            <span className="topic-title">{topic.title}</span>
                            <span className="topic-desc">{topic.shortDesc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'desain' && (
          <div className="tab-pane active">
            <div className="services-design-grid">
              <div className="services-subject-card">
                <h4>Laptop</h4>
                <p>Desain responsif optimal untuk layar desktop dan laptop.</p>
                <div className="services-video" aria-label="Video desain laptop">
                  <iframe
                    src="https://www.youtube.com/embed/33JP1F-lfAs"
                    title="Desain Laptop"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="services-subject-card">
                <h4>HP</h4>
                <p>Tampilan mobile yang ringan, ringkas, dan mudah dinavigasi.</p>
                <div className="services-video" aria-label="Video desain HP">
                  <iframe
                    src="https://www.youtube.com/embed/FMD3y8bXcZ8"
                    title="Desain HP"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'konsultasi' && (
          <div className="tab-pane active">
            <div className="services-empty">Konten konsultasi segera hadir.</div>
          </div>
        )}

        {activeTab === 'dukungan' && (
          <div className="tab-pane active">
            <div className="services-empty">Konten dukungan segera hadir.</div>
          </div>
        )}
      </div>
    </>
  )
}
