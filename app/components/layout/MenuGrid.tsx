'use client'
import Image from 'next/image'

interface MenuGridProps {
  showSection: (sectionId: string) => void
  isTransitioning: boolean
}

interface MenuItem {
  id: string
  badge: React.ReactNode
  title: string
  section: string
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    badge: (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="menu-badge-icon">
        <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="16" y="10" width="32" height="44" rx="4" />
          <circle cx="32" cy="48" r="1.8" />
          <path d="M24 18h16" />
        </g>
        <rect x="20" y="18" width="24" height="22" rx="2" fill="currentColor" opacity="0.12" />
      </svg>
    ),
    title: 'Pengantar',
    section: 'introduction'
  },
  {
    id: '2',
    badge: (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="menu-badge-icon">
        <rect x="12" y="12" width="40" height="40" rx="6" fill="currentColor" opacity="0.08" />
        <rect x="18" y="18" width="10" height="10" rx="2" fill="#00f0ff" opacity="0.9" />
        <rect x="30" y="18" width="10" height="10" rx="2" fill="#ff00d4" opacity="0.9" />
        <rect x="42" y="18" width="6" height="10" rx="2" fill="#ffffff" opacity="0.7" />
        <rect x="18" y="30" width="14" height="10" rx="2" fill="#9d4edd" opacity="0.9" />
        <rect x="34" y="30" width="14" height="10" rx="2" fill="#00f0ff" opacity="0.5" />
        <rect x="18" y="42" width="30" height="6" rx="2" fill="#ff00d4" opacity="0.6" />
      </svg>
    ),
    title: 'Fitur',
    section: 'services'
  },
  {
    id: '3',
    badge: (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="menu-badge-icon">
        <rect x="12" y="14" width="40" height="36" rx="5" fill="currentColor" opacity="0.08" />
        <rect x="16" y="18" width="32" height="22" rx="3" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <circle cx="24" cy="26" r="3" fill="#ff00d4" opacity="0.9" />
        <path d="M18 38l8-8 6 6 6-5 10 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Galeri',
    section: 'gallery'
  },
  {
    id: '4',
    badge: (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="menu-badge-icon">
        <path
          d="M14 18h28a8 8 0 0 1 8 8v10a8 8 0 0 1-8 8H28l-10 8v-8h-4a8 8 0 0 1-8-8V26a8 8 0 0 1 8-8z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g fill="#00f0ff">
          <circle cx="24" cy="30" r="2.2" />
          <circle cx="32" cy="30" r="2.2" />
          <circle cx="40" cy="30" r="2.2" />
        </g>
      </svg>
    ),
    title: 'Testimoni',
    section: 'testimonials'
  },
  {
    id: '5',
    badge: (
      <Image
        src="/learning_english_geuwat_rb_3d.png"
        alt="GEUWAT"
        className="menu-badge-icon"
        width={64}
        height={64}
      />
    ),
    title: 'Tentang',
    section: 'about'
  },
  { id: '6', badge: '▶', title: 'Start', section: 'contact' }
]

export default function MenuGrid({ showSection, isTransitioning }: MenuGridProps) {

  const handleMenuClick = (section: string) => {
    if (!isTransitioning) {
      showSection(section)
    }
  }

  return (
    <div className="menu-grid" id="menuGrid">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className="menu-item initial-load"
          data-section={item.section}
          onClick={() => handleMenuClick(item.section)}
          style={{ 
            cursor: 'pointer',
            zIndex: 50,
            position: 'relative'
          }}
        >
          <div className="menu-badge">{item.badge}</div>
          <div className="menu-title">{item.title}</div>
        </div>
      ))}
    </div>
  )
}
