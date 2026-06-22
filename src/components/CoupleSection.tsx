import { motion } from "framer-motion";
import coupleIllustration from "@/assets/3.jpeg";

const CoupleSection = () => {
  return (
    <section className="wedding-section bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12 transform-gpu"
        >
          <h2 className="font-display text-3xl md:text-4xl text-primary mb-4">
            The Happy Couple
          </h2>
          <div className="ornate-divider">
            <span className="text-gold text-2xl">❧</span>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">


        {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex-1 text-center lg:text-left transform-gpu"
          >
            <h3 className="font-display text-2xl md:text-3xl text-primary mb-2">
              Rohan Saravde
            </h3>
            <p className="font-body text-gold text-lg italic mb-4">The Groom</p>
            <p className="font-body text-muted-foreground leading-relaxed max-w-sm mx-auto lg:mr-auto lg:ml-0">
              The beloved son of Mr. Sanjay Vijaykumar Saravde and Mrs. Saravde, Rohan is a sincere, hardworking, and family-oriented gentleman. Known for his warm nature and strong values, he brings joy to those around him.✨ As he begins this beautiful new chapter of life, he looks forward to building a future filled with love, happiness, and togetherness alongside his bride. ❤️💍
            </p>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative shrink-0 transform-gpu"
          >
            <div className="relative w-full max-w-[340px] md:max-w-[400px] aspect-[3/4] flex items-center justify-center mx-auto">
              {/* Decorative frame */}
              <div className="absolute -inset-4 border-2 border-gold/40 rounded-3xl pointer-events-none" />
              <div className="absolute -inset-8 border border-gold/20 rounded-3xl pointer-events-none" />
              <img
                src={coupleIllustration}
                alt="Couple Illustration"
                className="relative w-full h-full object-cover object-center rounded-3xl z-10 animate-float shadow-lg"
                loading="lazy"
                style={{ boxSizing: 'border-box' }}
              />
            </div>
          </motion.div>
          
          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex-1 text-center lg:text-right transform-gpu"
          >
            <h3 className="font-display text-2xl md:text-3xl text-primary mb-2">
              Ambika Bombale
            </h3>
            <p className="font-body text-gold text-lg italic mb-4">The Bride</p>
            <p className="font-body text-muted-foreground leading-relaxed max-w-sm mx-auto lg:ml-auto lg:mr-0">
            Ambika Bombale is a kind-hearted, graceful, and family-oriented woman whose warmth and positivity brighten every moment. With a beautiful blend of tradition and modern values, she is ready to begin a wonderful journey of love, companionship, and lifelong happiness with Rohan. ❤️✨
            </p>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default CoupleSection;
