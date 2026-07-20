'use client'

import { motion } from 'framer-motion'

export function FloatingElements() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Animated gradient blobs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-0 -left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
          delay: 2,
        }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/15 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
          delay: 4,
        }}
        className="absolute top-1/2 right-1/4 w-72 h-72 bg-accent/15 rounded-full blur-3xl"
      />

      {/* Floating particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.sin(i) * 30, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute w-2 h-2 rounded-full ${
            i % 2 === 0
              ? 'bg-primary/30'
              : i % 3 === 0
                ? 'bg-secondary/30'
                : 'bg-accent/30'
          }`}
          style={{
            left: `${(i * 12.5) + 5}%`,
            top: `${(i * 12.5) + 10}%`,
          }}
        />
      ))}

      {/* Grid background */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(79,70,229,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(79,70,229,0.03)_1px,transparent_1px)]"
        style={{
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  )
}
