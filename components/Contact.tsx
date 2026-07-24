"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

export function Contact() {
  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9412131680",
      href: "tel:+919412131680",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@tutoring.com",
      href: "mailto:info@tutoring.com",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+91 9412131680",
      href: "https://wa.me/919412131680",
      color: "from-green-400 to-green-600",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "123 Education Street, Delhi 110001",
      href: "#",
      color: "from-pink-400 to-pink-600",
    },
  ];

  const hours = [
    { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
    { day: "Saturday", time: "10:00 AM - 4:00 PM" },
    { day: "Sunday", time: "Closed" },
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="contact" className="py-14 px-4 sm:px-6 lg:px-8">
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
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you. Contact us today!
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-10">
          {/* Contact Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={index}
                  href={info.href}
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <div className="h-full relative rounded-2xl p-8 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] border border-slate-200 hover:border-primary/50 transition-all group-hover:shadow-2xl group-hover:shadow-primary/20 overflow-hidden cursor-pointer">
                    {/* Background gradient on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/5 to-secondary/5" />

                    <div className="relative z-10 space-y-3">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center shadow-lg`}
                      >
                        <Icon size={28} className="text-white" />
                      </motion.div>

                      {/* Label */}
                      <h3 className="font-semibold text-lg text-foreground">
                        {info.label}
                      </h3>

                      {/* Value */}
                      <p className="text-foreground/70 font-medium break-all">
                        {info.value}
                      </p>

                      {/* Arrow */}
                      <div className="w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </div>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>

          {/* Working Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="h-full relative rounded-2xl p-8 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] border border-slate-200 hover:border-primary/50 transition-all group-hover:shadow-2xl group-hover:shadow-primary/20 overflow-hidden">
              {/* Background gradient on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/5 to-secondary/5" />

              <div className="relative z-10 space-y-6">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg"
                >
                  <Clock size={28} className="text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="font-display font-bold text-2xl text-foreground">
                  Working Hours
                </h3>

                {/* Hours */}
                <div className="space-y-3">
                  {hours.map((hour, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start"
                    >
                      <span className="font-semibold text-foreground">
                        {hour.day}
                      </span>
                      <span className="text-foreground/70 text-sm text-right">
                        {hour.time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Note */}
                <p className="text-sm text-foreground/60 italic pt-4 border-t border-white/20">
                  Demo classes available 7 days a week by appointment
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
