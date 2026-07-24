'use client'

import { motion } from 'framer-motion'
import {
  Users,
  CheckCircle,
  BarChart3,
  Clock,
  MessageSquare,
  Code,
  Zap,
  Target,
  BookOpen,
  Award,
  Lightbulb,
  Shield,
} from 'lucide-react'

export function WhyChooseUs() {
  const features = [
    { icon: Users, label: 'Personalized Learning' },
    { icon: CheckCircle, label: 'Certified Tutors' },
    { icon: BarChart3, label: 'Weekly Progress Reports' },
    { icon: MessageSquare, label: 'Homework Assistance' },
    { icon: Zap, label: 'Doubt Solving' },
    { icon: Target, label: 'Small Batch Classes' },
    { icon: Award, label: 'One-on-One Tutoring' },
    { icon: Clock, label: 'Flexible Timings' },
    { icon: Code, label: 'AI Learning Modules' },
    { icon: BookOpen, label: 'Coding Projects' },
    { icon: Lightbulb, label: 'Career Guidance' },
    { icon: Shield, label: 'Interactive Quizzes' },
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
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
            Why{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
              Parents Choose Us
            </span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            We provide comprehensive educational services with focus on individual
            growth and excellence
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(79, 70, 229, 0.15)' }}
                className="group relative p-6 rounded-2xl bg-white/95 text-slate-900 border border-slate-200/80 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm hover:border-primary/50 transition-all cursor-pointer overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-lg"
                  >
                    <Icon size={24} className="text-white" />
                  </motion.div>

                  {/* Label */}
                  <h3 className="font-semibold text-slate-900 text-lg">{feature.label}</h3>

                  {/* Decorative line */}
                  <div className="w-0 h-1 bg-gradient-to-r from-primary to-secondary group-hover:w-8 transition-all duration-300 mt-3" />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
