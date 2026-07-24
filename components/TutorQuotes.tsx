'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

export function TutorQuotes() {
  const quotes = [
    {
      text: 'Our mission is to build confidence, curiosity, and lifelong learning.',
      author: 'Dr. Priya Sharma',
      initials: 'PS',
      bg: 'from-blue-400 to-blue-600',
    },
    {
      text: "We don't just improve grades—we help students love learning.",
      author: 'Amit Verma',
      initials: 'AV',
      bg: 'from-purple-400 to-purple-600',
    },
    {
      text: 'Our AI and coding curriculum prepares students for the future.',
      author: 'Rajesh Kumar',
      initials: 'RK',
      bg: 'from-pink-400 to-pink-600',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-slate-100">
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
            What Our{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
              Tutors Say
            </span>
          </h2>
        </motion.div>

        {/* Quotes Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="h-full relative rounded-2xl p-8 bg-white/95 text-slate-900 backdrop-blur-xl border border-slate-200/80 shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:border-primary/50 transition-all group-hover:shadow-2xl group-hover:shadow-primary/20 overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/5 to-secondary/5" />

                <div className="relative z-10 space-y-4">
                  {/* Quote Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
                  >
                    <Quote size={24} className="text-white" />
                  </motion.div>

                  {/* Quote Text */}
                  <p className="text-lg font-medium italic text-slate-700 leading-relaxed">
                    "{quote.text}"
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-primary/30 to-transparent" />

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-2">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${quote.bg} flex items-center justify-center text-white font-bold text-sm font-display`}
                    >
                      {quote.initials}
                    </motion.div>
                    <div>
                      <p className="font-semibold text-slate-900">{quote.author}</p>
                      <p className="text-xs text-slate-600">Expert Tutor</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
