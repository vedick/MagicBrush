"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { Service } from '@/lib/types/database';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Services' },
  { id: 'bridal', label: 'Bridal' },
  { id: 'hair', label: 'Hair' },
  { id: 'skin', label: 'Skin' },
  { id: 'nail', label: 'Nail' },
  { id: 'package', label: 'Packages' },
  { id: 'jewellery', label: 'Jewellery' },
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      if (data) setServices(data);
      setLoading(false);
    };
    fetchServices();
  }, []);

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter((s) => s.category === activeCategory);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen py-24 px-4 bg-background">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-sm font-medium mb-4"
          >
            Our Services
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Premium <span className="text-brand-gold">Beauty Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Discover our comprehensive range of beauty services, from bridal transformations to everyday glam.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? 'default' : 'outline'}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full ${
                activeCategory === cat.id ? 'gold-gradient text-white' : 'bg-transparent'
              }`}
            >
              {cat.label}
            </Button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="group"
            >
              <Link href={`/book?service=${service.slug}`}>
                <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col border">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image_url || 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg'}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    {service.is_featured && (
                      <span className="absolute top-4 left-4 px-3 py-1 bg-brand-gold text-white text-xs rounded-full">
                        Popular
                      </span>
                    )}
                    <span className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full capitalize">
                      {service.category}
                    </span>
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="font-playfair text-xl font-semibold text-foreground mb-2 group-hover:text-brand-gold transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-2">
                      {service.short_description || service.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        {service.discounted_price ? (
                          <>
                            <span className="text-sm line-through text-muted-foreground mr-2">
                              {formatPrice(service.price)}
                            </span>
                            <span className="text-lg font-bold text-foreground">
                              {formatPrice(service.discounted_price)}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-foreground">
                            {formatPrice(service.price)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{service.duration_minutes} min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <Button
            asChild
            size="lg"
            className="gold-gradient text-white hover:opacity-90"
          >
            <Link href="/book">
              Book Your Appointment
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
