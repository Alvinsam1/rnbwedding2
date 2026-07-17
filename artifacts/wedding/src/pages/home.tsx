import { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { CustomCursor } from "@/components/CustomCursor";
import { GoldParticles } from "@/components/GoldParticles";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Countdown } from "@/components/Countdown";
import { Story } from "@/components/Story";

import { RSVP } from "@/components/RSVP";
import { Gallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="custom-cursor-active relative min-h-screen bg-background w-full overflow-hidden text-foreground">
      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <>
          <CustomCursor />
          <GoldParticles />
          <Navigation />
          <Hero />
          <Countdown />
          <Story />
          <RSVP />
          <Gallery />
          <Footer />
        </>
      )}
    </main>
  );
}
