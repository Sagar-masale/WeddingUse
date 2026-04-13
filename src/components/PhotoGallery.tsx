import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

// Base URL for assets
const baseUrl = import.meta.env.BASE_URL;

// Add your couple photos here
const galleryImages = [
  {
    src: `${baseUrl}Photos/6.jpeg`,
    caption: "A Journey of Love",
  },
  {
    src: `${baseUrl}Photos/2.jpeg`,
    caption: "Cherished Moments",
  },
  {
    src: `${baseUrl}Photos/new.jpeg`,
    caption: "Love in Every Frame",
  },
  {
    src: `${baseUrl}Photos/4.jpeg`,
    caption: "Building Memories Together",
  },
  {
    src: `${baseUrl}Photos/new4.jpeg`,
    caption: "Together Forever",
  },
];

const PhotoGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload all images on mount for smoother transitions
  useEffect(() => {
    galleryImages.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3500); // Change slide every 3.5 seconds
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="wedding-section bg-card">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12 transform-gpu"
        >
          <h2 className="font-display text-3xl md:text-4xl text-primary mb-4">
            Our Journey Together
          </h2>
          <div className="ornate-divider">
            <Heart className="w-6 h-6 text-gold fill-gold" />
          </div>
          <p className="font-body text-lg text-muted-foreground italic">
            Moments that led us here
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative transform-gpu"
        >
          {/* Main Image Container */}
          <div className="relative overflow-hidden rounded-lg gold-border aspect-[4/3] bg-muted">
            <AnimatePresence initial={false}>
              <motion.img
                key={currentIndex}
                src={galleryImages[currentIndex].src}
                alt={galleryImages[currentIndex].caption}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full object-cover will-change-[opacity] transform-gpu"
              />
            </AnimatePresence>

            {/* Caption Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <motion.p
                key={`caption-${currentIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="font-display text-xl text-cream text-center will-change-[opacity] transform-gpu"
              >
                {galleryImages[currentIndex].caption}
              </motion.p>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-cream/90 hover:bg-cream flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-cream/90 hover:bg-cream flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-3 mt-6">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gold w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
          </div>

          {/* Thumbnail Strip */}
          <div className="mt-8 flex gap-3 justify-center overflow-x-auto pb-2">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-transform duration-200 ease-out hover:scale-105 active:scale-95 transform-gpu ${
                  index === currentIndex
                    ? "ring-2 ring-gold ring-offset-2 ring-offset-card"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={image.src}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PhotoGallery;