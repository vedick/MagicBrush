import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and Conditions for Magic Brush by Kavita Virmani - Read our terms of service and booking policies.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-24 px-4 bg-background">
      <div className="container max-w-4xl mx-auto">
        <h1 className="font-playfair text-4xl font-bold text-foreground mb-8">
          Terms & <span className="text-brand-gold">Conditions</span>
        </h1>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: January 2026
          </p>

          <section className="mb-8">
            <h2 className="font-playfair text-2xl font-semibold text-foreground mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms and Conditions constitute a legally binding agreement between you and Magic Brush by Kavita Virmani concerning your access to and use of our website and services. By accessing our services, you agree to be bound by these terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-playfair text-2xl font-semibold text-foreground mb-4">2. Booking Policy</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Appointments must be booked in advance through our website or by phone.</li>
              <li>A deposit may be required for certain services to confirm your booking.</li>
              <li>Please arrive 10 minutes before your scheduled appointment time.</li>
              <li>Late arrivals may result in reduced service time or rescheduling.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-playfair text-2xl font-semibold text-foreground mb-4">3. Cancellation Policy</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Cancellations made 48 hours or more before appointment: Full refund or reschedule.</li>
              <li>Cancellations within 24-48 hours: 50% of service amount charged.</li>
              <li>No-shows or same-day cancellations: Full service amount charged.</li>
              <li>Bridal packages require 7 days notice for cancellation.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-playfair text-2xl font-semibold text-foreground mb-4">4. Payment Terms</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>We accept cash, credit/debit cards, and UPI payments.</li>
              <li>Prices are subject to change without notice.</li>
              <li>Memberships are non-transferable and non-refundable.</li>
              <li>Packages must be used within the validity period.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-playfair text-2xl font-semibold text-foreground mb-4">5. Service Guarantee</h2>
            <p className="text-muted-foreground leading-relaxed">
              We strive to provide the highest quality services. If you are unsatisfied with your service, please inform us within 24 hours and we will work to address your concerns. Re-services or adjustments must be scheduled within 7 days of the original appointment.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-playfair text-2xl font-semibold text-foreground mb-4">6. Health & Safety</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Inform us of any allergies, skin conditions, or health concerns before treatment.</li>
              <li>Patch tests are recommended for hair coloring and certain treatments.</li>
              <li>We reserve the right to refuse service if we believe it may cause harm.</li>
              <li>All equipment and surfaces are sanitized between clients.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-playfair text-2xl font-semibold text-foreground mb-4">7. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              Magic Brush by Kavita Virmani shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of our services. Our liability is limited to the amount paid for the specific service in question.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-playfair text-2xl font-semibold text-foreground mb-4">8. Contact Information</h2>
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="font-semibold">Magic Brush by Kavita Virmani</p>
              <p className="text-muted-foreground">Email: contact@magicbrush.in</p>
              <p className="text-muted-foreground">Phone: +91 98765 43210</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
