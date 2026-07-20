'use client'

import { motion } from 'framer-motion'
import { BookOpen, Target, Users, FileText, CheckCircle, Trophy } from 'lucide-react'

export function LearningJourney() {
  const journey = [
    {
      step: 1,
      title: 'Book Demo',
      desc: 'Schedule your free demo class',
      icon: BookOpen,
      color: 'from-blue-400 to-blue-600',
    },
    {
      step: 2,
      title: 'Assessment Test',
      desc: 'Evaluate current knowledge level',
      icon: Target,
      color: 'from-purple-400 to-purple-600',
    },
    {
      step: 3,
      title: 'Meet Expert Tutor',
      desc: 'Connect with your dedicated tutor',
      icon: Users,
      color: 'from-pink-400 to-pink-600',
    },
    {
      step: 4,
      title: 'Learning Plan',
      desc: 'Personalized study roadmap created',
      icon: FileText,
      color: 'from-cyan-400 to-cyan-600',
    },
    {
      step: 5,
      title: 'Weekly Reports',
      desc: 'Track progress with detailed feedback',
      icon: CheckCircle,
      color: 'from-green-400 to-green-600',
    },
    {
      step: 6,
      title: 'Excellent Results',
      desc: 'Achieve academic excellence',
      icon: Trophy,
      color: 'from-amber-400 to-amber-600',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
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
            Your{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
              Learning Journey
            </span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Simple, structured path to academic success
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Desktop Timeline */}
          <div className="hidden md:grid grid-cols-6 gap-4">
            {journey.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center group"
                >
                  {/* Number Circle */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotateZ: 5 }}
                    className="relative w-20 h-20 mb-6"
                  >
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-xl relative z-10 cursor-pointer`}
                    >
                      <span className="text-white font-display font-bold text-xl">
                        {item.step}
                      </span>
                    </div>
                    {/* Pulse effect */}
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${item.color} opacity-0`}
                    />
                  </motion.div>

                  {/* Connector line */}
                  {index < journey.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[110%] w-full h-1 bg-gradient-to-r from-primary to-transparent" />
                  )}

                  {/* Content */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="text-center space-y-2 p-4 rounded-xl bg-white/95 text-slate-900 backdrop-blur-sm border border-slate-200/80 shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:border-primary/30 transition-all group-hover:shadow-lg w-full"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="flex justify-center mb-2"
                    >
                      <Icon size={24} className="text-primary" />
                    </motion.div>
                    <h3 className="font-semibold text-slate-900 text-sm font-display">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600">{item.desc}</p>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-6">
            {journey.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg text-white font-bold`}
                    >
                      {item.step}
                    </div>
                    {index < journey.length - 1 && (
                      <div className="w-1 h-12 bg-gradient-to-b from-primary to-accent" />
                    )}
                  </div>

                  <div className="flex-1 pt-2 pb-8">
                    <h3 className="font-semibold text-lg text-slate-900 font-display">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
