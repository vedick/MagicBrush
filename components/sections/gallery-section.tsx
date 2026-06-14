"use client";

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { GalleryImage } from '@/lib/types/database';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'bridal', label: 'Bridal' },
  { id: 'hair', label: 'Hair' },
  { id: 'nail', label: 'Nail' },
  { id: 'transformation', label: 'Transformations' },
  { id: 'jewellery', label: 'Jewellery' },
];

const fallbackImages: GalleryImage[] = [
  {
    id: '1',
    title: 'Bridal Look',
    description: 'Stunning bridal makeup',
    image_url: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg',
    thumbnail_url: null,
    category: 'bridal',
    is_featured: true,
    display_order: 1,
    created_at: '',
  },
  {
    id: '2',
    title: 'Hair Styling',
    description: 'Elegant hair styling',
    image_url: 'https://images.pexels.com/photos/1521797/pexels-photo-1521797.jpeg',
    thumbnail_url: null,
    category: 'hair',
    is_featured: true,
    display_order: 2,
    created_at: '',
  },
  {
    id: '3',
    title: 'Nail Art',
    description: 'Creative nail designs',
    image_url: 'https://images.pexels.com/photos/3997990/pexels-photo-3997990.jpeg',
    thumbnail_url: null,
    category: 'nail',
    is_featured: true,
    display_order: 3,
    created_at: '',
  },
  {
    id: '4',
    title: 'Bridal Jewellery',
    description: 'Designer bridal jewellery',
    image_url: 'https://images.pexels.com/photos/2961676/pexels-photo-2961676.jpeg',
    thumbnail_url: null,
    category: 'jewellery',
    is_featured: true,
    display_order: 4,
    created_at: '',
  },
  {
    id: '5',
    title: 'Party Makeup',
    description: 'Glamorous party look',
    image_url: 'https://images.pexels.com/photos/2961737/pexels-photo-2961737.jpeg',
    thumbnail_url: null,
    category: 'bridal',
    is_featured: true,
    display_order: 5,
    created_at: '',
  },
  {
    id: '6',
    title: 'Salon Interior',
    description: 'Our luxury salon',
    image_url: 'https://images.pexels.com/photos/3757946/pexels-photo-3757946.jpeg',
    thumbnail_url: null,
    category: 'transformation',
    is_featured: true,
    display_order: 6,
    created_at: '',
  },
];

export function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('all');
  const [images, setImages] = useState<GalleryImage[]>(fallbackImages);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('gallery')
        .select('*')
        .order('display_order', { ascending: true });

      if (data && data.length > 0) {
        setImages(data);
      }
    };
    fetchImages();
  }, []);

  const filteredImages = activeCategory === 'all'
    ? images
    : images.filter((img) => img.category === activeCategory);

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block px-4 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-sm font-medium mb-4"
          >
            Our Gallery
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Our <span className="text-brand-gold">Work</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground"
          >
            Explore our portfolio of stunning transformations and creative artistry.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full ${
                activeCategory === cat.id ? 'gold-gradient text-white' : 'bg-transparent'
              }`}
            >
              {cat.label}
            </Button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="break-inside-avoid group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={image.image_url}
                  alt={image.title || 'Gallery Image'}
                  className="w-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-semibold">{image.title}</p>
                  <p className="text-white/80 text-sm">{image.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/10"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6" />
          </Button>
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={selectedImage.image_url}
            alt={selectedImage.title || 'Gallery Image'}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </motion.div>
      )}
    </section>
  );
}
