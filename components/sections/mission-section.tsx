"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Eye, Sparkles, Heart } from 'lucide-react';

const cards = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'Deliver world-class beauty services while creating unforgettable experiences for every client. We strive to enhance natural beauty through expert care, premium products, and personalized attention.',
    color: 'bg-brand-gold',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description: 'Become the most trusted luxury beauty and bridal destination in Uttarakhand. We aim to set new standards in beauty care through innovation, excellence, and unwavering commitment to client satisfaction.',
    color: 'bg-brand-pink',
  },
];

export function MissionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="mission" className="py-20 lg:py-28 bg-background" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block px-4 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-sm font-medium mb-4"
          >
            Mission & Vision
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Our Purpose & <span className="text-brand-gold">Passion</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground"
          >
            Driven by excellence, defined by passion - we are committed to transforming
            beauty experiences into lasting memories.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.2 }}
              className="group relative"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 ${card.color} opacity-5 rounded-2xl group-hover:opacity-10 transition-opacity`} />

              {/* Card */}
              <div className="relative bg-card border rounded-2xl p-8 h-full hover:shadow-xl transition-shadow">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-16 h-16 ${card.color} rounded-xl flex items-center justify-center mb-6`}
                >
                  <card.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {card.description}
                </p>

                {/* Decorative Line */}
                <div className={`mt-6 h-1 w-16 ${card.color} rounded-full`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-16 pt-12 border-t"
        >
          <h3 className="font-playfair text-2xl font-bold text-center text-foreground mb-8">
            Our Core Values
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Sparkles, label: 'Excellence' },
              { icon: Heart, label: 'Care & Comfort' },
              { icon: Target, label: 'Innovation' },
              { icon: Eye, label: 'Transparency' },
            ].map((value, index) => (
              <motion.div
                key={value.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex flex-col items-center gap-3 p-4 bg-muted/50 rounded-xl"
              >
                <value.icon className="w-6 h-6 text-brand-gold" />
                <span className="text-sm font-medium text-foreground">{value.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
