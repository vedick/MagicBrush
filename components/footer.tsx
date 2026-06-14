"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About Us' },
  { href: '/#services', label: 'Services' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#gallery', label: 'Gallery' },
  { href: '/#contact', label: 'Contact' },
];

const legalLinks = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/refund-policy', label: 'Refund Policy' },
  { href: '/shipping-policy', label: 'Shipping Policy' },
  { href: '/cancellation-policy', label: 'Cancellation Policy' },
];

const services = [
  { href: '/services/bridal-makeup', label: 'Bridal Makeup' },
  { href: '/services/hair-styling', label: 'Hair Styling' },
  { href: '/services/facial-treatments', label: 'Facial Treatments' },
  { href: '/services/nail-art', label: 'Nail Art' },
  { href: '/services/bridal-jewellery-rent', label: 'Bridal Jewellery' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-brand-charcoal text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h3 className="font-playfair text-2xl font-bold">
                Magic <span className="text-gold">Brush</span>
              </h3>
              <p className="text-xs text-gray-400 mt-1">by Kavita Virmani</p>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Premium luxury beauty destination in Dehradun offering professional salon services,
              bridal makeovers, and designer bridal jewellery rentals.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/magicbrushdehradun"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/magicbrushdehradun"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@magicbrushdehradun"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4 text-brand-gold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-brand-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4 text-brand-gold">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-gray-300 hover:text-brand-gold transition-colors text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-playfair text-lg font-semibold text-brand-gold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm">
                  Magic Brush by Kavita Virmani<br />
                  Rajpur Road, Dehradun<br />
                  Uttarakhand, India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <a href="tel:+919876543210" className="text-gray-300 hover:text-brand-gold transition-colors text-sm">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <a href="mailto:contact@magicbrush.in" className="text-gray-300 hover:text-brand-gold transition-colors text-sm">
                  contact@magicbrush.in
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  Mon - Sun: 10:00 AM - 8:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 mt-10 pt-10">
          <div className="max-w-xl mx-auto text-center">
            <h4 className="font-playfair text-xl font-semibold mb-2">Subscribe to Our Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Get exclusive offers, beauty tips, and updates directly in your inbox.</p>
            {subscribed ? (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-brand-gold"
              >
                Thank you for subscribing!
              </motion.p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-brand-gold"
                />
                <Button type="submit" className="gold-gradient text-white px-4">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-10 pt-6 border-t border-white/10">
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-400 hover:text-brand-gold text-xs transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black/30 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Magic Brush by Kavita Virmani. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
