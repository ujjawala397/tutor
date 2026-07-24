'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Courses', id: 'courses' },
    { name: 'Tutors', id: 'tutors' },
    { name: 'Reviews', id: 'reviews' },
    { name: 'FAQ', id: 'faq' },
  ]

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
    setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg text-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20">
          {/* Logo */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('home')}
            className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center space-x-2 cursor-pointer min-w-0"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-display font-bold text-base sm:text-xl text-slate-100 truncate">
              CheggTutor
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.name}
                type="button"
                whileHover={{ color: '#4f46e5' }}
                onClick={() => scrollToSection(link.id)}
                className="text-slate-300 hover:text-cyan-300 transition-colors text-sm font-medium"
              >
                {link.name}
              </motion.button>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
            onClick={() =>
              document.getElementById("book-demo")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
            >
            Book Demo
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-100"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden pb-4 space-y-3"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left px-4 py-2 text-slate-300 hover:text-cyan-300 hover:bg-white/10 rounded-lg transition-all"
              >
                {link.name}
              </button>
            ))}
            <button 
              className="w-full px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium"
              onClick={() =>
                document.getElementById("book-demo")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              >
              Book Demo
            </button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
