'use client'

import { motion, type Variants } from 'framer-motion'
import { ArrowRight, Star, Users, Award, TrendingUp } from 'lucide-react'
import Image from "next/image";
import { useRouter } from "next/navigation";


export function Hero() {
  const router = useRouter();
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' as const },
    },
  }

  const trustBadges = [
    { icon: Star, label: '4.9 Parent Rating', value: '⭐' },
    { icon: Users, label: '10,000+ Students', value: '👥' },
    { icon: Award, label: '200+ Expert Tutors', value: '🎓' },
    { icon: TrendingUp, label: '98% Success Rate', value: '📈' },
  ]

  return (
    <section
      id="home"
      className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex items-center"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        {/* Left Content */}
        <div className="space-y-8">
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight"
              variants={itemVariants}
            >
              Empowering Students to Excel in{' '}
              <span className="gradient-text">School and Technology</span>
            </motion.h1>

            <motion.p
              className="text-lg text-foreground/70 leading-relaxed"
              variants={itemVariants}
            >
              Expert tutors for Grades 3–12 specializing in Mathematics, Science,
              Computer Programming, Artificial Intelligence, and academic excellence.
            </motion.p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2"
              onClick={() => router.push("/#book-demo")}
            >
              Book FREE Demo
              <ArrowRight size={20} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-all"
              onClick={() =>
              document.getElementById("courses")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
            >
              Explore Courses
            </motion.button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-4 pt-8"
          >
            {trustBadges.map((badge, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20"
              >
                <span className="text-2xl">{badge.value}</span>
                <div>
                  <p className="font-semibold text-foreground text-sm">{badge.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right - Illustration */}
        <motion.div
  variants={itemVariants}
  className="relative flex items-center justify-center w-full h-[420px] sm:h-[520px] md:h-[620px] lg:h-[720px]"
>
  <Image
    src="/images/banner1.png"
    alt="Elite Tutoring Banner"
    fill
    priority
    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"
    className="object-contain object-[center_-100px]"
  />
</motion.div>
        
      </motion.div>
    </section>
  )
}
