-- Insert default services
INSERT INTO services (name, slug, description, short_description, price, duration_minutes, category, is_featured) VALUES
('Bridal Makeup', 'bridal-makeup', 'Complete bridal transformation including HD makeup, hair styling, draping, and accessories consultation. Our signature service for your special day.', 'Complete bridal transformation with HD makeup', 25000, 180, 'bridal', true),
('HD Makeup', 'hd-makeup', 'High-definition makeup for flawless, camera-ready looks. Perfect for weddings, photoshoots, and special occasions.', 'Flawless HD camera-ready makeup', 18000, 120, 'bridal', true),
('Airbrush Makeup', 'airbrush-makeup', 'Long-lasting, lightweight airbrush makeup for a naturally flawless finish. Ideal for humid weather and long events.', 'Long-lasting airbrush finish', 22000, 150, 'bridal', true),
('Engagement Makeup', 'engagement-makeup', 'Elegant engagement look with subtle glamor. Includes makeup and hairstyling.', 'Elegant engagement look', 15000, 120, 'bridal', false),
('Party Makeup', 'party-makeup', 'Glamorous party-ready makeup for celebrations and events.', 'Glamorous party-ready look', 8000, 90, 'bridal', true),
('Hair Styling', 'hair-styling', 'Professional hair styling including blowouts, updos, curls, and trendy cuts.', 'Professional hair styling', 2500, 60, 'hair', true),
('Hair Spa', 'hair-spa', 'Deep conditioning and relaxation hair spa treatment for damaged hair.', 'Deep conditioning hair spa', 3500, 45, 'hair', false),
('Hair Coloring', 'hair-coloring', 'Premium hair coloring services including global, highlights, and balayage.', 'Professional hair coloring', 5000, 180, 'hair', true),
('Keratin Treatment', 'keratin-treatment', 'Professional keratin treatment for frizz-free, smooth hair that lasts months.', 'Frizz-free smooth hair', 8000, 240, 'hair', true),
('Smoothening', 'smoothening', 'Hair smoothening treatment for manageable, silky-smooth hair.', 'Silky-smooth manageable hair', 7000, 180, 'hair', false),
('Facial Treatments', 'facial-treatments', 'Luxury facial treatments including gold, diamond, and organic options for glowing skin.', 'Luxury facial for glowing skin', 4000, 60, 'skin', true),
('Cleanup', 'cleanup', 'Express cleanup including cleansing, scrubbing, and toning.', 'Express skin cleanup', 1500, 30, 'skin', false),
('Waxing', 'waxing', 'Full body waxing services using premium Rica wax for smooth, hair-free skin.', 'Premium full body waxing', 2000, 45, 'skin', false),
('Threading', 'threading', 'Precise eyebrow and facial threading for defined features.', 'Precise facial threading', 300, 15, 'skin', false),
('Manicure', 'manicure', 'Luxury manicure including nail shaping, cuticle care, and hand massage.', 'Luxury hand care treatment', 1500, 45, 'nail', false),
('Pedicure', 'pedicure', 'Spa pedicure with foot soak, exfoliation, and nail care.', 'Relaxing spa pedicure', 2000, 60, 'nail', false),
('Nail Extensions', 'nail-extensions', 'Professional nail extensions in acrylic or gel options.', 'Professional nail extensions', 4500, 90, 'nail', true),
('Nail Art', 'nail-art', 'Creative nail art designs from minimal to elaborate patterns.', 'Creative nail art designs', 500, 30, 'nail', true),
('Pre-Bridal Package', 'pre-bridal-package', 'Complete pre-bridal care package including multiple sessions of facial, cleanup, waxing, and grooming treatments.', 'Complete pre-bridal care', 35000, 180, 'package', true),
('Designer Bridal Jewellery on Rent', 'bridal-jewellery-rent', 'Exquisite designer bridal jewellery collection available on rent. Includes traditional and contemporary sets for the complete bridal look.', 'Premium bridal jewellery on rent', 15000, 1, 'jewellery', true);

-- Insert default FAQs
INSERT INTO faqs (question, answer, category, display_order) VALUES
('How far in advance should I book for bridal makeup?', 'We recommend booking at least 2-3 months in advance for bridal services, especially during wedding season. This ensures availability and allows time for a trial session.', 'Booking', 1),
('Do you offer home services?', 'Yes, we offer home services for bridal makeup and certain other services within Dehradun. Additional charges apply based on distance.', 'Services', 2),
('What brands of makeup products do you use?', 'We use premium international brands including MAC, Huda Beauty, Charlotte Tilbury, and Bobbi Brown for best results.', 'Products', 3),
('Can I customize my bridal package?', 'Absolutely! We offer fully customizable packages based on your requirements. Please contact us for a personalized quote.', 'Packages', 4),
('What is your cancellation policy?', 'Cancellations made 48 hours before appointment receive full refund. Cancellations within 24 hours are charged 50% of service amount.', 'Booking', 5),
('Do you offer any membership benefits?', 'Yes, we offer Silver, Gold, and Platinum memberships with exclusive discounts, priority booking, and special offers.', 'Membership', 6);

-- Insert default site settings
INSERT INTO site_settings (key, value, value_json) VALUES
('business_name', 'Magic Brush by Kavita Virmani', NULL),
('business_tagline', 'Enhancing Beauty With Elegance & Perfection', NULL),
('business_phone', '+91-9876543210', NULL),
('business_email', 'contact@magicbrush.in', NULL),
('business_address', 'Magic Brush by Kavita Virmani, Rajpur Road, Dehradun, Uttarakhand, India', NULL),
('business_hours', 'Monday to Sunday: 10:00 AM to 8:00 PM', NULL),
('whatsapp_number', '919876543210', NULL),
('instagram_url', 'https://instagram.com/magicbrushdehradun', NULL),
('facebook_url', 'https://facebook.com/magicbrushdehradun', NULL),
('youtube_url', 'https://youtube.com/@magicbrushdehradun', NULL),
('hero_title', 'Enhancing Beauty With Elegance & Perfection', NULL),
('hero_subtitle', 'Premium salon experiences crafted by expert beauty professionals', NULL),
('about_text', 'Magic Brush by Kavita Virmani is a premium beauty destination in Dehradun offering professional salon services, bridal makeovers, beauty consultations and designer bridal jewellery rentals. We believe beauty is confidence and every client deserves a personalized luxury experience.', NULL),
('mission_text', 'Deliver world-class beauty services while creating unforgettable experiences for every client.', NULL),
('vision_text', 'Become the most trusted luxury beauty and bridal destination in Uttarakhand.', NULL);
