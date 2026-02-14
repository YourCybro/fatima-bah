import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500'],
})

export const metadata = {
  title: 'Fatima Bah — Discipline · Beauty · Power',
  description: 'Elite fitness. Refined beauty. Feminine power. Where strength meets elegance.',
  openGraph: {
    title: 'Fatima Bah',
    description: 'Elite fitness. Refined beauty. Feminine power.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
