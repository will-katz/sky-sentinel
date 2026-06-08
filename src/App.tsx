import { Toaster } from 'sonner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { Services } from './components/Services';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { StructuredData } from './components/StructuredData';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <StructuredData />
      <Toaster
        position="top-center"
        offset={{ top: 'calc(1rem + env(safe-area-inset-top))' }}
        mobileOffset={{ top: 'calc(1rem + env(safe-area-inset-top))' }}
      />
      <Header />
      <main className="flex-1">
        <Hero />
        <AboutSection />
        <Services />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}