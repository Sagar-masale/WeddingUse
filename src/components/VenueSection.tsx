import { motion } from "framer-motion";
import { MapPin, Clock, Calendar } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

const VenueSection = () => {
  return (
    <section className="wedding-section bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 border-2 border-gold rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 border-2 border-gold rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12 transform-gpu"
        >
          <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">
            Save The Date
          </h2>
          <div className="ornate-divider">
            <span className="text-gold text-2xl">✧</span>
          </div>
        </motion.div>

        <CountdownTimer />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-10 text-center transform-gpu"
        >
          <h3 className="font-display text-2xl md:text-3xl text-gold mb-6">
            Venue Details
          </h3>
          <div className="flex flex-row justify-center items-start gap-4 flex-wrap md:grid md:grid-cols-3 md:gap-8 md:px-8">
            <div className="flex flex-col items-center min-w-[90px]">
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border-2 border-gold flex items-center justify-center mb-2 md:mb-4">
                <Calendar className="w-5 h-5 md:w-7 md:h-7 text-gold" />
              </div>
              <p className="font-display text-xs md:text-xl text-cream">21st April 2026</p>
              <p className="font-body text-[10px] md:text-base text-cream/70">Tuesday </p>
            </div>
            <div className="flex flex-col items-center min-w-[90px]">
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border-2 border-gold flex items-center justify-center mb-2 md:mb-4">
                <Clock className="w-5 h-5 md:w-7 md:h-7 text-gold" />
              </div>
              <p className="font-display text-xs md:text-xl text-cream">11:45 AM</p>
              <p className="font-body text-[10px] md:text-base text-cream/70">Wedding Muhurat</p>
            </div>
            <div className="flex flex-col items-center min-w-[90px]">
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border-2 border-gold flex items-center justify-center mb-2 md:mb-4">
                <MapPin className="w-5 h-5 md:w-7 md:h-7 text-gold" />
              </div>
              <p className="font-display text-xs md:text-xl text-cream">Hingulambika Sanskrutik Bhavan, Solapur</p>
              <p className="font-body text-[10px] md:text-base text-cream/70">Solapur</p>
            </div>
          </div>

          <motion.a
            href="https://www.google.com/maps/dir/17.6685056,75.9365632/Hingulambika+Sanskrutik+Bhavan,+MWG7%2BW32,+Ganesh+Peth,+Shaniwar+Peth,+Solapur,+Maharashtra+413005/@17.6724268,75.9140356,15z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3bc5da62a409a2c7:0x8268b87ab5cb4543!2m2!1d75.9126396!2d17.6772592?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mt-10 btn-wedding"
          >
            View on Map
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default VenueSection;
