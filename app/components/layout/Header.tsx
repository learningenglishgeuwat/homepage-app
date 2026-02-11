'use client'
import Image from 'next/image'

export default function Header() {
  return (
    <div className="header">
      <div className="logo">
        <Image src="/learning_english_geuwat_rb_3d.png" alt="GEUWAT logo" width={160} height={160} />
      </div>
      <h1 className="brand-name">GEUWAT</h1>
      <p className="tagline">Digital English Learning</p>
    </div>
  )
}
