import { Toaster } from 'sonner';
import { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { Services } from './components/Services';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { StructuredData } from './components/StructuredData';
import { TeamPage } from './pages/TeamPage';
import { useAppPath, scrollToHash } from './routing';
import {
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
  TEAM_DESCRIPTION,
  TEAM_TITLE,
} from './seo';

function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <Services />
      <ContactForm />
    </>
  );
}

export default function App() {
  const path = useAppPath();
  const isTeam = path === '/team';

  useEffect(() => {
    if (isTeam) {
      document.title = TEAM_TITLE;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute('content', TEAM_DESCRIPTION);
      document
        .querySelector('link[rel="canonical"]')
        ?.setAttribute('href', `${SITE_URL}/team`);
      window.scrollTo({ top: 0 });
      return;
    }

    document.title = SITE_TITLE;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', SITE_DESCRIPTION);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `${SITE_URL}/`);

    const { hash } = window.location;
    if (hash) {
      // Wait for home sections to mount after leaving /team.
      requestAnimationFrame(() => scrollToHash(hash));
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [isTeam]);

  return (
    <div className="min-h-screen flex flex-col">
      <StructuredData />
      <Toaster
        position="top-center"
        offset={{ top: 'calc(1rem + env(safe-area-inset-top))' }}
        mobileOffset={{ top: 'calc(1rem + env(safe-area-inset-top))' }}
      />
      <Header />
      <main className="flex-1">{isTeam ? <TeamPage /> : <HomePage />}</main>
      <Footer />
    </div>
  );
}
