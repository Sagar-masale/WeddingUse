import { motion } from "framer-motion";
import { Sparkles, Music, Heart, Coffee } from "lucide-react";

const events = [

    {
    icon: Sparkles,
    title: "Haldi & Devkarya",
    date: "20th April 2026",
    time: "7:00 PM",
    venue: "Wedding Venue, Solapur",
    description: "Traditional pre-wedding rituals with family and music.",
  },
 {
    icon: Heart,
    title: "Wedding Ceremony",
    date: "21st April 2026",
    time: "11:45 AM",
    venue: "Hingulambika Sanskrutik Bhavan, Ganesh Peth, Solapur",
    description: "The auspicious moment when we begin our new journey together.",
  },
  {
    icon: Coffee, // Aap "Utensils" ya "Grape" icon bhi use kar sakte hain
    title: "Lunch (Priti Bhojan)",
    date: "21st April 2026",
    time: "12:00 PM to 3:00 PM",
    venue: "Wedding Venue, Solapur",
    description: "A delicious meal to celebrate our big day.",
  },
];

const EventsTimeline = () => {
  return (
    <section className="wedding-section bg-card pattern-mandala">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12 transform-gpu"
        >
          <h2 className="font-display text-3xl md:text-4xl text-primary mb-4">
            Wedding Events
          </h2>
          <div className="ornate-divider">
            <span className="text-gold text-2xl">✦</span>
          </div>
          <p className="font-body text-lg text-muted-foreground italic">
             days of love, laughter, and celebration
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gold/30 hidden md:block" />

          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center gap-6 mb-12 transform-gpu ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                <div className="card-elegant">
                  <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                    <event.icon className="w-6 h-6 text-gold" />
                    <h3 className="font-display text-xl md:text-2xl text-primary">
                      {event.title}
                    </h3>
                  </div>
                  <p className="font-display text-gold text-lg mb-1">{event.date}</p>
                  <p className="font-body text-muted-foreground mb-2">{event.time}</p>
                  <p className="font-body text-foreground font-medium mb-3">{event.venue}</p>
                  <p className="font-body text-muted-foreground italic">{event.description}</p>
                </div>
              </div>

              {/* Timeline dot */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-primary border-4 border-gold flex items-center justify-center shrink-0">
                <span className="font-display text-cream text-sm">{index + 1}</span>
              </div>

              {/* Spacer for alignment */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsTimeline;
