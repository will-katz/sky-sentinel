import { Cctv, Plane, Shield } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { HighlightItem, HighlightList } from './HighlightItem';

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
      'High-resolution standard and thermal cameras on our Matrice M30T and Mavic Pro Platinum for demanding conditions.',
  },
  {
    icon: Shield,
    title: 'Broad Inspection Coverage',
    description:
      'Infrastructure, industrial facilities, construction sites, residential properties, agricultural land, and more.',
  },
  {
    icon: Cctv,
    title: 'Mobile Command Surveillance',
    description:
      'Watch live with certified pilots from the Sky Sentinel Mobile Command Center — real-time video for events and locations that need oversight.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-14 sm:py-20 lg:py-24 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="mb-4">About Sky Sentinel</h2>
          <p className="text-muted-foreground text-pretty leading-relaxed">
            Located in New Jersey and operated by active New Jersey law enforcement officers, Sky Sentinel utilizes unmanned aerial vehicles to deliver safe, efficient aerial inspections
            and surveillance services for commercial, residential, and industrial clients. Piloted by our team of experienced, licensed FAA Part 107 pilots.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mb-12 sm:mb-16">
          {fleet.map((drone, index) => (
            <ScrollReveal key={drone.name} delay={index * 100}>
              <figure className="text-center group">
                <img
                  src={drone.src}
                  alt={drone.alt}
                  width={800}
                  height={600}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover rounded-xl ring-1 ring-border transition-shadow duration-300 group-hover:shadow-sm"
                />
                <figcaption className="mt-3 text-sm font-medium text-foreground tracking-tight">
                  {drone.name}
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>

        <HighlightList className="max-w-6xl mx-auto">
          {highlights.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 100} className="h-full">
              <HighlightItem
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            </ScrollReveal>
          ))}
        </HighlightList>
      </div>
    </section>
  );
}
