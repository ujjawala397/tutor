'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calculator, Microscope, Code, Cpu, Zap, Trophy } from 'lucide-react'

export function Courses() {
  const courses = [
    {
      icon: Calculator,
      name: 'Mathematics',
      desc: 'Raise math scores in Algebra, Geometry, Calculus',
      ageGroup: 'Grades 3-12',
      color: 'from-blue-400 to-blue-600',
    },
    {
      icon: Microscope,
      name: 'Science',
      desc: 'Boost Physics, Chemistry, Biology grades',
      ageGroup: 'Grades 3-12',
      color: 'from-green-400 to-green-600',
    },
    {
      icon: Code,
      name: 'Computer Science',
      desc: 'Improve CS grades with practical coding',
      ageGroup: 'Grades 3-12',
      color: 'from-purple-400 to-purple-600',
    },
    {
      icon: Cpu,
      name: 'Artificial Intelligence',
      desc: 'Build AI skills with guided projects',
      ageGroup: 'Grades 3-12',
      color: 'from-pink-400 to-pink-600',
    },
    {
      icon: Zap,
      name: 'Python Programming',
      desc: 'Learn Python fast and score higher',
      ageGroup: 'Grades 3-12',
      color: 'from-indigo-400 to-indigo-600',
    },
    {
      icon: Code,
      name: 'Web Development',
      desc: 'Create real apps and strengthen school projects',
      ageGroup: 'Grades 3-12',
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
    <section id="courses" className="py-14 px-4 sm:px-6 lg:px-8">
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
            Our <span className="gradient-text">Grade-Boost Courses</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Short, focused programs that improve marks.
          </p>
        </motion.div>

        {/* Course Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {courses.map((course, index) => {
            const Icon = course.icon
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                className="group h-full"
              >
                <div className="h-full rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] p-8 hover:border-primary/50 transition-all duration-300 overflow-hidden relative"
                >
                  {/* Background gradient */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/5 to-secondary/5" />

                  {/* Content */}
                  <div className="relative z-10 space-y-4">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center shadow-lg mb-2`}
                    >
                      <Icon size={32} className="text-white" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-display font-bold text-foreground">
                      {course.name}
                    </h3>

                    {/* Description */}
                    <p className="text-foreground/70 leading-relaxed">{course.desc}</p>

                    {/* Age Group */}
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-sm font-semibold px-3 py-1 bg-primary/20 text-primary-foreground rounded-full" style={{ background: '#4f46e5', color: '#ffffff' }}>
                        {course.ageGroup}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 my-4" />

                    {/* Enroll Button */}
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all group"
                      onClick={() =>
                        document.getElementById("book-demo")?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        })
                      }
                    >
                      Enroll Now
                      <motion.div
                        group-hover={{ x: 5 }}
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight size={18} />
                      </motion.div>
                    </motion.button>
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
