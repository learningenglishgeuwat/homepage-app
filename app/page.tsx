'use client'

import { useState, useEffect } from 'react'
import LoadingScreen from './components/ui/LoadingScreen'
import AmbientBg from './components/ui/AmbientBg'
import GridOverlay from './components/ui/GridOverlay'
import NotificationPrompt from './components/ui/NotificationPrompt'
import Header from './components/layout/Header'
import MenuGrid from './components/layout/MenuGrid'
import Introduction from './components/sections/Introduction'
import Services from './components/sections/Services'
import Gallery from './components/sections/Gallery'
import Testimonials from './components/sections/Testimonials'
import About from './components/sections/About'
import Contact from './components/sections/Contact'

export default function Home() {
  const storageKey = 'homepage_active_section'
  const [activeSection, setActiveSection] = useState('')
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey)
    if (saved) {
      setActiveSection(saved)
    }
  }, [])

  useEffect(() => {
    if (activeSection) {
      window.localStorage.setItem(storageKey, activeSection)
    } else {
      window.localStorage.removeItem(storageKey)
    }
  }, [activeSection])
  
  const showSection = (sectionId: string) => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    
    setTimeout(() => {
      setActiveSection(sectionId)
      setIsTransitioning(false)
    }, 550)
  }
  
  const backToMenu = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    
    setTimeout(() => {
      setActiveSection('')
      setIsTransitioning(false)
    }, 200)
  }

  return (
    <>
      <LoadingScreen />
      <AmbientBg />
      <GridOverlay />
      <NotificationPrompt />
      
      <div className="container">
        {/* Header */}
        <div id="mainHeader" style={{ display: activeSection ? 'none' : 'block' }}>
          <Header />
        </div>

        {/* Menu Grid - Show when no section is active */}
        {!activeSection && <MenuGrid showSection={showSection} isTransitioning={isTransitioning} />}

        {/* Content Sections */}
        <div id="contentArea">
          {/* Introduction Section */}
          <div className={`content-section ${activeSection === 'introduction' ? 'active' : ''}`} id="introduction" style={{ display: activeSection === 'introduction' ? 'block' : 'none' }}>
            <Introduction backToMenu={backToMenu} isActive={activeSection === 'introduction'} />
          </div>

          {/* Services Section */}
          <div className={`content-section ${activeSection === 'services' ? 'active' : ''}`} id="services" style={{ display: activeSection === 'services' ? 'block' : 'none' }}>
            <Services backToMenu={backToMenu} isActive={activeSection === 'services'} />
          </div>

          {/* Gallery Section */}
          <div className={`content-section ${activeSection === 'gallery' ? 'active' : ''}`} id="gallery" style={{ display: activeSection === 'gallery' ? 'block' : 'none' }}>
            <Gallery backToMenu={backToMenu} />
          </div>

          {/* Testimonials Section */}
          <div className={`content-section ${activeSection === 'testimonials' ? 'active' : ''}`} id="testimonials" style={{ display: activeSection === 'testimonials' ? 'block' : 'none' }}>
            <Testimonials backToMenu={backToMenu} isActive={activeSection === 'testimonials'} />
          </div>

          {/* About Section */}
          <div className={`content-section ${activeSection === 'about' ? 'active' : ''}`} id="about" style={{ display: activeSection === 'about' ? 'block' : 'none' }}>
            <About backToMenu={backToMenu} isActive={activeSection === 'about'} />
          </div>

          {/* Contact Section */}
          <div className={`content-section ${activeSection === 'contact' ? 'active' : ''}`} id="contact" style={{ display: activeSection === 'contact' ? 'block' : 'none' }}>
            <Contact backToMenu={backToMenu} />
          </div>
        </div>
      </div>
    </>
  )
}
