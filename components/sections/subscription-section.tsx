"use client";

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Check, Crown, Star, Diamond } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { MembershipPlan } from '@/lib/types/database';

const fallbackPlans: MembershipPlan[] = [
  {
    id: '1',
    name: 'silver',
    display_name: 'Silver Membership',
    price: 999,
    duration_months: 12,
    discount_percentage: 5,
    features: ['5% off on all services', 'Birthday month special offer', 'Priority booking access', 'Exclusive member newsletters'],
    is_active: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: '2',
    name: 'gold',
    display_name: 'Gold Membership',
    price: 1999,
    duration_months: 12,
    discount_percentage: 10,
    features: ['10% off on all services', 'Birthday month special offer', 'Premium customer support', 'Special event access', 'Quarterly free facial'],
    is_active: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: '3',
    name: 'platinum',
    display_name: 'Platinum Membership',
    price: 2999,
    duration_months: 12,
    discount_percentage: 15,
    features: ['15% off on all services', 'VIP priority booking', 'Monthly complimentary service', 'Exclusive event invitations', 'Dedicated beauty consultant', 'Free bridal consultation'],
    is_active: true,
    created_at: '',
    updated_at: '',
  },
];

const icons = {
  silver: Star,
  gold: Crown,
  platinum: Diamond,
};

export function SubscriptionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [plans, setPlans] = useState<MembershipPlan[]>(fallbackPlans);

  useEffect(() => {
    const fetchPlans = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('membership_plans')
        .select('*')
        .eq('is_active', true)
        .order('price', { ascending: true });

      if (data && data.length > 0) {
        setPlans(data);
      }
    };
    fetchPlans();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="subscription" className="py-20 lg:py-28 bg-background" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block px-4 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-sm font-medium mb-4"
          >
            Membership Plans
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Exclusive <span className="text-brand-gold">Membership</span> Benefits
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground"
          >
            Join our exclusive membership program and enjoy premium benefits,
            discounts, and priority services throughout the year.
          </motion.p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = icons[plan.name as keyof typeof icons] || Star;
            const isPopular = plan.name === 'gold';

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`relative ${isPopular ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 gold-gradient text-white text-sm rounded-full shadow-lg z-10">
                    Most Popular
                  </div>
                )}

                {/* Card */}
                <div
                  className={`bg-card rounded-2xl p-8 h-full border ${
                    isPopular ? 'border-brand-gold shadow-xl' : 'border-border'
                  } hover:shadow-lg transition-shadow`}
                >
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${
                      isPopular ? 'gold-gradient' : 'bg-brand-pink'
                    }`}
                  >
                    <Icon className={`w-8 h-8 ${isPopular ? 'text-white' : 'text-brand-gold'}`} />
                  </div>

                  {/* Name */}
                  <h3 className="font-playfair text-2xl font-bold text-foreground mb-2">
                    {plan.display_name}
                  </h3>

                  {/* Discount Badge */}
                  <div className="inline-block px-3 py-1 bg-brand-gold/10 text-brand-gold text-sm rounded-full mb-4">
                    {plan.discount_percentage}% Discount
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground">
                      {formatPrice(plan.price)}
                    </span>
                    <span className="text-muted-foreground">/{plan.duration_months} months</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {(plan.features as string[]).map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    className={`w-full ${
                      isPopular
                        ? 'gold-gradient text-white hover:opacity-90'
                        : 'bg-brand-pink text-brand-charcoal hover:bg-brand-pink/80'
                    }`}
                  >
                    Get Started
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
