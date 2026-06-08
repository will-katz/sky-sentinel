import { Cctv, Plane, Shield } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const fleet = [
  {
    src: '/dji-matrice-m30t.png',
    alt: 'DJI Matrice M30T in flight',
    name: 'DJI Matrice M30T',
  },
  {
    src: '/dji-mavic-pro-platinum.png',
    alt: 'DJI Mavic Pro Platinum in flight',
    name: 'DJI Mavic Pro Platinum',
  },
];

const highlights = [
  {
    icon: Plane,
    title: 'All-Weather Platform',
    description:
      'Our DJI Matrice M30T and DJI Mavic Pro Platinum are equipped with high-resolution standard and thermal cameras for inspections in demanding conditions.',
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
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="mb-4">About Sky Sentinel</h2>
          <p className="text-muted-foreground text-pretty">
            Located in New Jersey and operated by officers of the Woodbridge Township Police Department, Sky Sentinel utilizes unmanned aerial vehicles to deliver safe, efficient aerial inspections
            and surveillance services for commercial, residential, and industrial clients. Piloted by our team of experienced, licensed FAA Part 107 pilots.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mb-10 sm:mb-12">
          {fleet.map((drone, index) => (
            <ScrollReveal key={drone.name} delay={index * 100}>
              <figure className="bg-card rounded-lg border border-border overflow-hidden">
                <img
                  src={drone.src}
                  alt={drone.alt}
                  width={800}
                  height={600}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover"
                />
                <figcaption className="p-4 text-sm text-center text-muted-foreground">
                  {drone.name}
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
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
