'use client';

import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const footerLinks = {
    about: [
      { label: 'About PWC Davao', href: '#' },
      { label: 'Mission & Vision', href: '#' },
      { label: 'History', href: '#' },
      { label: 'Accreditation', href: '#' },
    ],
    academics: [
      { label: 'Senior High School', href: '#' },
      { label: 'College Programs', href: '#' },
      { label: 'Graduate School', href: '#' },
      { label: 'Online Learning', href: '#' },
    ],
    admissions: [
      { label: 'How to Apply', href: '#' },
      { label: 'Requirements', href: '#' },
      { label: 'Tuition & Fees', href: '#' },
      { label: 'Scholarships', href: '#' },
    ],
    resources: [
      { label: 'Student Portal', href: '#' },
      { label: 'Library', href: '#' },
      { label: 'Campus Map', href: '#' },
      { label: 'Academic Calendar', href: '#' },
    ],
  };

  const contactInfo = [
    {
      icon: MapPin,
      text: 'University Avenue, juna subdivision, davao city, davao del sur, philippines 8000',
    },
    {
      icon: Phone,
      text: '(082) 297 8035',
    },
    {
      icon: Mail,
      text: 'info@pwc.edu.ph',
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          
          {/* About Section */}
          <div className="lg:col-span-2">
            <h3 className="text-red-700 text-2xl font-bold mb-4">
              PWC Davao
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Philippine Women's College of Davao - Empowering women through quality education since 1945.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-3 text-gray-600 text-sm">
                    <Icon className="w-4 h-4 mt-0.5 text-red-700 flex-shrink-0" />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* About Links */}
          <div>
            <h4 className="text-gray-900 font-bold mb-4">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 4 }}
                    className="text-gray-600 text-sm hover:text-red-700 transition-colors inline-block"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Academics Links */}
          <div>
            <h4 className="text-gray-900 font-bold mb-4">Academics</h4>
            <ul className="space-y-2">
              {footerLinks.academics.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 4 }}
                    className="text-gray-600 text-sm hover:text-red-700 transition-colors inline-block"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Admissions Links */}
          <div>
            <h4 className="text-gray-900 font-bold mb-4">Admissions</h4>
            <ul className="space-y-2">
              {footerLinks.admissions.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 4 }}
                    className="text-gray-600 text-sm hover:text-red-700 transition-colors inline-block"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-gray-900 font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 4 }}
                    className="text-gray-600 text-sm hover:text-red-700 transition-colors inline-block"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <p className="text-gray-600 text-sm">
              © 2025 Philippine Women's College of Davao. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-red-700 hover:text-white hover:border-red-700 transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}