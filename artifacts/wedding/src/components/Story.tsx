import { motion, useScroll, useTransform } from "framer-motion";
import branchArt from "@assets/Adobe_Express_-_file_1783254795689.png";
import goldDivider from "@/assets/floral/8.png";
import leaf1 from "@/assets/floral/1.png";
import leaf2 from "@/assets/floral/2.png";
import leaf3 from "@/assets/floral/3.png";
import leaf4 from "@/assets/floral/4.png";
import flower from "@/assets/floral/6.png";
import bouquet from "@/assets/floral/7.png";
import weMet from "@assets/we_met_1783858263104.png";
import firstDate from "@assets/First_date_1783858263102.png";
import theProposal from "@assets/the_proposal_1783858263101.png";
import foreverBegins from "@assets/forever_Begins_1783858263103.png";

const timeline = [
  {
    title: "We Met",
    description: "A chance encounter that changed everything. It started with a shared laugh across a crowded room.",
    image: weMet,
  },
  {
    title: "First Date",
    description: "Coffee turned into dinner, dinner turned into hours of conversation under the stars.",
    image: firstDate,
  },
  {
    title: "The Proposal",
    description: "A quiet moment overlooking the city lights. One knee, one question, one ecstatic yes.",
    image: theProposal,
  },
  {
    title: "Forever Begins",
    description: "The start of our greatest adventure, surrounded by the people we love most.",
    image: foreverBegins,
  }
];

export function Story() {
  const { scrollY } = useScroll();
  const leftLeafY = useTransform(scrollY, [400, 1400], [0, -60]);
  const rightLeafY = useTransform(scrollY, [400, 1400], [0, 60]);
  const flowerY = useTransform(scrollY, [600, 1600], [0, -40]);

  return (
    <section id="story" className="py-32 relative bg-background overflow-hidden">

      {/* Parallax floral corners */}
      <motion.img src={leaf1} alt="" style={{ y: leftLeafY }}
        animate={{ rotate: [0, 4, -4, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-8 top-16 w-32 md:w-44 opacity-25 pointer-events-none" />

      <motion.img src={leaf2} alt="" style={{ y: rightLeafY }}
        animate={{ rotate: [0, -4, 4, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute -right-8 top-32 w-32 md:w-44 opacity-25 pointer-events-none" />

      <motion.img src={flower} alt="" style={{ y: flowerY }}
        animate={{ rotate: [0, 6, -6, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute right-12 top-8 w-20 md:w-28 opacity-20 pointer-events-none" />

      <motion.img src={leaf3} alt=""
        animate={{ y: [0, -12, 0], rotate: [0, 3, -3, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute left-8 bottom-48 w-28 md:w-40 opacity-20 pointer-events-none" />

      <motion.img src={leaf4} alt=""
        animate={{ y: [0, 12, 0], rotate: [0, -3, 3, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute -right-4 bottom-32 w-28 md:w-40 opacity-20 pointer-events-none" />

      <motion.img src={bouquet} alt=""
        animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-24 md:w-36 opacity-15 pointer-events-none" />

      {/* Existing branch accent */}
      <img src={branchArt} alt=""
        className="absolute top-1/4 left-0 w-48 opacity-10 pointer-events-none -scale-x-100" />
      <img src={branchArt} alt=""
        className="absolute bottom-1/4 right-0 w-48 opacity-10 pointer-events-none scale-x-100 rotate-180" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="font-script text-5xl md:text-6xl text-primary mb-4">Our Story</h2>
          <img src={goldDivider} alt="" className="h-6 mx-auto opacity-90" />
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-primary/20 -translate-x-1/2 hidden md:block" />

          {timeline.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={event.title}
                className={`flex flex-col md:flex-row items-center mb-20 last:mb-0 gap-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: index * 0.15 }}
              >
                {/* Text side */}
                <div className="w-full md:w-[45%] flex justify-center px-6 py-4">
                  <div className={`max-w-xs w-full ${isEven ? "md:text-right" : "md:text-left"} text-center`}>
                    <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3">{event.title}</h3>
                    <p className="font-sans text-foreground/60 leading-relaxed font-light text-sm">{event.description}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex flex-col items-center w-[10%] relative z-10">
                  <div className="w-3 h-3 rounded-full bg-primary/40 border border-primary" />
                </div>

                {/* Image side */}
                <div className="w-full md:w-[45%] flex justify-center px-6 py-4">
                  <motion.div
                    className="relative w-full max-w-xs overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute inset-0 border border-primary/20 z-10 pointer-events-none" />
                    <div className="absolute inset-0 bg-background/30 mix-blend-multiply z-[5] pointer-events-none" />
                    <div className="absolute inset-0 z-[6] pointer-events-none"
                      style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(24,8,30,0.7) 100%)" }} />
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full object-cover aspect-[3/4] grayscale-[15%] saturate-[85%] brightness-[0.88] sepia-[12%]"
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
