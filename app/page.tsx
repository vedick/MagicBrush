"use client";

import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { MissionSection } from '@/components/sections/mission-section';
import { ServicesSection } from '@/components/sections/services-section';
import { SubscriptionSection } from '@/components/sections/subscription-section';
import { ReviewsSection } from '@/components/sections/reviews-section';
import { GallerySection } from '@/components/sections/gallery-section';
import { ContactSection } from '@/components/sections/contact-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <MissionSection />
      <ServicesSection />
      <SubscriptionSection />
      <GallerySection />
      <ReviewsSection />
      <ContactSection />
    </>
  );
}
