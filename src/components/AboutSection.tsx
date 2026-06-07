import { Cctv, Plane, Shield } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const highlights = [
  {
    icon: Plane,
    title: 'All-Weather Platform',
    description:
      'Our DJI Matrice M30T is equipped with high-resolution standard and thermal cameras for inspections in demanding conditions.',
  },
  {
    icon: Shield,
    title: 'Broad Inspection Coverage',
    description:
      'We assess infrastructure, industrial facilities, construction sites, residential properties, agricultural land, and more.',
  },
  {
    icon: Cctv,
    title: 'Mobile Command Surveillance',
    description:
      'For events and locations that need live oversight, we provide real-time video and recording from our fully equipped mobile command trailer.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="mb-4">About Sky Sentinel</h2>
          <p className="text-muted-foreground">
            Sky Sentinel utilizes unmanned aerial vehicles to deliver safe, efficient aerial inspections
            and surveillance services for commercial, residential, and industrial clients.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 100}>
              <div className="bg-card p-6 rounded-lg border border-border h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
