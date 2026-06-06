import { Plane, Camera, Shield, Clock } from 'lucide-react';

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-background via-background to-secondary py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="mb-6">Professional Drone Inspection Services</h1>
          <p className="text-muted-foreground mb-8">
            High-quality aerial inspections for commercial properties, infrastructure, and construction sites.
            Fast, accurate, and cost-effective solutions powered by advanced drone technology.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#contact" className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
              Request Inspection
            </a>
            <a href="#services" className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg hover:bg-accent transition-colors">
              View Services
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-card p-6 rounded-lg border border-border text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Plane className="w-6 h-6 text-primary" />
            </div>
            <h3 className="mb-2">Advanced Equipment</h3>
            <p className="text-sm text-muted-foreground">Latest 4K drone technology</p>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <h3 className="mb-2">High Resolution</h3>
            <p className="text-sm text-muted-foreground">Crystal clear imagery</p>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="mb-2">Certified Pilots</h3>
            <p className="text-sm text-muted-foreground">FAA licensed professionals</p>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="mb-2">Fast Turnaround</h3>
            <p className="text-sm text-muted-foreground">Reports within 24-48 hours</p>
          </div>
        </div>
      </div>
    </section>
  );
}
