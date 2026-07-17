import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import floralBg from "@assets/ChatGPT_Image_Jul_5,_2026,_04_30_10_PM_1783254787273.png";
import bouquetCorner from "@/assets/floral/5.png";

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background py-28">
      {/* Background Floral Art with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${floralBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </motion.div>

      <img src={bouquetCorner} alt=""
        className="absolute -bottom-8 -left-8 w-48 md:w-72 opacity-60 pointer-events-none z-[1]" />
      <img src={bouquetCorner} alt=""
        className="absolute -top-8 -right-8 w-48 md:w-72 opacity-60 pointer-events-none z-[1] rotate-180" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl mx-auto gap-5">

        <motion.p
          className="font-serif italic text-primary/80 text-xl md:text-2xl"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Save the Date
        </motion.p>

        <motion.h1
          className="font-script text-6xl md:text-8xl lg:text-[9rem] text-foreground leading-none"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
        >
          <span className="block">Ronnell</span>
          <span className="block text-primary text-4xl md:text-6xl my-2">&amp;</span>
          <span className="block">Beulah</span>
        </motion.h1>

        <motion.div
          className="space-y-1"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <p className="font-sans text-sm md:text-base tracking-[0.3em] uppercase text-foreground/80">
            For the celebration of their marriage
          </p>
          <p className="font-serif text-2xl md:text-3xl text-primary">
            Saturday, November 7, 2026 · 5:00 PM
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="w-px h-8 bg-primary/30 mx-auto"
          initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        />

        {/* Venue details */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <div className="text-center">
            <p className="font-serif text-lg md:text-xl text-foreground/90">
              Coral Beach Resort Sharjah
            </p>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-foreground/50 mt-1">
              Sharjah, United Arab Emirates
            </p>
          </div>

          <a
            href="https://maps.app.goo.gl/rnEwf64SwAoKNHGp6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 border border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 font-sans text-xs tracking-[0.2em] uppercase group"
          >
            <MapPin size={14} className="group-hover:scale-110 transition-transform" />
            View on Map
          </a>
        </motion.div>
      </div>
    </section>
  );
}
