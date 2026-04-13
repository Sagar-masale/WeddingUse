import HeroSection from "@/components/HeroSection";
import EventsTimeline from "@/components/EventsTimeline";
import CoupleSection from "@/components/CoupleSection";
import VenueSection from "@/components/VenueSection";
import Footer from "@/components/Footer";
import PhotoGallery from "@/components/PhotoGallery";
import AudioPlayer from "@/components/AudioPlayer";
import GuestMessages from "@/components/GuestMessages";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <AudioPlayer volume={0.6} />
      <HeroSection />
      <CoupleSection />
      <EventsTimeline />
      <VenueSection />
      <PhotoGallery />
      <GuestMessages />
      <Footer />
    </main>
  );
};

export default Index;
