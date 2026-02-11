import Image from 'next/image'

interface GalleryProps {
  backToMenu: () => void
}

export default function Gallery({ backToMenu }: GalleryProps) {
  return (
    <>
      <button className="back-btn" onClick={backToMenu}>Kembali ke Menu</button>
      
      <div className="section-header">
        <h2 className="section-title">Galeri Kami</h2>
        <p className="section-subtitle">Menampilkan program dan pencapaian terbaik</p>
      </div>

      <div className="gallery-grid">
        <div className="gallery-item">
          <Image src="/Fitur/LaptopView.png" alt="Tampilan Laptop" width={1200} height={675} />
          <div className="gallery-overlay">
            <h4>Tampilan Laptop</h4>
            <p>Desain responsif untuk layar desktop dan laptop</p>
          </div>
        </div>
        <div className="gallery-item">
          <Image src="/Fitur/HpView.png" alt="Tampilan HP" width={675} height={1200} />
          <div className="gallery-overlay">
            <h4>Tampilan HP</h4>
            <p>Layout mobile yang ringan dan mudah dinavigasi</p>
          </div>
        </div>
      </div>
    </>
  )
}




