import { motion } from "framer-motion";
import { Link } from "react-router";
import { WORKS } from "~/lib/constants";
import { ArrowUpRight } from "lucide-react";

type Props = {
  work: (typeof WORKS)[0];
  idx: number;
};

export default function WorkCards({ work, idx }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
        delay: (idx % 2) * 0.1,
      }}
      className={`group relative flex flex-col gap-6 ${
        idx % 2 === 1 ? "md:mt-32" : ""
      }`}
    >
      {/* Media Container */}
      <Link
        to={`/work/${work.client.split(" ").join("-").toLowerCase()}`}
        className="relative block aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-2xl bg-white/5 border border-white/5"
      >
        <motion.img
          src={work.image}
          alt={work.client}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Subtle Overlay on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Floating "View Case Study" tag - revealed on hover */}
        <div className="absolute top-6 right-6 overflow-hidden">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md text-black px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase translate-y-20 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            Case Study <ArrowUpRight size={14} />
          </div>
        </div>
      </Link>

      {/* Info Container */}
      <div className="flex flex-col gap-2 px-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-white group-hover:text-SoftApricot transition-colors duration-300">
            {work.client}
          </h3>
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">
            {String(idx + 1).padStart(2, "0")}
          </span>
        </div>
        
        <p className="text-sm font-medium text-white/50 tracking-wide uppercase">
          {work.role}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
          {work.stack.slice(0, 3).map((tech) => (
            <span 
              key={tech} 
              className="text-[9px] font-bold tracking-widest uppercase text-white/40 border border-white/10 px-3 py-1 rounded-full bg-white/5"
            >
              {tech}
            </span>
          ))}
          {work.stack.length > 3 && (
            <span className="text-[9px] font-bold tracking-widest uppercase text-white/20 px-1 py-1">
              +{work.stack.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
