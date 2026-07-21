'use client'

import { motion } from 'framer-motion'
import { Star, Calendar } from 'lucide-react'

export function Tutors() {
  const tutors = [
    {
      name: 'Dr. Priya Sharma',
      subjects: 'Mathematics, Physics',
      experience: '12 years',
      rating: 4.9,
      students: 450,
      languages: 'English, Hindi',
      initials: 'PS',
      bg: 'from-blue-400 to-blue-600',
    },
    {
      name: 'Amit Verma',
      subjects: 'Computer Science, Python',
      experience: '8 years',
      rating: 4.8,
      students: 320,
      languages: 'English, Hindi',
      initials: 'AV',
      bg: 'from-purple-400 to-purple-600',
    },
    {
      name: 'Prof. Neha Singh',
      subjects: 'Chemistry, Biology',
      experience: '10 years',
      rating: 4.9,
      students: 380,
      languages: 'English, Hindi',
      initials: 'NS',
      bg: 'from-green-400 to-green-600',
    },
    {
      name: 'Rajesh Kumar',
      subjects: 'AI, Web Development',
      experience: '7 years',
      rating: 4.7,
      students: 290,
      languages: 'English, Hindi',
      initials: 'RK',
      bg: 'from-pink-400 to-pink-600',
    },
    {
      name: 'Ms. Anjali Patel',
      subjects: 'English, Social Studies',
      experience: '9 years',
      rating: 4.8,
      students: 410,
      languages: 'English, Gujarati',
      initials: 'AP',
      bg: 'from-cyan-400 to-cyan-600',
    },
    {
      name: 'Dr. Vikram Malhotra',
      subjects: 'Advanced Math, Coding',
      experience: '15 years',
      rating: 4.9,
      students: 520,
      languages: 'English, Hindi',
      initials: 'VM',
      bg: 'from-amber-400 to-amber-600',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="tutors" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Meet Our <span className="gradient-text">Expert Tutors</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Highly qualified professionals dedicated to your success
          </p>
        </motion.div>

        {/* Tutors Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {tutors.map((tutor, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="h-full rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] overflow-hidden hover:border-primary/50 transition-all duration-300 relative"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/5 to-secondary/5" />

                {/* Header with avatar */}
                <div className="relative z-10 p-8 pb-6">
                  <div className="flex items-end gap-4">
                    {/* Avatar */}
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      className={`w-20 h-20 rounded-xl bg-gradient-to-br ${tutor.bg} flex items-center justify-center shadow-lg text-white font-bold text-2xl font-display`}
                    >
                      {tutor.initials}
                    </motion.div>

                    {/* Quick Rating */}
                    <div className="flex items-center gap-1 px-3 py-1 bg-amber-100 rounded-lg">
                      <Star size={16} className="text-amber-600 fill-amber-600" />
                      <span className="font-semibold text-amber-600 text-sm">{tutor.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 px-8 py-4 space-y-3">
                  {/* Name */}
                  <h3 className="text-xl font-display font-bold text-foreground">
                    {tutor.name}
                  </h3>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-primary/30 to-transparent" />

                  {/* Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-foreground/70">
                      <span className="font-semibold text-foreground">{tutor.experience}</span>
                      <span>teaching experience</span>
                    </div>
                    <p className="text-foreground/70 font-medium">{tutor.subjects}</p>
                    <p className="text-foreground/60 text-xs">{tutor.students}+ students taught</p>
                    <p className="text-foreground/60 text-xs">Speaks: {tutor.languages}</p>
                  </div>

                  {/* Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar size={16} />
                    Book Session
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
