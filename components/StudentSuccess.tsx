'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Users, Trophy, TrendingUp, Smile } from 'lucide-react'

function Counter({ end, suffix, duration }: { end: number; suffix: string; duration: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = end / (duration * 100)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 10)
    return () => clearInterval(timer)
  }, [end, duration])

  return <span>{count}{suffix}</span>
}

export function StudentSuccess() {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const stats = [
    { icon: Users, value: 10000, label: 'Students', suffix: '+' },
    { icon: Trophy, value: 500, label: 'Projects Completed', suffix: '+' },
    { icon: TrendingUp, value: 98, label: 'Improved Grades', suffix: '%' },
    { icon: Smile, value: 95, label: 'Parent Satisfaction', suffix: '%' },
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section ref={ref} className="py-14 px-4 sm:px-6 lg:px-8">
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
            Our <span className="gradient-text">Success Numbers</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Proven results from students and parents across the globe
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="h-full relative rounded-2xl p-8 bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl border border-white/20 hover:border-primary/50 transition-all group-hover:shadow-2xl group-hover:shadow-primary/20 overflow-hidden text-center"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/5 to-secondary/5" />

                  <div className="relative z-10 space-y-4">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto shadow-lg"
                    >
                      <Icon size={32} className="text-white" />
                    </motion.div>

                    {/* Counter */}
                    <div className="pt-4">
                      <div className="text-5xl lg:text-6xl font-display font-bold gradient-text">
                        {inView && (
                          <Counter
                            end={stat.value}
                            duration={2.5}
                            suffix={stat.suffix}
                          />
                        )}
                      </div>
                    </div>

                    {/* Label */}
                    <h3 className="text-lg font-semibold text-foreground">{stat.label}</h3>

                    {/* Decorative line */}
                    <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary mx-auto opacity-0 group-hover:opacity-100 transition-opacity" />
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
