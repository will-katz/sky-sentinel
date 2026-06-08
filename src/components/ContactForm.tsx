import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Mail, Phone, Send } from 'lucide-react';
import { toast } from 'sonner';
import { ScrollReveal } from './ScrollReveal';
import { CONTACT_API_URL } from '../config';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const responseText = await response.text();
      let responseData: { message?: string } = {};

      try {
        responseData = responseText ? JSON.parse(responseText) : {};
      } catch {
        responseData = { message: responseText };
      }

      if (!response.ok) {
        console.error('Contact form error:', response.status, responseText);
        toast.error(responseData.message ?? `Request failed (${response.status})`);
        return;
      }

      toast.success('Thank you! We will contact you within 24 hours.');
      reset();
    } catch {
      toast.error('Network error. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4">Request a Flight</h2>
          <p className="text-muted-foreground">
            Ready to schedule an inspection? Fill out the form below and we'll get back to you shortly.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <ScrollReveal direction="left" className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-card rounded-lg border border-border p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2">Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block mb-2">Phone Number *</label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone', { required: 'Phone number is required' })}
                    className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label htmlFor="serviceType" className="block mb-2">Service Type *</label>
                  <select
                    id="serviceType"
                    {...register('serviceType', { required: 'Please select a service' })}
                    className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select a service</option>
                    <option value="commercial">Commercial Inspection</option>
                    <option value="construction">Construction Monitoring</option>
                    <option value="infrastructure">Infrastructure & Utilities</option>
                    <option value="residential">Residential Inspection</option>
                    <option value="land">Aerial Photography</option>
                    <option value="industrial">Industrial Facility</option>
                    <option value="surveillance">Surveillance</option>
                  </select>
                  {errors.serviceType && <p className="text-destructive text-sm mt-1">{errors.serviceType.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block mb-2">Message</label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={4}
                  className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Tell us about your project and inspection needs..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </ScrollReveal>

          <div className="space-y-6">
            <ScrollReveal direction="right" delay={100}>
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-1">Phone</h4>
                    <p className="text-sm text-muted-foreground">(xxx) xxx-xxxx</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri 8am-5pm</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={200}>
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-1">Email</h4>
                    <p className="text-sm text-muted-foreground">skysentineldrone@skysentineldrone.com</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
