import { Clock, MonitorPlay, Plane, Shield } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { CredentialsStrip } from './CredentialsStrip';
import { HighlightItem, HighlightList } from './HighlightItem';
import { Logo } from './Logo';

const features = [
  {
    icon: Plane,
    title: 'Advanced Equipment',
    description: 'DJI Matrice M30T & Mavic Pro Platinum',
  },
  {
    icon: Shield,
    title: 'Certified Pilots',
    description: 'FAA-licensed professionals',
  },
  {
    icon: Clock,
    title: 'Surveillance Services',
    description: 'Private and public events with live oversight',
  },
];

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-background to-secondary/60 py-14 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <ScrollReveal>
            <Logo className="h-16 sm:h-20 w-auto mx-auto mb-6 sm:mb-8" />
            <h1 className="sr-only">Sky Sentinel: Precision Aerial Inspections</h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Professional FAA Part 107 drone inspections, aerial photography, and surveillance
              services for commercial, residential, and industrial clients across New Jersey.
            </p>
            <div className="mt-8 pt-8 border-t border-border max-w-xl mx-auto">
              <p className="text-sm sm:text-base text-foreground max-w-2xl mx-auto text-pretty leading-relaxed flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                <MonitorPlay className="w-4 h-4 sm:w-5 sm:h-5 text-foreground/60 shrink-0" aria-hidden="true" strokeWidth={1.5} />
                <span>
                  Watch live with our certified pilots in the{' '}
                  <span className="font-medium">Sky Sentinel Mobile Command Center</span>.
                </span>
              </p>
            </div>
          </ScrollReveal>

          {/*<ScrollReveal delay={150}>
            TODO: add a video of the drone in action
            <video src={assetUrl('hero.mp4')} autoPlay muted loop className="w-full h-full object-cover rounded-lg" />
          </ScrollReveal>*/}

          <ScrollReveal delay={200} className="mt-8">
            <CredentialsStrip />
          </ScrollReveal>
        </div>

        <HighlightList className="max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 100} className="h-full">
              <HighlightItem
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </ScrollReveal>
          ))}
        </HighlightList>
      </div>
    </section>
  );
}
