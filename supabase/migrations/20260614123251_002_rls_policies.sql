-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles policies
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_admin_all" ON profiles FOR ALL
  TO authenticated USING (is_admin());

-- Services policies (publicly readable)
CREATE POLICY "services_select_public" ON services FOR SELECT
  TO public USING (is_active = TRUE OR is_admin());

CREATE POLICY "services_admin_all" ON services FOR ALL
  TO authenticated USING (is_admin());

-- Staff policies
CREATE POLICY "staff_select_public" ON staff FOR SELECT
  TO public USING (is_active = TRUE OR is_admin());

CREATE POLICY "staff_admin_all" ON staff FOR ALL
  TO authenticated USING (is_admin());

-- Bookings policies
CREATE POLICY "bookings_select_own" ON bookings FOR SELECT
  TO authenticated USING (auth.uid() = user_id OR is_admin());

CREATE POLICY "bookings_insert_own" ON bookings FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "bookings_update_own" ON bookings FOR UPDATE
  TO authenticated USING (auth.uid() = user_id OR is_admin())
  WITH CHECK (auth.uid() = user_id OR is_admin());

CREATE POLICY "bookings_admin_all" ON bookings FOR ALL
  TO authenticated USING (is_admin());

-- Reviews policies
CREATE POLICY "reviews_select_approved" ON reviews FOR SELECT
  TO public USING (is_approved = TRUE OR auth.uid() = user_id OR is_admin());

CREATE POLICY "reviews_insert_verified" ON reviews FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "reviews_update_own" ON reviews FOR UPDATE
  TO authenticated USING (auth.uid() = user_id OR is_admin())
  WITH CHECK (auth.uid() = user_id OR is_admin());

CREATE POLICY "reviews_admin_all" ON reviews FOR ALL
  TO authenticated USING (is_admin());

-- Membership plans (publicly readable)
CREATE POLICY "plans_select_public" ON membership_plans FOR SELECT
  TO public USING (is_active = TRUE OR is_admin());

CREATE POLICY "plans_admin_all" ON membership_plans FOR ALL
  TO authenticated USING (is_admin());

-- Gallery (publicly readable)
CREATE POLICY "gallery_select_public" ON gallery FOR SELECT
  TO public USING (TRUE);

CREATE POLICY "gallery_admin_all" ON gallery FOR ALL
  TO authenticated USING (is_admin());

-- Notifications policies
CREATE POLICY "notifications_select_own" ON notifications FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "notifications_update_own" ON notifications FOR UPDATE
  TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "notifications_admin_insert" ON notifications FOR INSERT
  TO authenticated WITH CHECK (is_admin());

-- Contact submissions
CREATE POLICY "contact_insert_public" ON contact_submissions FOR INSERT
  TO public WITH CHECK (TRUE);

CREATE POLICY "contact_admin_all" ON contact_submissions FOR ALL
  TO authenticated USING (is_admin());

-- Price packages (publicly readable)
CREATE POLICY "packages_select_public" ON price_packages FOR SELECT
  TO public USING (is_active = TRUE OR is_admin());

CREATE POLICY "packages_admin_all" ON price_packages FOR ALL
  TO authenticated USING (is_admin());

-- Coupons (publicly readable for valid codes)
CREATE POLICY "coupons_select_public" ON coupons FOR SELECT
  TO public USING (is_active = TRUE AND (valid_until IS NULL OR valid_until > NOW()));

CREATE POLICY "coupons_admin_all" ON coupons FOR ALL
  TO authenticated USING (is_admin());

-- Blog posts (published readable)
CREATE POLICY "blog_select_published" ON blog_posts FOR SELECT
  TO public USING (is_published = TRUE OR is_admin());

CREATE POLICY "blog_admin_all" ON blog_posts FOR ALL
  TO authenticated USING (is_admin());

-- FAQs (publicly readable)
CREATE POLICY "faqs_select_public" ON faqs FOR SELECT
  TO public USING (is_active = TRUE);

CREATE POLICY "faqs_admin_all" ON faqs FOR ALL
  TO authenticated USING (is_admin());

-- Site settings (publicly readable)
CREATE POLICY "settings_select_public" ON site_settings FOR SELECT
  TO public USING (TRUE);

CREATE POLICY "settings_admin_all" ON site_settings FOR ALL
  TO authenticated USING (is_admin());
