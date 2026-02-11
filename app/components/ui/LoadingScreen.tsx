'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHidden(true)
    }, 1000) // Exact 1s delay from original

    return () => clearTimeout(timer)
  }, [])

  return (
    <div 
      className={`loading-screen ${isHidden ? 'hidden' : ''}`}
    >
      <div className="loader-ring" />
      <div className="loading-text">Initializing Experience...</div>
    </div>
  )
}
