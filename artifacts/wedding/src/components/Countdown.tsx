import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import branchArt from "@assets/Adobe_Express_-_file_1783254795689.png";
import leaf1 from "@/assets/floral/1.png";
import leaf2 from "@/assets/floral/2.png";
import goldDivider from "@/assets/floral/9.png";

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  const { scrollY } = useScroll();
  const leftY = useTransform(scrollY, [200, 800], [0, -40]);
  const rightY = useTransform(scrollY, [200, 800], [0, 40]);

  useEffect(() => {
    const targetDate = new Date("2026-11-07T17:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) { clearInterval(interval); return; }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const items = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds }
  ];

  return (
    <section className="py-28 relative overflow-hidden bg-secondary/30">
      {/* Parallax florals */}
      <motion.img src={leaf1} alt=""
        className="absolute -left-10 top-0 w-36 md:w-48 opacity-20 pointer-events-none"
        style={{ y: leftY }}
        animate={{ rotate: [0, 3, -3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img src={leaf2} alt=""
        className="absolute -right-10 bottom-0 w-36 md:w-48 opacity-20 pointer-events-none rotate-180"
        style={{ y: rightY }}
        animate={{ rotate: [180, 177, 183, 180] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <div className="absolute top-0 right-0 w-56 opacity-15 transform rotate-180 pointer-events-none">
        <img src={branchArt} alt="" className="w-full h-auto" />
      </div>

      <div className="container mx-auto px-4">
        {/* Numbers first */}
        <motion.div
          className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16 mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          {items.map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <span className="font-serif text-6xl md:text-8xl text-primary font-light tracking-wider tabular-nums">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="font-sans uppercase tracking-[0.3em] text-xs mt-3 text-foreground/70">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* "Until We Say I Do" below the numbers */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <img src={goldDivider} alt="" className="h-5 mx-auto mb-6 opacity-80" />
          <p className="font-serif italic text-primary/80 text-2xl md:text-3xl mb-2">Until We Say</p>
          <h2 className="font-script text-6xl md:text-8xl text-foreground">I Do</h2>
        </motion.div>
      </div>
    </section>
  );
}
