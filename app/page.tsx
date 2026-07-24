'use client'

import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { Courses } from '@/components/Courses'
import { LearningJourney } from '@/components/LearningJourney'
import { Tutors } from '@/components/Tutors'
import { TutorQuotes } from '@/components/TutorQuotes'
import { StudentSuccess } from '@/components/StudentSuccess'
import { StudentReviews } from '@/components/StudentReviews'
import { Achievements } from '@/components/Achievements'
import { DemoBooking } from '@/components/DemoBooking'
import { FAQ } from '@/components/FAQ'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { FloatingElements } from '@/components/FloatingElements'

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'EducationalOrganization',
      name: 'CheggTutor',
      url: 'https://cheggtutor.com/',
      description:
        'CheggTutor provides online tutoring for students in Grades 3-10 with expert instruction in Maths, Science, Coding, and AI.',
      areaServed: 'IN',
      sameAs: ['https://cheggtutor.com/'],
      serviceType: ['Online Tutoring', 'Maths Tutoring', 'Science Tutoring', 'Coding Classes'],
      audienceType: 'Students in Grades 3-10',
    },
    {
      '@type': 'WebSite',
      name: 'CheggTutor',
      url: 'https://cheggtutor.com/',
      description:
        'Personalized online tutoring platform helping students build confidence and improve academic performance in Grades 3-10.',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://cheggtutor.com/#courses',
        'query-input': 'required name=q',
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen overflow-hidden bg-background" itemScope itemType="https://schema.org/WebSite">
        <FloatingElements />
        <Navbar />
        <Hero />
        <LearningJourney />
        <Courses />
        <WhyChooseUs />
        <Tutors />
        <TutorQuotes />
        <StudentSuccess />
        <StudentReviews />
        <Achievements />
        <DemoBooking />
        <FAQ />
        {/* <Contact /> */}
        <Footer />
      </main>
    </>
  )
}
