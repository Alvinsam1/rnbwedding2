import { motion, useScroll, useTransform } from "framer-motion";
import { Camera, FolderOpen } from "lucide-react";
import branchArt from "@assets/Adobe_Express_-_file_1783254795689.png";
import goldDivider from "@/assets/floral/8.png";
import flower from "@/assets/floral/6.png";
import leaf3 from "@/assets/floral/3.png";
import bouquet from "@/assets/floral/5.png";

const DRIVE_URL = "https://drive.google.com/drive/folders/1hI8UYr2n0bLtozlwJPfqxcvJjiqjqlEA?usp=sharing";

export function Gallery() {
  const { scrollY } = useScroll();
  const leftY = useTransform(scrollY, [1200, 2400], [0, -50]);
  const rightY = useTransform(scrollY, [1200, 2400], [0, 50]);

  return (
    <section id="gallery" className="py-32 bg-background relative min-h-screen overflow-hidden">

      {/* Parallax floral accents */}
      <motion.img src={bouquet} alt="" style={{ y: leftY }}
        animate={{ rotate: [0, 3, -3, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-10 top-20 w-36 md:w-56 opacity-15 pointer-events-none" />

      <motion.img src={leaf3} alt="" style={{ y: rightY }}
        animate={{ rotate: [0, -4, 4, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -right-8 top-40 w-32 md:w-44 opacity-20 pointer-events-none" />

      <motion.img src={flower} alt=""
        animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute right-8 bottom-32 w-20 md:w-28 opacity-15 pointer-events-none" />

      <div className="absolute top-20 left-0 w-56 opacity-15 pointer-events-none -scale-x-100">
        <img src={branchArt} alt="" className="w-full h-auto" />
      </div>
      <div className="absolute bottom-20 right-0 w-56 opacity-15 pointer-events-none">
        <img src={branchArt} alt="" className="w-full h-auto rotate-180" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="font-script text-5xl md:text-6xl text-primary mb-4">Gallery</h2>
          <img src={goldDivider} alt="" className="h-6 mx-auto opacity-90 mb-8" />
          <p className="font-sans text-sm tracking-[0.2em] text-foreground/60 uppercase max-w-xl mx-auto">
            Share your favorite moments with us
          </p>
        </motion.div>

        {/* Google Drive upload prompt */}
        <motion.div
          className="max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <a
            href={DRIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center w-full py-10 px-6 border border-dashed border-primary/40 hover:border-primary bg-secondary/10 hover:bg-secondary/20 transition-all duration-500 group"
          >
            <div className="flex flex-col items-center gap-3 group-hover:scale-105 transition-transform duration-500">
              <FolderOpen className="w-10 h-10 text-primary/50 group-hover:text-primary transition-colors duration-300" />
              <span className="font-sans text-sm tracking-widest text-primary/90 uppercase font-medium">
                Upload Your Photos
              </span>
              <span className="font-sans text-xs text-foreground/50 max-w-xs text-center leading-relaxed">
                Click to open our shared Google Drive folder and add your photos from the celebration
              </span>
            </div>
          </a>

          {/* Event-day note */}
          <div className="flex items-center justify-center gap-3 text-foreground/40 mt-5">
            <Camera size={13} />
            <p className="font-sans text-xs tracking-[0.15em] uppercase text-center">
              On the night of November 7 — capture every laugh, every dance, every happy tear
            </p>
            <Camera size={13} />
          </div>
        </motion.div>

        {/* Gallery lives on Google Drive — guests upload and browse there */}
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Camera className="w-12 h-12 text-primary/20 mx-auto mb-6" />
          <p className="font-serif text-2xl text-foreground/30 mb-3">All our memories, in one place</p>
          <p className="font-sans text-xs tracking-[0.2em] text-foreground/30 uppercase">
            Photos and videos live in the shared Google Drive folder above
          </p>
        </motion.div>
      </div>
    </section>
  );
}
