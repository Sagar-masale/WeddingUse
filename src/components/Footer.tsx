import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Decorative element */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-12 bg-gold/50" />
            <Heart className="w-5 h-5 text-gold fill-gold animate-pulse-slow" />
            <span className="h-px w-12 bg-gold/50" />
          </div>

          <h3 className="font-display text-2xl md:text-3xl text-cream mb-2">
            Vinayak & Shraddha
          </h3>
          <p className="font-body text-lg text-gold italic mb-6">
            #VinayakWedsShraddha
          </p>

          <p className="font-body text-cream/70 mb-4">
            We can't wait to celebrate with you!
          </p>

          <div className="flex items-center justify-center gap-4 text-cream/60">
            <span className="font-body text-sm">
              21st April 2026 • Solapur, Maharashtra
            </span>
          </div>

          <div className="mt-8 pt-8 border-t border-gold/20">
            <p className="font-body text-sm text-cream/50">
              Made with love for our special day
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
