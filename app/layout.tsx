import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/components/auth-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { FloatingButtons } from '@/components/floating-buttons';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  metadataBase: new URL('https://magicbrush.in'),
  title: {
    default: 'Magic Brush by Kavita Virmani | Premium Unisex Salon in Dehradun',
    template: '%s | Magic Brush by Kavita Virmani',
  },
  description: 'Magic Brush by Kavita Virmani - Premium luxury unisex salon in Dehradun offering bridal makeup, hair styling, skin care, nail services, and designer bridal jewellery on rent. Book your appointment today!',
  keywords: [
    'Best Unisex Salon in Dehradun',
    'Bridal Makeup Artist in Dehradun',
    'Luxury Salon in Dehradun',
    'Bridal Jewellery on Rent in Dehradun',
    'Makeup Artist in Dehradun',
    'Beauty Salon Near Me',
    'Hair Salon Dehradun',
    'Beauty Parlor Dehradun',
    'Bridal Makeup Dehradun',
    'HD Makeup Dehradun',
  ],
  authors: [{ name: 'Kavita Virmani' }],
  creator: 'Kavita Virmani',
  publisher: 'Magic Brush by Kavita Virmani',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://magicbrush.in',
    siteName: 'Magic Brush by Kavita Virmani',
    title: 'Magic Brush by Kavita Virmani | Premium Unisex Salon in Dehradun',
    description: 'Premium luxury unisex salon in Dehradun offering bridal makeup, hair styling, skin care, nail services, and designer bridal jewellery on rent.',
    images: [
      {
        url: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg',
        width: 1200,
        height: 630,
        alt: 'Magic Brush by Kavita Virmani - Premium Salon in Dehradun',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@magicbrushdehradun',
    creator: '@magicbrushdehradun',
    title: 'Magic Brush by Kavita Virmani | Premium Unisex Salon in Dehradun',
    description: 'Premium luxury unisex salon in Dehradun offering bridal makeup, hair styling, and more.',
    images: ['https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg'],
  },
  alternates: {
    canonical: 'https://magicbrush.in',
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BeautySalon',
              name: 'Magic Brush by Kavita Virmani',
              image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg',
              '@id': 'https://magicbrush.in',
              url: 'https://magicbrush.in',
              telephone: '+91-9876543210',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Rajpur Road',
                addressLocality: 'Dehradun',
                addressRegion: 'Uttarakhand',
                postalCode: '248001',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 30.3165,
                longitude: 78.0322,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                  opens: '10:00',
                  closes: '20:00',
                },
              ],
              priceRange: '₹₹₹',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '500',
              },
              sameAs: [
                'https://instagram.com/magicbrushdehradun',
                'https://facebook.com/magicbrushdehradun',
                'https://youtube.com/@magicbrushdehradun',
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-poppins antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <FloatingButtons />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
