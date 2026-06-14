"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedCounter } from '@/components/animated-counter';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Award, Users, Scissors, Heart } from 'lucide-react';

const stats = [
  { icon: Users, number: 5000, suffix: '+', label: 'Happy Clients' },
  { icon: Scissors, number: 20, suffix: '+', label: 'Services Offered' },
  { icon: Award, number: 15, suffix: '+', label: 'Years Experience' },
  { icon: Heart, number: 98, suffix: '%', label: 'Satisfaction Rate' },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-20 lg:py-28 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/3766183/pexels-photo-3766183.jpeg"
                  alt="Kavita Virmani - Founder of Magic Brush"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
              </div>

              {/* Salon Interior */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute -bottom-8 -right-8 w-48 h-48 rounded-xl overflow-hidden shadow-xl border-4 border-white"
              >
                <img
                  src="https://images.pexels.com/photos/3757946/pexels-photo-3757946.jpeg"
                  alt="Salon Interior"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Experience Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="absolute -top-6 -left-6 gold-gradient rounded-2xl p-6 shadow-xl"
              >
                <p className="text-4xl font-bold text-white">15+</p>
                <p className="text-white/80 text-sm">Years of Excellence</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Section Label */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="inline-block px-4 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-sm font-medium mb-4"
            >
              About Us
            </motion.span>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            >
              Where Beauty Meets{' '}
              <span className="text-brand-gold">Luxury</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground text-lg leading-relaxed mb-6"
            >
              Magic Brush by Kavita Virmani is a premium beauty destination in Dehradun
              offering professional salon services, bridal makeovers, beauty consultations,
              and designer bridal jewellery rentals.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground leading-relaxed mb-8"
            >
              We believe beauty is confidence and every client deserves a personalized
              luxury experience. Our team of certified professionals uses premium products
              and cutting-edge techniques to deliver exceptional results.
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {['Certified Professionals', 'Premium Products', 'Hygienic Environment', 'Personalized Care'].map((feature) => (
                <span
                  key={feature}
                  className="flex items-center gap-2 px-4 py-2 bg-background rounded-full text-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-brand-gold" />
                  {feature}
                </span>
              ))}
            </motion.div>

            {/* CTA */}
            <Button
              asChild
              size="lg"
              className="gold-gradient text-white hover:opacity-90"
            >
              <Link href="/#services">Discover Our Services</Link>
            </Button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="text-center p-6 bg-background rounded-xl shadow-sm"
            >
              <stat.icon className="w-8 h-8 text-brand-gold mx-auto mb-3" />
              <p className="text-3xl lg:text-4xl font-bold text-foreground mb-1">
                <AnimatedCounter target={stat.number} suffix={stat.suffix} />
              </p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
