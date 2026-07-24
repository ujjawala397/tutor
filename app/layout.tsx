import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-display'
})

export const metadata: Metadata = {
  title: 'CheggTutor | Best Online Tutoring for Grades 3-10',
  description:
    'CheggTutor helps students in Grades 3-10 excel in Maths, Science, Coding, and AI with expert tutors, personalized learning plans, and free demo classes.',
  keywords: [
    'tutoring for grade 3 to 10',
    'online maths tutor',
    'science tutoring',
    'coding classes for students',
    'AI tutoring',
    'CBSE tutoring',
    'best online tutor for students',
    'free demo class',
  ],
  applicationName: 'CheggTutor',
  authors: [{ name: 'CheggTutor' }],
  creator: 'CheggTutor',
  publisher: 'CheggTutor',
  category: 'education',
  metadataBase: new URL('https://cheggtutor.com'),
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'CheggTutor | Tutoring for Grades 3-10',
    description:
      'Expert one-on-one tutoring for students in Grades 3-10. Build confidence in Maths, Science, Coding, and AI with a structured learning plan.',
    siteName: 'CheggTutor',
    url: 'https://cheggtutor.com/',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'CheggTutor tutoring banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CheggTutor | Tutoring for Grades 3-10',
    description:
      'Flexible and affordable online tutoring for Grades 3-10 with live expert support.',
    images: ['/og-image.svg'],
  },
  alternates: {
    canonical: 'https://cheggtutor.com/',
  },
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/favicon.svg',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f8fafc',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
