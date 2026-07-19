import { motion } from "framer-motion";
import goldDivider from "@/assets/floral/9.png";
import bouquet from "@/assets/floral/7.png";

export function Footer() {
  return (
    <footer className="py-32 bg-background relative overflow-hidden border-t border-primary/20">
      <img
        src={bouquet}
        alt=""
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-56 md:w-72 opacity-25 pointer-events-none"
      />
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-serif text-2xl md:text-4xl text-foreground mb-12 leading-relaxed">
            We Can't Wait To <br />
            <span className="text-primary italic">Celebrate With You</span>
          </h2>

          <div className="font-script text-6xl text-primary mb-8">
            Ronnell & Beulah
          </div>

          <img src={goldDivider} alt="" className="h-5 mx-auto mb-8 opacity-90" />

          <p className="font-sans text-xs tracking-[0.3em] uppercase text-foreground/50">
            November 7, 2026
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
