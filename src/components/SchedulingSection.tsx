import 'react-day-picker/dist/style.css';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { Calendar, Clock } from 'lucide-react';

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
];

export function SchedulingSection() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');

  const disabledDays = [
    { dayOfWeek: [0, 6] },
    { before: new Date() }
  ];

  return (
    <section id="schedule" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4">Schedule an Inspection</h2>
          <p className="text-muted-foreground">
            Choose a date and time that works best for you. We operate Monday through Friday.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-card rounded-lg border border-border p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-primary" />
                <h3>Select Date</h3>
              </div>
              <div className="flex justify-center">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={disabledDays}
                  className="border border-border rounded-lg p-4"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-primary" />
                <h3>Select Time</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-lg border transition-all ${
                      selectedTime === time
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background border-border hover:border-primary hover:bg-accent'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {selectedDate && selectedTime && (
                <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm mb-2">Selected appointment:</p>
                  <p>
                    {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} at {selectedTime}
                  </p>
                  <button className="mt-4 w-full bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
                    Confirm Appointment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
