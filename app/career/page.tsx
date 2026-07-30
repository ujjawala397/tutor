'use client'

import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Megaphone, ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const jobs = [
  {
    title: 'Tutor',
    icon: GraduationCap,
    location: 'Remote',
    type: 'Part-Time',
    summary: 'Teach students with clear, outcome-focused lessons.',
    applyLink: 'https://forms.gle/EnC6981PwasPeKMTA',
  },
  {
    title: 'Sales Specialist',
    icon: Briefcase,
    location: 'Remote',
    type: 'Part-Time',
    summary: 'Guide parents and convert demo calls into enrollments.',
    applyLink: 'https://forms.gle/hqSSH5PN2Tshe1c66',
  },
  {
    title: 'Lead Generation Specialist',
    icon: Megaphone,
    location: 'Remote',
    type: 'Part-Time',
    summary: 'Build high-quality lead pipelines across channels.',
    applyLink: 'https://forms.gle/pJzFZBL1rgExs7ATA',
  },
]

export default function CareerPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-display font-bold sm:text-5xl">
              Build Careers That Improve Grades
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/70 sm:text-lg">
              Join our team and help students achieve better academic outcomes.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job, index) => {
              const Icon = job.icon
              return (
                <motion.article
                  key={job.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:border-primary/50"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
                    <Icon size={24} />
                  </div>

                  <h2 className="text-xl font-display font-bold text-slate-900">
                    {job.title}
                  </h2>

                  <p className="mt-1 text-sm font-semibold text-primary">
                    {job.type} · {job.location}
                  </p>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {job.summary}
                  </p>

                  <a
                    href={job.applyLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Apply Now
                    <ArrowRight size={16} />
                  </a>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
