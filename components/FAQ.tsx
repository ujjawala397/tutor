'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'How are tutors selected?',
      answer:
        'Our tutors undergo rigorous screening including background checks, qualification verification, and teaching demonstrations. We only select the top 5% of applicants who meet our quality standards.',
    },
    {
      question: 'Can I change tutors?',
      answer:
        'Yes! If you&apos;re not satisfied with your tutor within the first 2 sessions, we&apos;ll assign you a different tutor at no additional cost.',
    },
    {
      question: 'Do you provide online classes?',
      answer:
        'Absolutely! We offer online, offline, and hybrid classes. You can choose the mode that works best for you and switch anytime.',
    },
    {
      question: 'How are progress reports shared?',
      answer:
        'We send detailed progress reports every week via email and our mobile app. Reports include performance metrics, strengths, areas for improvement, and personalized recommendations.',
    },
    {
      question: 'How much does it cost?',
      answer:
        'Our pricing is flexible and depends on the subject, tutor experience, and class frequency. Contact us for a personalized quote after the demo class.',
    },
    {
      question: 'What subjects do you teach?',
      answer:
        'We teach Mathematics, Physics, Chemistry, Biology, Computer Science, Python, Java, Web Development, AI/ML, and many more. Check our courses section for the complete list.',
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-slate-100">
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
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-lg text-slate-300">
            Find answers to common questions about our tutoring services
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full relative rounded-xl border border-slate-200/80 bg-white/95 text-slate-900 backdrop-blur-xl p-6 text-left hover:border-primary/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/5 to-secondary/5" />

                <div className="relative z-10 flex justify-between items-center">
                  <h3 className="text-lg font-display font-semibold text-slate-900 pr-6">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-6 h-6 text-primary"
                  >
                    <ChevronDown size={24} />
                  </motion.div>
                </div>
              </motion.button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative overflow-hidden"
                  >
                    <div className="mt-0 rounded-b-xl border border-t-0 border-slate-200/80 bg-white/95 text-slate-700 backdrop-blur-xl p-6">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
        </motion.div>
      </div>
    </section>
  )
}
