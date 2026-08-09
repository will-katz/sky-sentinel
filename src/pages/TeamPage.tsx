import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { assetUrl } from '../assetUrl';
import { navigate } from '../routing';
import { ScrollReveal } from '../components/ScrollReveal';

type TeamMember = {
  name: string;
  role: string;
  /** Public-folder path, e.g. `team/charles-s.jpg`. Omit until the photo is ready. */
  photo?: string;
  photoAlt: string;
  credentials: string[];
  bio: string[];
};

const team: TeamMember[] = [
  {
    name: 'Charles S.',
    role: 'Owner',
    photo: 'team/charles-s.jpg',
    photoAlt: 'Portrait of Charles S., Sky Sentinel owner',
    credentials: [
      'FAA Private Pilot',
      'FAA Part 107 Remote Pilot',
      'U.S. Marine Corps Lieutenant Colonel (Ret.)',
      'New Jersey Police Lieutenant',
    ],
    bio: [
      'Sky Sentinel owner Charles S. is an FAA-licensed Private Pilot and Part 107-licensed Remote Pilot who manages the day-to-day operations of Sky Sentinel. Charles is a 25-year veteran of the United States Marine Corps. He began his career in 1991 as an enlisted KC-130 Hercules aircrewman, during which he accumulated over 1,000 hours of flight time on missions worldwide. After graduating with a B.S. degree from Stockton University in 1999, he was commissioned a Second Lieutenant in the Marine Corps. Upon completion of the Air Traffic Control Officers Course, he deployed during Operation Enduring Freedom to Manas, Kyrgyzstan, as the Detachment Commander of an Expeditionary Air Traffic Control Squadron supporting operations in Afghanistan.',
      'After leaving active duty in 2005, he joined the Marine Corps Reserves. He became the Operations Officer, and later the Executive Officer, of a Marine Corps aviation maintenance and logistics squadron in Newburgh, NY, servicing both fixed-wing and rotary-wing aircraft. He retired in 2018 after attaining the rank of Lieutenant Colonel. Additionally, in 2005, he was hired as a full-time police officer for one of the largest police departments in the state of New Jersey. After completing 21 years of service, with promotions to both Sergeant and Lieutenant, he is currently assigned as a Shift Commander responsible for the overnight operations of the police department.',
      'Charles is passionate about Sky Sentinel. He utilizes the leadership and technical skills developed through decades of military and police service to provide exceptional drone services for clients.',
    ],
  },
  {
    name: 'George Awad',
    role: 'Remote Pilot',
    photo: 'team/george-awad.jpg',
    photoAlt: 'Portrait of George Awad, Sky Sentinel remote pilot',
    credentials: [
      'FAA Part 107 Remote Pilot',
      'Law Enforcement Professional',
      'Certified Vapor Wake® K9 Handler',
      'FLETC Graduate',
    ],
    bio: [
      'George Awad is an FAA Part 107-licensed drone pilot. He is a law enforcement professional with 17+ years of experience in policing, security, K9 explosives detection, and intelligence operations. His skills also include investigations, emergency response, officer training, and multi-agency coordination. He is a certified Vapor Wake® K9 handler, a FLETC graduate, and a current police officer with a proven record of protecting public safety in high-pressure environments. He is fluent in select Arabic dialects and skilled in building community trust and operational readiness.',
    ],
  },
  {
    name: 'David McDevitt',
    role: 'Remote Pilot',
    photo: 'team/david-mcdevitt.jpg',
    photoAlt: 'Portrait of David McDevitt, Sky Sentinel remote pilot',
    credentials: [
      'FAA Part 107 Remote Pilot',
      'New Jersey Police Officer',
      'B.S. Business Administration & Management',
    ],
    bio: [
      "David McDevitt is an FAA Part 107-licensed Remote Pilot specializing in professional aerial imaging and drone operations. David is a graduate of Montclair State University's Feliciano School of Business and holds a bachelor's degree in Business Administration & Management. David is currently employed as a full-time police officer in New Jersey with over five years of experience. He provides safe, efficient, and high-quality drone services for commercial, industrial, and residential clients.",
    ],
  },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function MemberPortrait({ member }: { member: TeamMember }) {
  const [imageState, setImageState] = useState<'loading' | 'ready' | 'missing'>(
    member.photo ? 'loading' : 'missing',
  );
  const showPhoto = Boolean(member.photo) && imageState === 'ready';

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-secondary ring-1 ring-border shadow-[0_20px_50px_-28px_rgba(10,10,10,0.35)]">
      {member.photo ? (
        <img
          src={assetUrl(member.photo)}
          alt={member.photoAlt}
          width={720}
          height={960}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            showPhoto ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageState('ready')}
          onError={() => setImageState('missing')}
        />
      ) : null}

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-secondary via-muted to-secondary transition-opacity duration-500 ${
          showPhoto ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-hidden={showPhoto}
      >
        <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground/25">
          {initials(member.name)}
        </span>
        <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground/80">
          Photo coming soon
        </span>
      </div>
    </div>
  );
}

function MemberProfile({ member, index }: { member: TeamMember; index: number }) {
  const photoOnRight = index % 2 === 1;

  return (
    <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-start">
      <div
        className={`lg:col-span-5 ${photoOnRight ? 'lg:order-2' : 'lg:order-1'}`}
      >
        <MemberPortrait member={member} />
      </div>

      <div
        className={`lg:col-span-7 ${photoOnRight ? 'lg:order-1' : 'lg:order-2'} ${
          photoOnRight ? 'lg:pr-4' : 'lg:pl-2'
        }`}
      >
        <header className="mb-6 sm:mb-8">
          <p className="text-xs sm:text-sm uppercase tracking-[0.16em] text-muted-foreground mb-3">
            {member.role}
          </p>
          <h2 className="mb-5">{member.name}</h2>
          <ul className="space-y-1.5 border-l border-border pl-4">
            {member.credentials.map((credential) => (
              <li
                key={credential}
                className="text-sm text-foreground/75 tracking-tight leading-snug"
              >
                {credential}
              </li>
            ))}
          </ul>
        </header>

        <div className="space-y-4">
          {member.bio.map((paragraph, paragraphIndex) => (
            <p
              key={paragraphIndex}
              className="text-sm sm:text-[0.95rem] text-muted-foreground leading-relaxed text-pretty"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}

export function TeamPage() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_color-mix(in_srgb,var(--muted)_70%,transparent),_transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-secondary/80 to-transparent"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10">
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              navigate('/');
            }}
            className="inline-flex items-center gap-2 min-h-11 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
            Back to home
          </a>
        </div>

        <ScrollReveal className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-muted-foreground mb-4">
            Sky Sentinel
          </p>
          <h1 className="mb-4">Our Team</h1>
          <p className="text-muted-foreground text-pretty leading-relaxed">
            FAA Part 107-licensed pilots with deep experience in aviation, military service, and
            New Jersey law enforcement.
          </p>
        </ScrollReveal>

        <div className="space-y-16 sm:space-y-20 lg:space-y-28">
          {team.map((member, index) => (
            <ScrollReveal key={member.name} delay={Math.min(index * 80, 160)}>
              <MemberProfile member={member} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
