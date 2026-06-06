import { Toaster } from 'sonner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { SchedulingSection } from './components/SchedulingSection';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <SchedulingSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}