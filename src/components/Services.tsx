import { Building2, HardHat, Zap, Home, TreePine, Factory } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const services = [
  {
    icon: Building2,
    title: 'Commercial Inspections',
    description: 'Comprehensive roof and building exterior inspections for commercial properties.',
    features: ['Roof condition assessment', 'Exterior wall inspection', 'Gutter & drainage review']
  },
  {
    icon: HardHat,
    title: 'Construction Monitoring',
    description: 'Track construction progress with regular aerial surveys and documentation.',
    features: ['Progress tracking', 'Site documentation', 'Safety compliance']
  },
  {
    icon: Zap,
    title: 'Infrastructure & Utilities',
    description: 'Inspect power lines, towers, bridges, and critical infrastructure.',
    features: ['Power line inspection', 'Tower assessment', 'Bridge inspection']
  },
  {
    icon: Home,
    title: 'Residential Inspections',
    description: 'Detailed home inspections for buyers, sellers, and insurance claims.',
    features: ['Roof condition', 'Property assessment', 'Insurance documentation']
  },
  {
    icon: TreePine,
    title: 'Aerial Photography',
    description: 'High quality aerial photography and videography for real estate, marketing, and more.',
    features: ['Aerial videography', 'Real estate photography', 'Marketing photography']
  },
  {
    icon: Factory,
    title: 'Industrial Facilities',
    description: 'Safe inspection of industrial facilities, tanks, and equipment.',
    features: ['Tank inspection', 'Flare stack assessment', 'Equipment monitoring']
  }
];

export function Services() {
  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4">Our Sky Sentinel Services</h2>
          <p className="text-muted-foreground">
            We provide a full range of professional drone services tailored to your project.
          </p>
          <p className="text-blue-950 text-base sm:text-lg font-bold mt-4 text-pretty">
            We will also donate our drone services to any search and rescue or other disaster relief efforts.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={(index % 3) * 100}>
              <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
