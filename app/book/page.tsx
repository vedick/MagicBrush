"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/components/auth-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, CalendarIcon, Clock, User, CheckCircle, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Service, Staff } from '@/lib/types/database';

const timeSlots = [
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
];

export default function BookPage() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [services, setServices] = useState<Service[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<string>('any');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const [servicesRes, staffRes] = await Promise.all([
        supabase.from('services').select('*').eq('is_active', true).order('display_order'),
        supabase.from('staff').select('*').eq('is_active', true),
      ]);

      if (servicesRes.data) setServices(servicesRes.data);
      if (staffRes.data) setStaff(staffRes.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleServiceSelect = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId);
    setSelectedService(service || null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (!selectedService || !selectedDate || !selectedTime) {
      toast({
        title: 'Incomplete Fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);

    const price = selectedService.discounted_price || selectedService.price;

    const { error } = await supabase.from('bookings').insert({
      user_id: user.id,
      service_id: selectedService.id,
      staff_id: selectedStaff === 'any' ? null : selectedStaff,
      booking_date: selectedDate.toISOString().split('T')[0],
      booking_time: selectedTime,
      amount: price,
      final_amount: price,
      notes: notes || null,
    });

    setSubmitting(false);

    if (error) {
      toast({
        title: 'Booking Failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setSuccess(true);
      toast({
        title: 'Booking Confirmed!',
        description: 'Your appointment has been booked successfully.',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="font-playfair text-3xl font-bold text-foreground mb-4">
            Booking Confirmed!
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            Your appointment for {selectedService?.name} has been booked successfully.
            We will contact you shortly to confirm the details.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => router.push('/dashboard')}>
              View Dashboard
            </Button>
            <Button variant="outline" onClick={() => router.push('/')}>
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-4 bg-muted/30">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="font-playfair text-4xl font-bold text-foreground">
            Book <span className="text-brand-gold">Appointment</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Schedule your appointment in just a few easy steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[
            { num: 1, label: 'Service' },
            { num: 2, label: 'Date & Time' },
            { num: 3, label: 'Confirm' },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= s.num ? 'gold-gradient text-white' : 'bg-muted text-muted-foreground'
              }`}>
                {s.num}
              </div>
              <span className={`ml-2 text-sm ${step >= s.num ? 'font-medium' : 'text-muted-foreground'}`}>
                {s.label}
              </span>
              {i < 2 && (
                <div className={`w-12 h-0.5 mx-4 ${step > s.num ? 'bg-brand-gold' : 'bg-muted'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Service Selection */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Select Service</CardTitle>
                <CardDescription>Choose the service you want to book</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceSelect(service.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedService?.id === service.id
                          ? 'border-brand-gold bg-brand-gold/5'
                          : 'border-border hover:border-brand-gold/50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-foreground">{service.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {service.short_description}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {service.duration_minutes} min
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          {service.discounted_price ? (
                            <>
                              <p className="text-sm line-through text-muted-foreground">
                                {formatPrice(service.price)}
                              </p>
                              <p className="text-lg font-bold text-foreground">
                                {formatPrice(service.discounted_price)}
                              </p>
                            </>
                          ) : (
                            <p className="text-lg font-bold text-foreground">
                              {formatPrice(service.price)}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Staff Selection */}
                <div className="mt-6 pt-6 border-t">
                  <Label>Staff Preference (Optional)</Label>
                  <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select staff member" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Available</SelectItem>
                      {staff.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.name} - {s.specialization?.join(', ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full mt-6 gold-gradient text-white hover:opacity-90"
                  disabled={!selectedService}
                  onClick={() => setStep(2)}
                >
                  Continue
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Date & Time Selection */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Select Date & Time</CardTitle>
                <CardDescription>Choose your preferred appointment slot</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Calendar */}
                  <div>
                    <Label className="mb-2 block">Select Date</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                      className="rounded-md border"
                    />
                  </div>

                  {/* Time Slots */}
                  <div>
                    <Label className="mb-2 block">Select Time</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                          className={`${
                            selectedTime === time ? 'gold-gradient text-white' : ''
                          }`}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="mt-6 pt-6 border-t">
                  <Label>Special Notes (Optional)</Label>
                  <Textarea
                    placeholder="Any special requests or notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div className="flex gap-4 mt-6">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button
                    className="flex-1 gold-gradient text-white hover:opacity-90"
                    disabled={!selectedDate || !selectedTime}
                    onClick={() => setStep(3)}
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Confirm Your Booking</CardTitle>
                <CardDescription>Review and confirm your appointment details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 bg-muted/50 rounded-xl p-4">
                  {/* Service */}
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Service</span>
                    <span className="font-medium">{selectedService?.name}</span>
                  </div>

                  {/* Date */}
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">
                      {selectedDate?.toLocaleDateString('en-IN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  {/* Time */}
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>

                  {/* Duration */}
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{selectedService?.duration_minutes} minutes</span>
                  </div>

                  {/* Price */}
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-bold text-lg text-brand-gold">
                      {formatPrice(selectedService?.discounted_price || selectedService?.price || 0)}
                    </span>
                  </div>
                </div>

                {!user && (
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-800 text-sm">
                    You need to be logged in to complete the booking.{' '}
                    <Link href="/auth/login" className="underline font-medium">
                      Login now
                    </Link>{' '}
                    or{' '}
                    <Link href="/auth/register" className="underline font-medium">
                      create an account
                    </Link>
                  </div>
                )}

                <div className="flex gap-4 mt-6">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button
                    className="flex-1 gold-gradient text-white hover:opacity-90"
                    disabled={!user}
                    onClick={handleSubmit}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Booking...
                      </>
                    ) : (
                      'Confirm Booking'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
