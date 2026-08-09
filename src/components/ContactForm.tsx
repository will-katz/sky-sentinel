import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Mail, Send } from 'lucide-react';
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
    } catch (error) {
      console.error('Contact form network error:', error);
      toast.error('Network error. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-14 sm:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl mx-auto mb-10 sm:mb-16 text-center">
          <ScrollReveal className="w-full">
            <h2 className="mb-4">Request a Flight</h2>
            <p className="text-muted-foreground leading-relaxed">
              Ready to schedule an inspection? Fill out the form below and we'll get back to you shortly.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto w-full">
          <ScrollReveal className="w-full lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl ring-1 ring-border p-5 sm:p-7 lg:p-8 space-y-5 sm:space-y-6 w-full mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm text-muted-foreground">Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-3 bg-input-background rounded-lg ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-foreground/10 transition-shadow duration-200"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm text-muted-foreground">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="w-full px-4 py-3 bg-input-background rounded-lg ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-foreground/10 transition-shadow duration-200"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm text-muted-foreground">Phone Number *</label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    {...register('phone', { required: 'Phone number is required' })}
                    className="w-full px-4 py-3 bg-input-background rounded-lg ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-foreground/10 transition-shadow duration-200"
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label htmlFor="serviceType" className="block mb-2 text-sm text-muted-foreground">Service Type *</label>
                  <select
                    id="serviceType"
                    {...register('serviceType', { required: 'Please select a service' })}
                    className="w-full px-4 py-3 bg-input-background rounded-lg ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-foreground/10 transition-shadow duration-200 appearance-none"
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
                <label htmlFor="message" className="block mb-2 text-sm text-muted-foreground">Message</label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={4}
                  className="w-full px-4 py-3 bg-input-background rounded-lg ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-foreground/10 transition-shadow duration-200 resize-none"
                  placeholder="Tell us about your project and inspection needs..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground px-6 py-3.5 min-h-12 rounded-full hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
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

          <div className="w-full space-y-6">
            {/*<ScrollReveal direction="right" delay={100}>
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                    TODO: Add phone number and hours of operation 
                  <div>
                    <h4 className="mb-1">Phone</h4>
                    <p className="text-sm text-muted-foreground">(xxx) xxx-xxxx</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri 8am-5pm</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>*/}

            <ScrollReveal delay={200} className="w-full">
              <div className="border-t border-border pt-8 lg:pt-0 lg:border-t-0 lg:pl-8 lg:border-l w-full mx-auto max-lg:max-w-md">
                <div className="flex flex-col items-center text-center gap-3 lg:items-start lg:text-left">
                  <Mail className="w-5 h-5 text-foreground/60 shrink-0" strokeWidth={1.5} />
                  <div>
                    <h4 className="mb-1.5 text-sm font-medium tracking-tight">Email</h4>
                    <a
                      href="mailto:skysentineldrone.com@skysentineldrone.com"
                      className="text-sm text-muted-foreground break-all hover:text-foreground transition-colors duration-200"
                    >
                      skysentineldrone.com@skysentineldrone.com
                    </a>
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
