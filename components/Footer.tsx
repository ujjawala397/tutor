"use client";

import { motion } from "framer-motion";
import { Mail, Share2, Heart, Link, Globe } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: ["About Us", "Blog", "Careers", "Press"],
    Courses: ["Mathematics", "Science", "Programming", "AI/ML"],
    Resources: [
      "Student Guide",
      "Parent Guide",
      "Study Materials",
      "Success Stories",
    ],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Contact"],
  };

  const socialLinks = [
    { icon: Share2, label: "Facebook", href: "#" },
    { icon: Heart, label: "Twitter", href: "#" },
    { icon: Link, label: "LinkedIn", href: "#" },
    { icon: Globe, label: "Website", href: "#" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-slate-100 border-t border-slate-800/80">
      {/* Newsletter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        
      </motion.div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="font-display font-bold text-lg text-slate-100">
                  Elite Tutoring
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm">
                Empowering students to excel in school and technology through
                expert guidance and personalized learning.
              </p>

              {/* Social Links */}
              <div className="flex gap-3 pt-4">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={index}
                      href={link.href}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                    >
                      <Icon size={18} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links], colIndex) => (
            <motion.div key={category} variants={itemVariants}>
              <h4 className="font-semibold text-slate-100 mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      whileHover={{ x: 5 }}
                      href="#"
                      className="text-slate-300 hover:text-cyan-300 transition-colors text-sm"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 mb-8" />

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400"
        >
          <p>
            &copy; {currentYear} Elite Tutoring Academy. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>

      {/* Floating CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        viewport={{ once: true }}
        className="fixed bottom-8 right-8 z-40 hidden lg:block"
      >
        <motion.a
          href="https://wa.me/919412131680"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all"
        >
          <Mail size={24} />
        </motion.a>
      </motion.div>
    </footer>
  );
}
