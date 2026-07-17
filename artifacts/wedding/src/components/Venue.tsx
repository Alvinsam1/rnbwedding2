import { motion } from "framer-motion";
import { MapPin, CalendarPlus } from "lucide-react";
import goldDivider from "@/assets/floral/9.png";
import leafAccent from "@/assets/floral/2.png";

export function Venue() {
  return (
    <section id="venue" className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="font-script text-5xl md:text-6xl text-primary mb-4">The Venue</h2>
          <img src={goldDivider} alt="" className="h-6 mx-auto opacity-90" />
        </motion.div>

        <img
          src={leafAccent}
          alt=""
          className="absolute -bottom-10 -right-10 w-40 md:w-56 opacity-15 pointer-events-none"
        />

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="p-10 border border-primary/20 bg-secondary/10">
              <h3 className="font-serif text-3xl md:text-4xl text-primary mb-6">
                Coral Beach Resort Sharjah
              </h3>
              <div className="space-y-4 font-sans text-sm font-light text-foreground/80 leading-relaxed mb-10">
                <p>
                  Sharjah, United Arab Emirates
                </p>
                <p>
                  Join us at this beautiful beachfront resort for an unforgettable evening of celebration.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://maps.app.goo.gl/rnEwf64SwAoKNHGp6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-sans text-xs tracking-[0.1em] uppercase group"
                >
                  <MapPin size={16} className="group-hover:scale-110 transition-transform" />
                  Open in Maps
                </a>
                <a 
                  href="#"
                  className="inline-flex items-center justify-center gap-3 px-6 py-3 border border-foreground/20 text-foreground hover:border-foreground/50 transition-all duration-300 font-sans text-xs tracking-[0.1em] uppercase group"
                >
                  <CalendarPlus size={16} className="group-hover:scale-110 transition-transform" />
                  Add to Calendar
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="w-full md:w-1/2 aspect-square md:aspect-[4/3] bg-secondary/30 border border-primary/10 relative overflow-hidden"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <a
              href="https://maps.app.goo.gl/rnEwf64SwAoKNHGp6"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-foreground/40 hover:text-primary transition-colors font-sans text-sm uppercase tracking-widest"
            >
              <MapPin size={28} />
              Coral Beach Resort Sharjah
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
