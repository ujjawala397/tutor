'use client'

import { motion } from 'framer-motion'
import { Medal, Sparkles, Award, Rocket } from 'lucide-react'

export function Achievements() {
  const achievements = [
    {
      icon: Medal,
      title: 'Olympiad Winners',
      desc: '45+ students qualified for national olympiads',
      color: 'from-gold-400 to-yellow-600',
    },
    {
      icon: Rocket,
      title: 'Coding Competition',
      desc: '120+ students won coding competitions nationwide',
      color: 'from-purple-400 to-purple-600',
    },
    {
      icon: Sparkles,
      title: 'Science Fair',
      desc: '85+ students showcased award-winning projects',
      color: 'from-pink-400 to-pink-600',
    },
    {
      icon: Award,
      title: 'AI Hackathon',
      desc: '60+ students participated in AI innovation events',
      color: 'from-cyan-400 to-cyan-600',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-slate-100">
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
            Our{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Celebrating the remarkable accomplishments of our students
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -12, scale: 1.05 }}
                className="group"
              >
                <div className="h-full relative rounded-2xl p-8 bg-white/95 text-slate-900 backdrop-blur-xl border border-slate-200/80 shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:border-primary/50 transition-all group-hover:shadow-2xl group-hover:shadow-primary/20 overflow-hidden text-center"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/5 to-secondary/5" />

                  <div className="relative z-10 space-y-4">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.3, rotate: 15 }}
                      className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto shadow-lg"
                    >
                      <Icon size={32} className="text-white" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-lg font-display font-bold text-slate-900">
                      {achievement.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {achievement.desc}
                    </p>

                    {/* Decorative dots */}
                    <div className="flex justify-center gap-1 pt-2">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ delay: i * 0.2, duration: 1.5, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-primary"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
