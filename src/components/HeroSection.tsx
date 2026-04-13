import { motion } from "framer-motion";
import coupleVideo from "@/assets/design.mp4";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
      >
        <source src={coupleVideo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'var(--gradient-hero)' }}
      />

      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-24 h-24 border-l-2 border-t-2 border-gold opacity-60" />
      <div className="absolute top-4 right-4 w-24 h-24 border-r-2 border-t-2 border-gold opacity-60" />
      <div className="absolute bottom-4 left-4 w-24 h-24 border-l-2 border-b-2 border-gold opacity-60" />
      <div className="absolute bottom-4 right-4 w-24 h-24 border-r-2 border-b-2 border-gold opacity-60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-body text-lg md:text-xl text-gold-light tracking-widest mb-4 transform-gpu"
        >
          WEDDING INVITATION
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-6"
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream tracking-wide text-shadow">
            Vinayak
          </h1>
          <div className="flex items-center justify-center gap-4 my-4">
            <span className="h-px w-12 bg-gold" />
            <span className="font-body text-gold text-3xl italic">&</span>
            <span className="h-px w-12 bg-gold" />
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream tracking-wide text-shadow">
            Shraddha
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          className="font-body text-xl md:text-2xl text-cream/90 italic mb-8 transform-gpu"
        >
          Request the pleasure of your company
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center gap-2 transform-gpu"
        >
          <p className="font-display text-2xl md:text-3xl text-gold tracking-wider">
            21st April 2026
          </p>
          <p className="font-body text-lg text-cream/80">
            Solapur, Maharashtra
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator - moved lower below the content */}
  <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 1.2 }}
  className="absolute left-1/2 -translate-x-1/2 bottom-6 flex flex-col items-center"
>
  {/* Mouse Shape */}
  <div className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center items-start p-1">
    
    {/* Scroll Dot */}
    <motion.div
      animate={{ y: [0, 12, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className="w-1.5 h-1.5 bg-yellow-400 rounded-full"
    />
  </div>

  {/* Optional Text */}
  <p className="text-xs text-gray-400 mt-2 tracking-widest">
    Scroll
  </p>
</motion.div>
    </section>
  );
};

export default HeroSection;
