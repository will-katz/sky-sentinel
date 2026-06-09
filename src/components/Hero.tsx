import { Plane, Shield, Clock } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { CredentialsStrip } from './CredentialsStrip';

const features = [
  { icon: Plane, title: 'Advanced Equipment', description: 'DJI Matrice M30T & Mavic Pro Platinum' },
  { icon: Shield, title: 'Certified Pilots', description: 'FAA licensed professionals' },
  { icon: Clock, title: 'Surveillance Services', description: 'Private and Public Events' },
];

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-background via-background to-secondary py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <ScrollReveal>
            <h1 className="mb-4 opacity-70 text-balance">Sky Sentinel: Precision Aerial Inspections</h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Professional FAA Part 107 drone inspections, aerial photography, and surveillance
              services for commercial, residential, and industrial clients across New Jersey.
            </p>
          </ScrollReveal>

          {/*<ScrollReveal delay={150}>
            TODO: add a video of the drone in action
            <video src="/hero.mp4" autoPlay muted loop className="w-full h-full object-cover rounded-lg" />
          </ScrollReveal>*/}

          <ScrollReveal delay={250} className="mt-8">
            <CredentialsStrip />
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 100}>
              <div className="bg-card p-4 sm:p-6 rounded-lg border border-border text-center h-full">
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
