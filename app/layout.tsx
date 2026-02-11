import { Outfit, Syne } from 'next/font/google'
import './globals.css'
import './styles/GEUWAT.css'

const outfit = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-outfit',
  weight: ['200', '300', '400', '500', '600']
})

const syne = Syne({ 
  subsets: ['latin'], 
  variable: '--font-syne',
  weight: ['400', '500', '600', '700']
})

export const metadata = {
  title: 'GEUWAT - Digital English Learning',
  description: 'Transforming visionary ideas into powerful digital realities through cutting-edge technology and creative excellence.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${syne.variable}`}>
        {children}
      </body>
    </html>
  )
}
