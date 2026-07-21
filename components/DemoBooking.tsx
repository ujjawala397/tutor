'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { CheckCircle } from 'lucide-react'

type FormData = {
  studentName: string
  parentName: string
  phone: string
  email: string
  grade: string
  board: string
  subject: string
  time: string
  mode: string
  message: string
}

export function DemoBooking() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      reset()
    }, 3000)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section id="book-demo" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
              Book Your <span className="gradient-text">FREE Demo Class</span>
            </h2>
            <p className="text-lg text-foreground/60">
              Fill the form below and our team will contact you within 24 hours
            </p>
          </motion.div>

          {/* Form Card */}
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] overflow-hidden p-8 lg:p-12"
          >
          {/* Background gradient on hover */}
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/5 to-secondary/5" />

          {/* Success Message */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center bg-white z-50 rounded-2xl"
            >
              <div className="text-center space-y-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  <CheckCircle size={64} className="text-green-500 mx-auto" />
                </motion.div>
                <h3 className="text-2xl font-display font-bold text-foreground">
                  Demo Booked Successfully!
                </h3>
                <p className="text-foreground/70">
                  We'll contact you soon with confirmation details.
                </p>
              </div>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Student Name *
                </label>
                <input
                  {...register('studentName', { required: 'Student name is required' })}
                  type="text"
                  placeholder="Enter student name"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-primary focus:outline-none transition-all"
                />
                {errors.studentName && (
                  <span className="text-red-500 text-sm">{errors.studentName.message}</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Parent Name *
                </label>
                <input
                  {...register('parentName', { required: 'Parent name is required' })}
                  type="text"
                  placeholder="Enter parent name"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-primary focus:outline-none transition-all"
                />
                {errors.parentName && (
                  <span className="text-red-500 text-sm">{errors.parentName.message}</span>
                )}
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Phone Number *
                </label>
                <input
                  {...register('phone', { required: 'Phone is required' })}
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-primary focus:outline-none transition-all"
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">{errors.phone.message}</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email Address *
                </label>
                <input
                  {...register('email', { required: 'Email is required' })}
                  type="email"
                  placeholder="Enter email"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-primary focus:outline-none transition-all"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email.message}</span>
                )}
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Grade *</label>
                <select
                  {...register('grade', { required: 'Grade is required' })}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-primary focus:outline-none transition-all"
                >
                  <option value="">Select Grade</option>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 3} value={`Grade ${i + 3}`}>
                      Grade {i + 3}
                    </option>
                  ))}
                </select>
                {errors.grade && (
                  <span className="text-red-500 text-sm">{errors.grade.message}</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Board *</label>
                <select
                  {...register('board', { required: 'Board is required' })}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-primary focus:outline-none transition-all"
                >
                  <option value="">Select Board</option>
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                  <option value="State Board">State Board</option>
                </select>
                {errors.board && (
                  <span className="text-red-500 text-sm">{errors.board.message}</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Subject Interested *
                </label>
                <select
                  {...register('subject', { required: 'Subject is required' })}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-primary focus:outline-none transition-all"
                >
                  <option value="">Select Subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="Programming">Programming</option>
                  <option value="AI">Artificial Intelligence</option>
                </select>
                {errors.subject && (
                  <span className="text-red-500 text-sm">{errors.subject.message}</span>
                )}
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Preferred Time *
                </label>
                <input
                  {...register('time', { required: 'Time is required' })}
                  type="text"
                  placeholder="e.g., 5:00 PM - 6:00 PM"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-primary focus:outline-none transition-all"
                />
                {errors.time && (
                  <span className="text-red-500 text-sm">{errors.time.message}</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Mode *</label>
                <div className="flex gap-4">
                  {['Online', 'Offline', 'Hybrid'].map((m) => (
                    <label key={m} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={m}
                        {...register('mode', { required: 'Mode is required' })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium text-foreground">{m}</span>
                    </label>
                  ))}
                </div>
                {errors.mode && (
                  <span className="text-red-500 text-sm">{errors.mode.message}</span>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Additional Message
              </label>
              <textarea
                {...register('message')}
                placeholder="Any additional information or questions..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-primary focus:outline-none transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold font-display text-lg shadow-lg hover:shadow-2xl transition-all"
              onClick={() => {
                  document.getElementById("book-demo")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
              Book FREE Demo Class
            </motion.button>
          </form>
          </motion.div>
        
      </div>
    </section>
  )
}
