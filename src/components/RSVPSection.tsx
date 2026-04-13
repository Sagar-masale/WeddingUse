
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const photos = [
  require("@/assets/Photos/WhatsApp Image 2026-01-25 at 10.47.36 PM.jpeg"),
  require("@/assets/Photos/WhatsApp Image 2026-01-25 at 10.47.36 PM (1).jpeg"),
  require("@/assets/Photos/WhatsApp Image 2026-01-25 at 10.47.35 PM - Copy.jpeg"),
  require("@/assets/Photos/WhatsApp Image 2026-01-25 at 10.47.37 PM.jpeg"),
];

const WEDDING_DATE = new Date("2026-02-22T12:12:00");

function getTimeLeft() {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

const SlideshowSection = () => {
  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 3500);
    return () => clearInterval(slideTimer);
  }, []);

  return (
    <section className="wedding-section bg-card">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8 transform-gpu"
        >
          <h2 className="font-display text-3xl md:text-4xl text-primary mb-4">
            Vinayak & Shraddha
          </h2>
          <div className="ornate-divider">
            <span className="text-gold text-2xl">♥</span>
          </div>
          <p className="font-body text-lg text-muted-foreground italic">
            Counting down to our wedding day!
          </p>
        </motion.div>

        <div className="relative w-full flex justify-center items-center mb-8">
          <div className="w-[320px] h-[400px] md:w-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-lg bg-background flex items-center justify-center relative">
            <AnimatePresence initial={false}>
              <motion.img
                key={index}
                src={photos[index]}
                alt="Couple Slideshow"
                className="absolute inset-0 object-cover w-full h-full will-change-[opacity] transform-gpu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </AnimatePresence>
          </div>
        </div>

        <div className="flex gap-4 justify-center mb-8">
          {photos.map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full border-2 ${i === index ? "bg-gold border-gold" : "bg-muted border-border"}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="flex flex-col items-center">
          <div className="flex gap-6 text-primary text-lg font-display">
            <div>
              <span className="text-3xl md:text-4xl font-bold">{timeLeft.days}</span>
              <span className="block text-xs md:text-sm">Days</span>
            </div>
            <div>
              <span className="text-3xl md:text-4xl font-bold">{timeLeft.hours}</span>
              <span className="block text-xs md:text-sm">Hours</span>
            </div>
            <div>
              <span className="text-3xl md:text-4xl font-bold">{timeLeft.minutes}</span>
              <span className="block text-xs md:text-sm">Minutes</span>
            </div>
            <div>
              <span className="text-3xl md:text-4xl font-bold">{timeLeft.seconds}</span>
              <span className="block text-xs md:text-sm">Seconds</span>
            </div>
          </div>
          <p className="mt-4 text-muted-foreground text-sm">21st April 2026, 12:12 PM</p>
        </div>
      </div>
    </section>
  );
};

export default SlideshowSection;
