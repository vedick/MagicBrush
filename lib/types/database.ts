export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          avatar_url: string | null;
          address: string | null;
          city: string | null;
          pincode: string | null;
          is_admin: boolean;
          is_verified: boolean;
          force_password_change: boolean;
          membership_tier: 'silver' | 'gold' | 'platinum' | null;
          membership_expiry: string | null;
          loyalty_points: number;
          total_spent: number;
          total_savings: number;
          referral_code: string | null;
          referred_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          address?: string | null;
          city?: string | null;
          pincode?: string | null;
          is_admin?: boolean;
          is_verified?: boolean;
          force_password_change?: boolean;
          membership_tier?: 'silver' | 'gold' | 'platinum' | null;
          membership_expiry?: string | null;
          loyalty_points?: number;
          total_spent?: number;
          total_savings?: number;
          referral_code?: string | null;
          referred_by?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          address?: string | null;
          city?: string | null;
          pincode?: string | null;
          is_admin?: boolean;
          is_verified?: boolean;
          force_password_change?: boolean;
          membership_tier?: 'silver' | 'gold' | 'platinum' | null;
          membership_expiry?: string | null;
          loyalty_points?: number;
          total_spent?: number;
          total_savings?: number;
          referral_code?: string | null;
          referred_by?: string | null;
        };
      };
      services: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          short_description: string | null;
          image_url: string | null;
          price: number;
          discounted_price: number | null;
          duration_minutes: number;
          category: 'bridal' | 'hair' | 'skin' | 'nail' | 'package' | 'jewellery';
          is_active: boolean;
          is_featured: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          slug: string;
          description?: string | null;
          short_description?: string | null;
          image_url?: string | null;
          price: number;
          discounted_price?: number | null;
          duration_minutes: number;
          category: 'bridal' | 'hair' | 'skin' | 'nail' | 'package' | 'jewellery';
          is_active?: boolean;
          is_featured?: boolean;
          display_order?: number;
        };
        Update: {
          name?: string;
          slug?: string;
          description?: string | null;
          short_description?: string | null;
          image_url?: string | null;
          price?: number;
          discounted_price?: number | null;
          duration_minutes?: number;
          category?: 'bridal' | 'hair' | 'skin' | 'nail' | 'package' | 'jewellery';
          is_active?: boolean;
          is_featured?: boolean;
          display_order?: number;
        };
      };
      staff: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          email: string | null;
          phone: string | null;
          avatar_url: string | null;
          specialization: string[] | null;
          is_active: boolean;
          working_days: number[];
          working_start_time: string;
          working_end_time: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id?: string | null;
          name: string;
          email?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          specialization?: string[] | null;
          is_active?: boolean;
          working_days?: number[];
          working_start_time?: string;
          working_end_time?: string;
        };
        Update: {
          user_id?: string | null;
          name?: string;
          email?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          specialization?: string[] | null;
          is_active?: boolean;
          working_days?: number[];
          working_start_time?: string;
          working_end_time?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          user_id: string | null;
          service_id: string | null;
          staff_id: string | null;
          booking_date: string;
          booking_time: string;
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          payment_status: 'pending' | 'paid' | 'refunded';
          amount: number;
          discount_applied: number;
          final_amount: number | null;
          notes: string | null;
          cancellation_reason: string | null;
          confirmed_at: string | null;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id?: string | null;
          service_id?: string | null;
          staff_id?: string | null;
          booking_date: string;
          booking_time: string;
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          payment_status?: 'pending' | 'paid' | 'refunded';
          amount: number;
          discount_applied?: number;
          final_amount?: number | null;
          notes?: string | null;
          cancellation_reason?: string | null;
        };
        Update: {
          user_id?: string | null;
          service_id?: string | null;
          staff_id?: string | null;
          booking_date?: string;
          booking_time?: string;
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          payment_status?: 'pending' | 'paid' | 'refunded';
          amount?: number;
          discount_applied?: number;
          final_amount?: number | null;
          notes?: string | null;
          cancellation_reason?: string | null;
          confirmed_at?: string | null;
          completed_at?: string | null;
        };
      };
      reviews: {
        Row: {
          id: string;
          user_id: string | null;
          service_id: string | null;
          booking_id: string | null;
          rating: number;
          title: string | null;
          comment: string | null;
          is_verified: boolean;
          is_approved: boolean;
          is_featured: boolean;
          response: string | null;
          responded_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id?: string | null;
          service_id?: string | null;
          booking_id?: string | null;
          rating: number;
          title?: string | null;
          comment?: string | null;
          is_verified?: boolean;
          is_approved?: boolean;
          is_featured?: boolean;
          response?: string | null;
        };
        Update: {
          rating?: number;
          title?: string | null;
          comment?: string | null;
          is_verified?: boolean;
          is_approved?: boolean;
          is_featured?: boolean;
          response?: string | null;
          responded_at?: string | null;
        };
      };
      membership_plans: {
        Row: {
          id: string;
          name: 'silver' | 'gold' | 'platinum';
          display_name: string;
          price: number;
          duration_months: number;
          discount_percentage: number;
          features: Json;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: 'silver' | 'gold' | 'platinum';
          display_name: string;
          price: number;
          duration_months: number;
          discount_percentage?: number;
          features?: Json;
          is_active?: boolean;
        };
        Update: {
          display_name?: string;
          price?: number;
          duration_months?: number;
          discount_percentage?: number;
          features?: Json;
          is_active?: boolean;
        };
      };
      gallery: {
        Row: {
          id: string;
          title: string | null;
          description: string | null;
          image_url: string;
          thumbnail_url: string | null;
          category: 'bridal' | 'hair' | 'nail' | 'transformation' | 'jewellery' | 'salon';
          is_featured: boolean;
          display_order: number;
          created_at: string;
        };
        Insert: {
          title?: string | null;
          description?: string | null;
          image_url: string;
          thumbnail_url?: string | null;
          category: 'bridal' | 'hair' | 'nail' | 'transformation' | 'jewellery' | 'salon';
          is_featured?: boolean;
          display_order?: number;
        };
        Update: {
          title?: string | null;
          description?: string | null;
          image_url?: string;
          thumbnail_url?: string | null;
          category?: 'bridal' | 'hair' | 'nail' | 'transformation' | 'jewellery' | 'salon';
          is_featured?: boolean;
          display_order?: number;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          message: string | null;
          data: Json | null;
          is_read: boolean;
          sent_email: boolean;
          created_at: string;
        };
        Insert: {
          user_id: string;
          type: string;
          title: string;
          message?: string | null;
          data?: Json | null;
          is_read?: boolean;
          sent_email?: boolean;
        };
        Update: {
          is_read?: boolean;
          sent_email?: boolean;
        };
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string | null;
          message: string;
          status: 'new' | 'read' | 'replied' | 'resolved';
          replied_at: string | null;
          created_at: string;
        };
        Insert: {
          name: string;
          email: string;
          phone?: string | null;
          subject?: string | null;
          message: string;
          status?: 'new' | 'read' | 'replied' | 'resolved';
        };
        Update: {
          status?: 'new' | 'read' | 'replied' | 'resolved';
          replied_at?: string | null;
        };
      };
      price_packages: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          services: Json;
          original_price: number;
          discounted_price: number | null;
          is_active: boolean;
          is_featured: boolean;
          valid_from: string | null;
          valid_until: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          description?: string | null;
          services: Json;
          original_price: number;
          discounted_price?: number | null;
          is_active?: boolean;
          is_featured?: boolean;
          valid_from?: string | null;
          valid_until?: string | null;
        };
        Update: {
          name?: string;
          description?: string | null;
          services?: Json;
          original_price?: number;
          discounted_price?: number | null;
          is_active?: boolean;
          is_featured?: boolean;
          valid_from?: string | null;
          valid_until?: string | null;
        };
      };
      coupons: {
        Row: {
          id: string;
          code: string;
          discount_type: 'percentage' | 'fixed';
          discount_value: number;
          min_order_value: number;
          max_uses: number | null;
          current_uses: number;
          valid_from: string;
          valid_until: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          code: string;
          discount_type: 'percentage' | 'fixed';
          discount_value: number;
          min_order_value?: number;
          max_uses?: number | null;
          current_uses?: number;
          valid_from?: string;
          valid_until?: string | null;
          is_active?: boolean;
        };
        Update: {
          code?: string;
          discount_type?: 'percentage' | 'fixed';
          discount_value?: number;
          min_order_value?: number;
          max_uses?: number | null;
          current_uses?: number;
          valid_until?: string | null;
          is_active?: boolean;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string | null;
          image_url: string | null;
          author_id: string | null;
          category: string | null;
          tags: string[] | null;
          is_published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          slug: string;
          excerpt?: string | null;
          content?: string | null;
          image_url?: string | null;
          author_id?: string | null;
          category?: string | null;
          tags?: string[] | null;
          is_published?: boolean;
          published_at?: string | null;
        };
        Update: {
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string | null;
          image_url?: string | null;
          author_id?: string | null;
          category?: string | null;
          tags?: string[] | null;
          is_published?: boolean;
          published_at?: string | null;
        };
      };
      faqs: {
        Row: {
          id: string;
          question: string;
          answer: string;
          category: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          question: string;
          answer: string;
          category?: string | null;
          display_order?: number;
          is_active?: boolean;
        };
        Update: {
          question?: string;
          answer?: string;
          category?: string | null;
          display_order?: number;
          is_active?: boolean;
        };
      };
      site_settings: {
        Row: {
          id: string;
          key: string;
          value: string | null;
          value_json: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          key: string;
          value?: string | null;
          value_json?: Json | null;
        };
        Update: {
          value?: string | null;
          value_json?: Json | null;
        };
      };
    };
    Views: {};
    Functions: {
      is_admin: {
        Returns: boolean;
      };
    };
    Enums: {};
  };
}

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Service = Database['public']['Tables']['services']['Row'];
export type Staff = Database['public']['Tables']['staff']['Row'];
export type Booking = Database['public']['Tables']['bookings']['Row'];
export type Review = Database['public']['Tables']['reviews']['Row'];
export type MembershipPlan = Database['public']['Tables']['membership_plans']['Row'];
export type GalleryImage = Database['public']['Tables']['gallery']['Row'];
export type Notification = Database['public']['Tables']['notifications']['Row'];
export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row'];
export type PricePackage = Database['public']['Tables']['price_packages']['Row'];
export type Coupon = Database['public']['Tables']['coupons']['Row'];
export type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
export type FAQ = Database['public']['Tables']['faqs']['Row'];
export type SiteSetting = Database['public']['Tables']['site_settings']['Row'];

// Extended types with joins
export interface BookingWithDetails extends Booking {
  service: Service | null;
  staff: Staff | null;
  user: Profile | null;
}

export interface ReviewWithDetails extends Review {
  user: Profile | null;
  service: Service | null;
}
