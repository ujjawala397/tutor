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
  title: 'CheggTutor | Online Math, Science, SAT, ACT and AP Tutoring',
  description:
    'CheggTutor helps Grades 3-12 students improve grades and test scores with expert 1:1 tutoring.',
  keywords: [
    'online math tutor',
    'sat math tutor online',
    'act math tutoring',
    'ap calculus tutor',
    'ap physics tutor',
    'online science tutor for high school',
    'gpa improvement tutoring',
    'free diagnostic tutoring session',
  ],
  applicationName: 'CheggTutor',
  authors: [{ name: 'CheggTutor' }],
  creator: 'CheggTutor',
  publisher: 'CheggTutor',
  category: 'education',
  metadataBase: new URL('https://cheggtutor.com'),
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'CheggTutor | 1:1 Tutoring for Grades, SAT, ACT and AP Success',
    description:
      '1:1 tutoring that improves grades, SAT/ACT scores, and AP outcomes.',
    siteName: 'CheggTutor',
    url: 'https://cheggtutor.com/',
    type: 'website',
    locale: 'en',
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
    title: 'CheggTutor | Online Tutoring for GPA, SAT, ACT and AP',
    description:
      'Short plans, expert tutors, and measurable grade gains.',
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
