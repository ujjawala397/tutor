'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export function Tutors() {
  const tutors = [
    {
      name: 'Dr. Priya Sharma',
      subjects: 'Mathematics, Physics',
      experience: '12 years',
      rating: 4.9,
      students: 450,
      initials: 'PS',
      bg: 'from-blue-400 to-blue-600',
    },
    {
      name: 'Amit Verma',
      subjects: 'Computer Science, Python',
      experience: '8 years',
      rating: 4.8,
      students: 320,
      initials: 'AV',
      bg: 'from-purple-400 to-purple-600',
    },
    {
      name: 'Prof. Neha Singh',
      subjects: 'Chemistry, Biology',
      experience: '10 years',
      rating: 4.9,
      students: 380,
      initials: 'NS',
      bg: 'from-green-400 to-green-600',
    },
    {
      name: 'Rajesh Kumar',
      subjects: 'AI, Web Development',
      experience: '7 years',
      rating: 4.7,
      students: 290,
      initials: 'RK',
      bg: 'from-pink-400 to-pink-600',
    },
    {
      name: 'Ms. Anjali Patel',
      subjects: 'English, Social Studies',
      experience: '9 years',
      rating: 4.8,
      students: 410,
      initials: 'AP',
      bg: 'from-cyan-400 to-cyan-600',
    },
    {
      name: 'Dr. Vikram Malhotra',
      subjects: 'Advanced Math, Coding',
      experience: '15 years',
      rating: 4.9,
      students: 520,
      initials: 'VM',
      bg: 'from-amber-400 to-amber-600',
    },
  ]

  const duplicatedTutors = [...tutors, ...tutors]

  return (
    <section id="tutors" className="py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Meet Our <span className="gradient-text">Expert Tutors</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Highly qualified professionals dedicated to your success
          </p>
        </motion.div>

        {/* Tutors Carousel */}
        <div className="overflow-hidden rounded-3xl   p-4">
          <motion.div
            
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 15,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'loop',
            }}
            className="flex w-max gap-6"
          >
            {duplicatedTutors.map((tutor, index) => (
              <motion.div
                key={`${tutor.name}-${index}`}
                whileHover={{ y: -8, scale: 1.01 }}
                className="group w-[280px] shrink-0"
              >
                <div className="h-full rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] overflow-hidden hover:border-primary/50 transition-all duration-300 relative">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/5 to-secondary/5" />

                  <div className="relative z-10 p-8 pb-6">
                    <div className="flex items-end gap-4">
                      <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${tutor.bg} flex items-center justify-center shadow-lg text-white font-bold text-2xl font-display`}>
                        {tutor.initials}
                      </div>

                      <div className="flex items-center gap-1 px-3 py-1 bg-amber-100 rounded-lg">
                        <Star size={16} className="text-amber-600 fill-amber-600" />
                        <span className="font-semibold text-amber-600 text-sm">{tutor.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 px-8 py-4 space-y-3">
                    <h3 className="text-xl font-display font-bold text-foreground">
                      {tutor.name}
                    </h3>
                    <div className="h-px bg-gradient-to-r from-primary/30 to-transparent" />
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-foreground/70">
                        <span className="font-semibold text-foreground">{tutor.experience}</span>
                        <span>teaching experience</span>
                      </div>
                      <p className="text-foreground/70 font-medium">{tutor.subjects}</p>
                      <p className="text-foreground/60 text-xs">{tutor.students}+ students taught</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
