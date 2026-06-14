"use client";

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Clock, ArrowRight, IndianRupee } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Service } from '@/lib/types/database';

const categories = [
  { id: 'all', label: 'All Services' },
  { id: 'bridal', label: 'Bridal' },
  { id: 'hair', label: 'Hair' },
  { id: 'skin', label: 'Skin' },
  { id: 'nail', label: 'Nail' },
  { id: 'package', label: 'Packages' },
  { id: 'jewellery', label: 'Jewellery' },
];

const fallbackServices: Service[] = [
  {
    id: '1',
    name: 'Bridal Makeup',
    slug: 'bridal-makeup',
    description: 'Complete bridal transformation including HD makeup, hair styling, draping, and accessories consultation.',
    short_description: 'Complete bridal transformation',
    image_url: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg',
    price: 25000,
    discounted_price: null,
    duration_minutes: 180,
    category: 'bridal',
    is_active: true,
    is_featured: true,
    display_order: 1,
    created_at: '',
    updated_at: '',
  },
  {
    id: '2',
    name: 'HD Makeup',
    slug: 'hd-makeup',
    description: 'High-definition makeup for flawless, camera-ready looks.',
    short_description: 'Flawless HD camera-ready makeup',
    image_url: 'https://images.pexels.com/photos/2961737/pexels-photo-2961737.jpeg',
    price: 18000,
    discounted_price: null,
    duration_minutes: 120,
    category: 'bridal',
    is_active: true,
    is_featured: true,
    display_order: 2,
    created_at: '',
    updated_at: '',
  },
  {
    id: '3',
    name: 'Hair Styling',
    slug: 'hair-styling',
    description: 'Professional hair styling including blowouts, updos, and trendy cuts.',
    short_description: 'Professional hair styling',
    image_url: 'https://images.pexels.com/photos/1521797/pexels-photo-1521797.jpeg',
    price: 2500,
    discounted_price: null,
    duration_minutes: 60,
    category: 'hair',
    is_active: true,
    is_featured: true,
    display_order: 3,
    created_at: '',
    updated_at: '',
  },
  {
    id: '4',
    name: 'Facial Treatments',
    slug: 'facial-treatments',
    description: 'Luxury facial treatments for glowing skin.',
    short_description: 'Luxury facial for glowing skin',
    image_url: 'https://images.pexels.com/photos/3757946/pexels-photo-3757946.jpeg',
    price: 4000,
    discounted_price: null,
    duration_minutes: 60,
    category: 'skin',
    is_active: true,
    is_featured: true,
    display_order: 4,
    created_at: '',
    updated_at: '',
  },
  {
    id: '5',
    name: 'Nail Art',
    slug: 'nail-art',
    description: 'Creative nail art designs from minimal to elaborate patterns.',
    short_description: 'Creative nail art designs',
    image_url: 'https://images.pexels.com/photos/3997990/pexels-photo-3997990.jpeg',
    price: 500,
    discounted_price: null,
    duration_minutes: 30,
    category: 'nail',
    is_active: true,
    is_featured: true,
    display_order: 5,
    created_at: '',
    updated_at: '',
  },
  {
    id: '6',
    name: 'Designer Bridal Jewellery on Rent',
    slug: 'bridal-jewellery-rent',
    description: 'Exquisite designer bridal jewellery collection available on rent.',
    short_description: 'Premium bridal jewellery on rent',
    image_url: 'https://images.pexels.com/photos/2961676/pexels-photo-2961676.jpeg',
    price: 15000,
    discounted_price: null,
    duration_minutes: 60,
    category: 'jewellery',
    is_active: true,
    is_featured: true,
    display_order: 6,
    created_at: '',
    updated_at: '',
  },
];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('all');
  const [services, setServices] = useState<Service[]>(fallbackServices);

  useEffect(() => {
    const fetchServices = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (data && data.length > 0) {
        setServices(data);
      }
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
    <section id="services" className="py-20 lg:py-28 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block px-4 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-sm font-medium mb-4"
          >
            Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Premium Beauty <span className="text-brand-gold">Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground"
          >
            From bridal transformations to everyday glamour, discover our range of
            expertly crafted beauty services.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? 'default' : 'outline'}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full ${
                activeCategory === cat.id
                  ? 'gold-gradient text-white'
                  : 'bg-transparent'
              }`}
            >
              {cat.label}
            </Button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.slice(0, 6).map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="group"
            >
              <Link href={`/services/${service.slug}`}>
                <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  {/* Image */}
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

                  {/* Content */}
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="font-playfair text-xl font-semibold text-foreground mb-2 group-hover:text-brand-gold transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-2">
                      {service.short_description || service.description}
                    </p>

                    {/* Price & Duration */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4 text-brand-gold" />
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

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="group"
          >
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
