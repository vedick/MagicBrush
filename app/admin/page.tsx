"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/components/auth-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users, Calendar, DollarSign, Star, Settings, Package, Bell,
  BarChart3, Image, FileText, MessageSquare, Loader2
} from 'lucide-react';
import Link from 'next/link';
import { Profile, Booking, Service, ContactSubmission } from '@/lib/types/database';

export default function AdminPage() {
  const { user, profile, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: 0,
    bookings: 0,
    revenue: 0,
    pending: 0,
  });
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push('/');
    }
  }, [user, isAdmin, authLoading, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !isAdmin) return;

      const [usersRes, bookingsRes, contactsRes, servicesRes] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact' }),
        supabase.from('bookings').select('*').order('created_at', { ascending: false }).limit(10),
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }).limit(10),
        supabase.from('services').select('*').order('display_order'),
      ]);

      const totalRevenue = bookingsRes.data?.reduce((sum: number, b) => sum + (b.final_amount || b.amount), 0) || 0;
      const pendingCount = bookingsRes.data?.filter((b) => b.status === 'pending').length || 0;

      setStats({
        users: usersRes.count || 0,
        bookings: bookingsRes.data?.length || 0,
        revenue: totalRevenue,
        pending: pendingCount,
      });

      setRecentBookings(bookingsRes.data || []);
      setContacts(contactsRes.data || []);
      setServices(servicesRes.data || []);
      setLoading(false);
    };

    fetchData();
  }, [user, isAdmin, supabase]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'new':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const quickLinks = [
    { icon: Users, label: 'Manage Users', href: '/admin/users', color: 'bg-blue-100 text-blue-600' },
    { icon: Calendar, label: 'Bookings', href: '/admin/bookings', color: 'bg-green-100 text-green-600' },
    { icon: Package, label: 'Services', href: '/admin/services', color: 'bg-purple-100 text-purple-600' },
    { icon: Image, label: 'Gallery', href: '/admin/gallery', color: 'bg-pink-100 text-pink-600' },
    { icon: Star, label: 'Reviews', href: '/admin/reviews', color: 'bg-yellow-100 text-yellow-600' },
    { icon: MessageSquare, label: 'Messages', href: '/admin/messages', color: 'bg-indigo-100 text-indigo-600' },
    { icon: Settings, label: 'Settings', href: '/admin/settings', color: 'bg-gray-100 text-gray-600' },
  ];

  return (
    <div className="min-h-screen py-24 px-4 bg-muted/30">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">Manage your salon operations</p>
          </div>
          <Button className="gold-gradient text-white hover:opacity-90">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Users', value: stats.users, icon: Users, color: 'bg-blue-100 text-blue-600' },
            { label: 'Total Bookings', value: stats.bookings, icon: Calendar, color: 'bg-green-100 text-green-600' },
            { label: 'Revenue', value: formatPrice(stats.revenue), icon: DollarSign, color: 'bg-gold-100 text-amber-600' },
            { label: 'Pending', value: stats.pending, icon: Bell, color: 'bg-yellow-100 text-yellow-600' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Links */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
              {quickLinks.map((link) => (
                <Link key={link.label} href={link.href}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex flex-col items-center p-4 rounded-xl bg-muted hover:bg-brand-pink/30 transition-colors"
                  >
                    <div className={`w-12 h-12 rounded-lg ${link.color} flex items-center justify-center mb-2`}>
                      <link.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-center">{link.label}</span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
            <TabsTrigger value="contacts">Messages</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Latest appointment requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 text-left text-sm font-medium text-muted-foreground">ID</th>
                        <th className="py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                        <th className="py-3 text-left text-sm font-medium text-muted-foreground">Time</th>
                        <th className="py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                        <th className="py-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
                        <th className="py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map((booking) => (
                        <tr key={booking.id} className="border-b">
                          <td className="py-3 text-sm">{booking.id.slice(0, 8)}...</td>
                          <td className="py-3 text-sm">{booking.booking_date}</td>
                          <td className="py-3 text-sm">{booking.booking_time}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="py-3 text-sm font-medium">{formatPrice(booking.amount)}</td>
                          <td className="py-3">
                            <Button size="sm" variant="outline">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
                <CardDescription>Messages from website visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contacts.length > 0 ? (
                    contacts.map((contact) => (
                      <div key={contact.id} className="p-4 border rounded-xl">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{contact.name}</h4>
                            <p className="text-sm text-muted-foreground">{contact.email}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(contact.status)}`}>
                            {contact.status}
                          </span>
                        </div>
                        <p className="text-sm">{contact.message}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No messages yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Services</CardTitle>
                  <CardDescription>Manage your service offerings</CardDescription>
                </div>
                <Button className="gold-gradient text-white hover:opacity-90">
                  Add Service
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.slice(0, 6).map((service) => (
                    <div key={service.id} className="p-4 border rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{service.name}</h4>
                        <span className={`w-2 h-2 rounded-full ${service.is_active ? 'bg-green-500' : 'bg-red-500'}`} />
                      </div>
                      <p className="text-sm text-muted-foreground">{service.category}</p>
                      <p className="text-lg font-bold mt-2">{formatPrice(service.price)}</p>
                      <Button size="sm" variant="outline" className="mt-2 w-full">
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
