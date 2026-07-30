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
        'We match students with proven subject experts based on grade goals.',
    },
    {
      question: 'Can I change tutors?',
      answer:
        'Yes. Free tutor switch in the first 2 sessions.',
    },
    {
      question: 'Do you offer online tutoring across time zones?',
      answer:
        'Yes. We support global time zones, including after-school slots.',
    },
    {
      question: 'How quickly will we see progress?',
      answer:
        'Most students show clear progress within 4-8 weeks.',
    },
    {
      question: 'Do you support SAT, ACT, and AP prep?',
      answer:
        'Yes. SAT Math, ACT Math, AP, and core school subjects.',
    },
    {
      question: 'Is there a long-term contract?',
      answer:
        'No long-term contract. Continue only if you see progress.',
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
    <section id="faq" className="py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-slate-100">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-lg text-slate-300">
            Quick answers for parents.
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
