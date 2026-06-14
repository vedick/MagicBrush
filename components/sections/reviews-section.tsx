"use client";

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Review, Profile } from '@/lib/types/database';

interface FallbackReview extends Review {
  profiles: { full_name: string | null } | null;
}

interface ReviewWithUser extends Omit<Review, 'profiles'> {
  profiles: { full_name: string | null; avatar_url?: string | null } | null;
}

const fallbackReviews: FallbackReview[] = [
  {
    id: '1',
    user_id: '1',
    service_id: '1',
    booking_id: null,
    rating: 5,
    title: 'Amazing Bridal Makeup!',
    comment: 'Kavita and her team did an absolutely stunning job with my bridal makeup. The quality was exceptional and I felt like a princess on my special day.',
    is_verified: true,
    is_approved: true,
    is_featured: true,
    response: null,
    responded_at: null,
    created_at: '2024-01-15',
    updated_at: '2024-01-15',
    profiles: { full_name: 'Priya Sharma' },
  },
  {
    id: '2',
    user_id: '2',
    service_id: '2',
    booking_id: null,
    rating: 5,
    title: 'Best Salon in Dehradun',
    comment: 'I have been going to Magic Brush for over 2 years now. The staff is professional and the services are top-notch. Highly recommended!',
    is_verified: true,
    is_approved: true,
    is_featured: true,
    response: null,
    responded_at: null,
    created_at: '2024-02-10',
    updated_at: '2024-02-10',
    profiles: { full_name: 'Anjali Verma' },
  },
  {
    id: '3',
    user_id: '3',
    service_id: '3',
    booking_id: null,
    rating: 5,
    title: 'Wonderful Experience',
    comment: 'Got my hair styled for my engagement. The stylist understood exactly what I wanted and delivered beyond expectations. Will definitely come back!',
    is_verified: true,
    is_approved: true,
    is_featured: true,
    response: null,
    responded_at: null,
    created_at: '2024-03-05',
    updated_at: '2024-03-05',
    profiles: { full_name: 'Meera Kapoor' },
  },
];

export function ReviewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [reviews, setReviews] = useState<FallbackReview[]>(fallbackReviews);

  useEffect(() => {
    const fetchReviews = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('reviews')
        .select('*, profiles!reviews_user_id_fkey(full_name, avatar_url)')
        .eq('is_approved', true)
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (data && data.length > 0) {
        setReviews(data as FallbackReview[]);
      }
    };
    fetchReviews();
  }, []);

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block px-4 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-sm font-medium mb-4"
          >
            Client Reviews
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            What Our <span className="text-brand-gold">Clients</span> Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground"
          >
            Don&apos;t just take our word for it - hear from our happy clients who
            have experienced our premium services.
          </motion.p>
        </div>

        {/* Rating Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center items-center gap-8 mb-12 p-6 bg-card rounded-2xl shadow-sm max-w-xl mx-auto"
        >
          <div className="text-center">
            <p className="text-5xl font-bold text-foreground">4.9</p>
            <div className="flex justify-center mt-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-brand-gold fill-brand-gold"
                />
              ))}
            </div>
            <p className="text-muted-foreground text-sm mt-1">500+ reviews</p>
          </div>
          <div className="h-20 w-px bg-border hidden sm:block" />
          <div className="text-center">
            <p className="text-5xl font-bold text-foreground">5000+</p>
            <p className="text-muted-foreground text-sm mt-1">Happy Clients</p>
          </div>
          <div className="h-20 w-px bg-border hidden sm:block" />
          <div className="text-center">
            <p className="text-5xl font-bold text-foreground">98%</p>
            <p className="text-muted-foreground text-sm mt-1">Satisfaction Rate</p>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="group"
            >
              <div className="bg-card rounded-2xl p-6 h-full border border-border hover:shadow-lg transition-shadow relative">
                {/* Quote Icon */}
                <Quote className="absolute top-4 right-4 w-8 h-8 text-brand-gold/20" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i <= review.rating
                          ? 'text-brand-gold fill-brand-gold'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Title */}
                <h3 className="font-semibold text-foreground mb-2">{review.title}</h3>

                {/* Comment */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {review.comment}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t">
                  <div className="w-10 h-10 rounded-full bg-brand-pink flex items-center justify-center">
                    <span className="text-brand-charcoal font-semibold">
                      {review.profiles?.full_name?.[0] || 'A'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {review.profiles?.full_name || 'Anonymous'}
                    </p>
                    <p className="text-xs text-muted-foreground">Verified Client</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
