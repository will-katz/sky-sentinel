import { Plane, Camera, Shield, Clock } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { CredentialsStrip } from './CredentialsStrip';

const features = [
  { icon: Plane, title: 'Advanced Equipment', description: 'DJI Matrice M30T & Mavic Pro Platinum' },
  { icon: Camera, title: 'High Resolution', description: 'Crystal clear imagery' },
  { icon: Shield, title: 'Certified Pilots', description: 'FAA licensed professionals' },
  { icon: Clock, title: 'Surveillance Services', description: 'Private and Public Events' },
];

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-background via-background to-secondary py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal>
            <h1 className="mb-6 opacity-70">Precision Aerial Inspections</h1>
          </ScrollReveal>

          {/*<ScrollReveal delay={150}>
            TODO: add a video of the drone in action
            <video src="/hero.mp4" autoPlay muted loop className="w-full h-full object-cover rounded-lg" />
          </ScrollReveal>*/}

          <ScrollReveal delay={250} className="mt-8">
            <CredentialsStrip />
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 100}>
              <div className="bg-card p-6 rounded-lg border border-border text-center h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
