import { useState } from 'react';
import {
  Building2,
  ChevronDown,
  Factory,
  HardHat,
  Home,
  TreePine,
  Zap,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const services = [
  {
    icon: Building2,
    title: 'Commercial Inspections',
    description: 'Comprehensive roof and building exterior inspections for commercial properties.',
    features: ['Roof condition assessment', 'Exterior wall inspection', 'Gutter & drainage review'],
  },
  {
    icon: HardHat,
    title: 'Construction Monitoring',
    description: 'Track construction progress with regular aerial surveys and documentation.',
    features: ['Progress tracking', 'Site documentation', 'Safety compliance'],
  },
  {
    icon: Zap,
    title: 'Infrastructure & Utilities',
    description: 'Inspect power lines, towers, bridges, and critical infrastructure.',
    features: ['Power line inspection', 'Tower assessment', 'Bridge inspection'],
  },
  {
    icon: Home,
    title: 'Residential Inspections',
    description: 'Detailed home inspections for buyers, sellers, and insurance claims.',
    features: ['Roof condition', 'Property assessment', 'Insurance documentation'],
  },
  {
    icon: TreePine,
    title: 'Aerial Photography',
    description: 'High quality aerial photography and videography for real estate, marketing, and more.',
    features: ['Aerial videography', 'Real estate photography', 'Marketing photography'],
  },
  {
    icon: Factory,
    title: 'Industrial Facilities',
    description: 'Safe inspection of industrial facilities, tanks, and equipment.',
    features: ['Tank inspection', 'Flare stack assessment', 'Equipment monitoring'],
  },
];

export function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleService = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="services" className="py-14 sm:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="mb-4">Our Sky Sentinel Services</h2>
          <p className="text-muted-foreground leading-relaxed">
            We provide a full range of professional drone services tailored to your project.
          </p>
          <p className="text-foreground text-sm sm:text-base font-medium mt-4 text-pretty leading-relaxed">
            We will also donate our drone services to any search and rescue or other disaster relief efforts.
          </p>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto rounded-xl overflow-hidden ring-1 ring-border bg-background pb-6 sm:pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
          {services.map((service, index) => {
            const isOpen = openIndex === index;

            return (
              <ScrollReveal key={service.title} delay={(index % 3) * 100} className="w-full">
                <div className={`bg-background h-full ${isOpen ? 'pb-6 sm:pb-8' : 'pb-4 sm:pb-4'}`}>
                  <button
                    type="button"
                    onClick={() => toggleService(index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center gap-3.5 px-4 sm:px-5 pt-4 sm:pt-5 text-left hover:bg-secondary/50 transition-colors duration-200"
                  >
                    <service.icon className="w-5 h-5 text-foreground/60 shrink-0" strokeWidth={1.5} />
                    <h3 className="flex-1 min-w-0 text-sm sm:text-base">{service.title}</h3>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden min-h-0">
                      <div
                        className={`px-4 sm:px-5 border-t border-border transition-opacity duration-300 motion-reduce:transition-none ${
                          isOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <p className="text-sm text-muted-foreground mt-4 mb-4 leading-relaxed">{service.description}</p>
                        <ul className="space-y-1.5 mb-2">
                          {service.features.map((feature) => (
                            <li key={feature} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-foreground/30 mt-0.5">–</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
