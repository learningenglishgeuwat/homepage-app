import React from 'react'
import Image from 'next/image'

interface TestimonialsProps {
  backToMenu: () => void
  isActive: boolean
}

export default function Testimonials({ backToMenu, isActive }: TestimonialsProps) {
  const [buttonPos, setButtonPos] = React.useState<{ x: number; y: number } | null>(null)
  const wrapperRef = React.useRef<HTMLDivElement | null>(null)
  const buttonRef = React.useRef<HTMLButtonElement | null>(null)

  const moveButtonRandom = () => {
    const wrapper = wrapperRef.current
    const button = buttonRef.current
    if (!wrapper || !button) return

    const padding = 8
    const rect = wrapper.getBoundingClientRect()
    const btnRect = button.getBoundingClientRect()
    const maxX = Math.max(padding, rect.width - btnRect.width - padding)
    const maxY = Math.max(padding, rect.height - btnRect.height - padding)

    const nextX = Math.random() * maxX
    const nextY = Math.random() * maxY
    setButtonPos({ x: nextX, y: nextY })
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const wrapper = wrapperRef.current
    const button = buttonRef.current
    if (!wrapper || !button) return

    const wrapperRect = wrapper.getBoundingClientRect()
    const btnRect = button.getBoundingClientRect()
    const cursorX = event.clientX - wrapperRect.left
    const cursorY = event.clientY - wrapperRect.top
    const btnCenterX = btnRect.left - wrapperRect.left + btnRect.width / 2
    const btnCenterY = btnRect.top - wrapperRect.top + btnRect.height / 2
    const dx = cursorX - btnCenterX
    const dy = cursorY - btnCenterY
    const distance = Math.hypot(dx, dy)

    if (distance < 80) {
      moveButtonRandom()
    }
  }

  const testimonials = [
    {
      name: "BeginiAmat",
      role: "AI Commentator",
      content: "Pemetaan skill-nya jelas dan mudah divisualisasikan. Cocok untuk pengalaman belajar lintas perangkat dengan konteks yang konsisten.",
      rating: 5,
      avatar: "/testimonial/Begini amat.png"
    },
    {
      name: "ChatGakPAsti",
      role: "AI Commentator",
      content: "Alur belajar GEUWAT rapi dan mudah diikuti. Struktur skill dan progresnya jelas, membuat peningkatan terasa terukur.",
      rating: 5,
      avatar: "/testimonial/Chat Gak Pasti.png"
    },
    {
      name: "Kumlod",
      role: "AI Commentator",
      content: "Pendekatan bertahap GEUWAT masuk akal: fondasi kuat dulu, lalu integrasi AI. Strateginya berkelanjutan untuk hasil jangka panjang.",
      rating: 5,
      avatar: "/testimonial/Kumlod.png"
    },
    {
      name: "Lamakan?",
      role: "AI Commentator",
      content: "Fitur inti sudah solid dan modular. Ini memberi fleksibilitas untuk pengembangan komunitas dan perluasan kurikulum ke depan.",
      rating: 5,
      avatar: "/testimonial/Lama kan.png"
    }
  ]

  React.useEffect(() => {
    if (!isActive) {
      setButtonPos(null)
    }
  }, [isActive])

  return (
    <>
      <button className="back-btn" onClick={backToMenu}>Kembali ke Menu</button>
      
      <div className="section-header testimonials-header">
        <h2 className="section-title">Testimoni</h2>
        <p className="section-subtitle">Cerita nyata dari siswa yang berhasil</p>
      </div>


      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className="testimonial-author">
              <div className="author-avatar">
                <Image src={testimonial.avatar} alt={testimonial.name} width={80} height={80} />
              </div>
              <div className="author-info">
                <h4>{testimonial.name}</h4>
                <p>{testimonial.role}</p>
              </div>
            </div>
            <div className="testimonial-rating">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="star">★</span>
              ))}
            </div>
            <p className="testimonial-content">&quot;{testimonial.content}&quot;</p>
          </div>
        ))}
      </div>

      <div className="testimonials-stats">
        <div
          className="stat-item testimonial-form"
          ref={wrapperRef}
          onMouseMove={handleMouseMove}
        >
          <label htmlFor="testimonial-comment" className="stat-label">Tulis Komentar</label>
          <textarea
            id="testimonial-comment"
            className="testimonial-input"
            placeholder="Tulis komentar kamu di sini..."
            rows={4}
          />
          <button
            ref={buttonRef}
            type="button"
            className="testimonial-submit"
            style={buttonPos ? { left: buttonPos.x, top: buttonPos.y, right: 'auto', bottom: 'auto' } : undefined}
            onMouseEnter={moveButtonRandom}
            onTouchStart={moveButtonRandom}
          >
            Enter
          </button>
        </div>
      </div>

    </>
  )
}




