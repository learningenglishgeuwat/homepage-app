interface ContactProps {
  backToMenu: () => void
}

export default function Contact({ backToMenu }: ContactProps) {
  return (
    <>
      <button className="back-btn" onClick={backToMenu}>Kembali ke Menu</button>
      
      <div className="section-header">
        <h2 className="section-title">Kontak</h2>
        <p className="section-subtitle">Hubungi tim GEUWAT</p>
      </div>

      <div className="contact-grid">
        <div className="contact-form">
          <h3>Mulai Sekarang</h3>
          <p>Gabung dan mulai belajar bersama GEUWAT</p>
          <div className="glass-card" style={{padding: '18px 20px'}}>
            <p style={{fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.55)', textAlign: 'center'}}>
              Harga Langganan
            </p>
            <p style={{fontSize: '22px', fontWeight: 600, color: '#ffffff', textAlign: 'center', marginTop: '6px'}}>
              Rp30.000 <span style={{fontSize: '13px', color: 'rgba(255,255,255,0.75)'}}>/ bulan</span>
            </p>
          </div>
          <div className="glass-card">
            <a href="/register" className="intro-cta-primary" style={{display: 'block', textAlign: 'center', marginBottom: '15px'}}>
              Register Now
            </a>
            <a href="https://learningenglishgeuwat.vercel.app" className="intro-cta-secondary" style={{display: 'block', textAlign: 'center'}}>
              Login to Account
            </a>
          </div>
        </div>
        <div className="glass-card">
          <h3>Kontak Cepat</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            <a
              href="https://wa.me/6285846003119"
              target="_blank"
              rel="noopener noreferrer"
              style={{color: 'var(--primary)', textDecoration: 'none'}}
            >
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/learningenglishgeuwat/"
              target="_blank"
              rel="noopener noreferrer"
              style={{color: 'var(--primary)', textDecoration: 'none'}}
            >
              Instagram
            </a>
            <span style={{color: 'var(--primary)'}}>
              learningenglishgeuwat@gmail.com
            </span>
          </div>
        </div>
      </div>
    </>
  )
}




