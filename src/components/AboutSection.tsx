import { ArrowRight, Cctv, Plane, Shield } from 'lucide-react';
import { assetUrl } from '../assetUrl';
import { navigate } from '../routing';
import { ScrollReveal } from './ScrollReveal';
import { HighlightItem, HighlightList } from './HighlightItem';

const fleet = [
  {
    src: assetUrl('dji-matrice-m30t.png'),
    alt: 'DJI Matrice M30T in flight',
    name: 'DJI Matrice M30T',
    credit: {
      authorName: 'ZLEA',
      authorUrl: 'https://commons.wikimedia.org/wiki/User:ZLEA',
      workUrl:
        'https://commons.wikimedia.org/wiki/File:DJI_M30T_Matrice_30T_(FA3MXKNAKP)_(7-29-2023).jpg',
      licenseName: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
  },
  {
    src: assetUrl('dji-mavic-pro-platinum.png'),
    alt: 'DJI Mavic Pro Platinum in flight',
    name: 'DJI Mavic Pro Platinum',
  },
] as const;

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
            Located in New Jersey and operated by active New Jersey law enforcement officers, Sky Sentinel
            utilizes unmanned aerial vehicles to deliver safe, efficient aerial inspections and surveillance
            services for commercial, residential, and industrial clients. Every flight is piloted by our team
            of experienced, licensed FAA Part 107 pilots.
          </p>
          <a
            href="/team"
            onClick={(event) => {
              event.preventDefault();
              navigate('/team');
            }}
            className="inline-flex items-center gap-1.5 mt-6 text-sm font-medium text-foreground underline underline-offset-4 decoration-foreground/25 hover:decoration-foreground transition-[text-decoration-color] duration-200"
          >
            Meet the pilots
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
          </a>
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
                <figcaption className="mt-3">
                  <p className="text-sm font-medium text-foreground tracking-tight">{drone.name}</p>
                  {'credit' in drone && drone.credit ? (
                    <p className="mt-1.5 text-[11px] sm:text-xs text-muted-foreground leading-relaxed text-pretty">
                      Photo:{' '}
                      <a
                        href={drone.credit.workUrl}
                        target="_blank"
                        rel="noopener noreferrer license"
                        className="underline underline-offset-2 decoration-border hover:text-foreground hover:decoration-foreground/40 transition-colors"
                      >
                        DJI Matrice 30T
                      </a>{' '}
                      by{' '}
                      <a
                        href={drone.credit.authorUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 decoration-border hover:text-foreground hover:decoration-foreground/40 transition-colors"
                      >
                        {drone.credit.authorName}
                      </a>
                      ,{' '}
                      <a
                        href={drone.credit.licenseUrl}
                        target="_blank"
                        rel="noopener noreferrer license"
                        className="underline underline-offset-2 decoration-border hover:text-foreground hover:decoration-foreground/40 transition-colors"
                      >
                        {drone.credit.licenseName}
                      </a>
                    </p>
                  ) : null}
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
