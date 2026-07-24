'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export function StudentReviews() {
  const reviews = [
    {
      name: 'Arjun Kapoor',
      parentName: 'Mrs. Meera Kapoor',
      rating: 5,
      review: 'Fantastic improvement in my son\'s math scores. The tutors are incredibly patient and dedicated.',
      gradeImprovement: 'B to A',
      marks: 'From 72% to 92%',
      studentInitials: 'AK',
      parentInitials: 'MK',
      bg: 'from-blue-400 to-blue-600',
    },
    {
      name: 'Priya Sharma',
      parentName: 'Mr. Rajiv Sharma',
      rating: 5,
      review: 'The personalized approach and weekly reports have really helped my daughter\'s academic journey.',
      gradeImprovement: 'A- to A+',
      marks: 'From 88% to 96%',
      studentInitials: 'PS',
      parentInitials: 'RS',
      bg: 'from-purple-400 to-purple-600',
    },
    {
      name: 'Ayush Verma',
      parentName: 'Mr. Nitin Verma',
      rating: 5,
      review: 'My son went from struggling with coding to loving it. The instructors are world-class!',
      gradeImprovement: 'C to A',
      marks: 'From 65% to 94%',
      studentInitials: 'AV',
      parentInitials: 'NV',
      bg: 'from-green-400 to-green-600',
    },
    {
      name: 'Ananya Singh',
      parentName: 'Mrs. Priya Singh',
      rating: 5,
      review: 'Highly recommend! The demo class convinced us within minutes. Fantastic platform.',
      gradeImprovement: 'B+ to A+',
      marks: 'From 85% to 98%',
      studentInitials: 'AS',
      parentInitials: 'PS',
      bg: 'from-pink-400 to-pink-600',
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="reviews" className="py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-slate-100">
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
            Student{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Real results from real students and satisfied parents
          </p>
        </motion.div>

        {/* Reviews Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {reviews.map((review, index) => (
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
                  {/* Rating */}
                  <div className="flex gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-700 italic leading-relaxed">
                    "{review.review}"
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-primary/30 to-transparent" />

                  {/* Author Info */}
                  <div className="space-y-3">
                    {/* Student */}
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${review.bg} flex items-center justify-center text-white font-bold text-xs font-display`}
                      >
                        {review.studentInitials}
                      </motion.div>
                      <div>
                        <p className="font-semibold text-sm text-slate-900">{review.name}</p>
                        <p className="text-xs text-slate-600">Student</p>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="flex gap-4 text-xs">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
                        {review.marks}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
                        {review.gradeImprovement}
                      </span>
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
