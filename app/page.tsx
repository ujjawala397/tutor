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

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
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
  )
}
