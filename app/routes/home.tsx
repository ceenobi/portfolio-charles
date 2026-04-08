import { Suspense, lazy, useRef } from "react";
import type { Route } from "./+types/home";
import SuspenseUi from "~/components/suspenseUi";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Sparkles, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { SERVICES, WORKS } from "~/lib/constants";
import { useInView } from "framer-motion";
import { useEffect } from "react";

const ContactCTA = lazy(() => import("~/components/contactCta"));
import { Link } from "react-router";
const MotionLink = motion.create(Link);

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Charles Mbachu — Creative Web Developer & Full Stack Engineer" },
    {
      name: "description",
      content:
        "Portfolio of Charles Mbachu — a premium Full Stack Web Developer and Creative Technologist. Building immersive, performant, and cinematic digital experiences for the modern web.",
    },
    {
      name: "keywords",
      content:
        "web developer, full stack developer, creative engineer, react developer, nextjs, frontend developer, ui/ux design, motion design, lagos developer, portfolio",
    },
    {
      property: "og:title",
      content: "Charles Mbachu — Creative Web Developer & Full Stack Engineer",
    },
    {
      property: "og:description",
      content:
        "Immersive digital experiences and high-performance full-stack web applications.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
}

export default function Home() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const workRef = useRef(null);
  const carouselRef = useRef(null);
  const [workIndex, setWorkIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Auto-play logic
  const isCarouselInView = useInView(carouselRef, { amount: 0.3 });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoplay && isCarouselInView) {
      interval = setInterval(() => {
        setWorkIndex((prev) => (prev + 1) % WORKS.length);
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [isAutoplay, isCarouselInView]);

  // Hero Parallax
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);

  // About Parallax
  const { scrollYProgress: aboutScroll } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });
  const aboutTitleY = useTransform(aboutScroll, [0, 1], ["50%", "-50%"]);
  const aboutTextY = useTransform(aboutScroll, [0, 1], ["-15%", "15%"]);

  // Services Section Stacking Parallax
  const { scrollYProgress: servicesScroll } = useScroll({
    target: servicesRef,
    offset: ["start start", "end end"],
  });

  const servicesYTransforms = [
    useTransform(servicesScroll, [0, 0.33], ["0%", "0%"]),
    useTransform(servicesScroll, [0.33, 0.66], ["0%", "0%"]),
    useTransform(servicesScroll, [0.66, 1], ["0%", "0%"]),
  ];

  // About Text Reveal Parallax
  const aboutWords =
    "I’m not here to chase trends or talk in circles. I care about the work — how it looks, how it feels, and how it holds up years from now.".split(
      " ",
    );

  // Hero Layered Transforms
  const heroTextX = useTransform(heroScroll, [0, 1], ["0%", "15%"]);
  const heroAssetRotate = useTransform(heroScroll, [0, 1], [0, 45]);
  const heroAssetScale = useTransform(heroScroll, [0, 1], [1, 1.2]);

  // Work Section Parallax (Title area)
  const { scrollYProgress: workScroll } = useScroll({
    target: workRef,
    offset: ["start end", "end start"],
  });
  const workTitleX = useTransform(workScroll, [0, 1], ["0%", "10%"]);

  // Work Section Cinematic Hero (OUR WORK)
  const { scrollYProgress: ourWorkScroll } = useScroll({
    target: workRef,
    offset: ["start end", "end end"],
  });
  const ourWorkScale = useTransform(ourWorkScroll, [0, 0.5, 1], [1, 1, 0.95]);
  const ourWorkOpacity = useTransform(
    ourWorkScroll,
    [0, 0.2, 0.5, 0.7, 1],
    [0, 0.5, 1, 0.25, 0.25],
  );
  // Blur starts high when entering viewport, becomes clear when fully in view and stays clear
  const ourWorkBlurRadius = useTransform(
    ourWorkScroll,
    [0, 0.2, 0.4, 1],
    [12, 6, 0, 0],
  );
  const ourWorkY = useTransform(ourWorkScroll, [0.3, 1], ["0%", "30%"]);
  const ourWorkFilter = useMotionTemplate`blur(${ourWorkBlurRadius}px)`;

  // Cross-section depth transition (Services -> Work)
  const { scrollYProgress: transitionScroll } = useScroll({
    target: workRef,
    offset: ["start end", "start center"],
  });
  const servicesScale = useTransform(transitionScroll, [0, 1], [1, 0.95]);
  const servicesOpacity = useTransform(transitionScroll, [0, 1], [1, 0.1]);
  const servicesYOut = useTransform(transitionScroll, [0, 1], ["0%", "-10%"]);

  return (
    <div className="bg-[#0a0a0a] text-white selection:bg-SoftApricot selection:text-black overflow-hidden relative font-sans">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[120vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background Layered Typography */}
        <motion.div
          style={{ x: heroTextX, opacity: 0.03 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <h1 className="text-[35vw] font-black uppercase tracking-tighter leading-none">
            CREATIVE
          </h1>
        </motion.div>

        <motion.div
          style={{
            scale: heroAssetScale,
            opacity: heroOpacity,
            rotate: heroAssetRotate,
          }}
          className="absolute inset-0 flex items-center justify-center z-0"
        >
          <img
            src="/hero-asset.png"
            alt="Hero Tech Asset"
            className="w-full max-w-2xl h-auto opacity-40 blur-sm md:blur-none transition-all duration-1000"
          />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-xs font-bold tracking-[0.3em] uppercase text-SoftApricot mb-8">
              Available for you {new Date().getFullYear()}
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] uppercase mb-8">
              Charles <br /> Mbachu
            </h1>
            <p className="text-lg md:text-2xl font-light tracking-[0.2em] opacity-60 uppercase max-w-2xl mx-auto">
              Creative Developer{" "}
              <span className="mx-2 text-SoftApricot">/</span> Full Stack
              Engineer
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-30">
            Explore
          </span>
          <div className="w-px h-12 bg-linear-to-b from-SoftApricot/50 to-transparent" />
        </motion.div>
      </section>

      {/* About Section — Cinematic Reveal */}
      <section
        ref={aboutRef}
        id="about"
        className="py-60 px-6 md:px-12 lg:px-24 bg-[#0a0a0a] relative z-10"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <span className="w-8 h-px bg-SoftApricot/50" />
                <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-SoftApricot">
                  001 / Philosophy
                </h2>
              </motion.div>
            </div>

            <div className="lg:col-span-9">
              <p className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                {aboutWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0.1 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.02 }}
                    viewport={{ margin: "-20%" }}
                    className="inline-block mr-[0.2em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="mt-16 flex items-center gap-8"
              >
                <div className="text-sm font-medium text-white/40 tracking-widest uppercase">
                  Hire me
                </div>
                <div className="h-px flex-1 bg-white/5" />
                <div className="text-sm font-medium text-SoftApricot tracking-widest uppercase">
                  Remote friendly
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section — Stacking Cards */}
      <section
        ref={servicesRef}
        id="services"
        className="relative z-10 bg-[#0a0a0a] pb-40"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="mb-32 flex items-end justify-between">
            <div>
              <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-SoftApricot mb-6">
                002 / Expertise
              </h2>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                Solutions that <br /> bridge the gap.
              </h3>
            </div>
          </div>

          <div className="flex flex-col gap-0 px-0 md:px-12">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="sticky top-[15vh] w-full min-h-[60vh] mb-[10vh] last:mb-0 group"
              >
                <div className="relative h-full w-full rounded-[3rem] p-8 md:p-16 overflow-hidden bg-white/2 border border-white/10 backdrop-blur-3xl shadow-2xl transition-all duration-700 group-hover:border-SoftApricot/30">
                  {/* Glass Background Highlight */}
                  <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-SoftApricot/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                  <div className="relative z-10 h-full flex flex-col md:flex-row gap-12 items-start justify-between">
                    <div className="max-w-xl">
                      <span className="text-SoftApricot font-mono text-sm mb-4 block opacity-50">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 group-hover:text-SoftApricot transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-light mb-12">
                        {service.description}
                      </p>

                      <div className="flex flex-wrap gap-3">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold tracking-widest uppercase text-white/50 group-hover:text-white group-hover:border-SoftApricot/20 transition-all"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="hidden md:flex flex-col items-end gap-4 text-right self-end opacity-20 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="text-[8vw] font-black leading-none select-none">
                        {service.title.split(" ")[0]}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Section — True 3D Parallax Unified Architecture */}
      <section
        ref={workRef}
        id="work"
        className="relative z-10 w-full bg-[#0a0a0a] rounded-t-[3rem] md:rounded-t-[5rem] -mt-24 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
      >
        {/* Layer 1 (Background): fixed Focal Text */}
        {/* It pins to the top and stays behind the cards until the section ends */}
        <div className="fixed top-0 h-screen w-full flex items-center justify-center pointer-events-none z-0">
          <motion.div
            style={{
              scale: ourWorkScale,
              opacity: ourWorkOpacity,
              filter: ourWorkFilter,
              y: ourWorkY,
            }}
            className="relative w-full max-w-4xl px-4"
          >
            {/* Corner camera crop marks */}
            <div className="absolute -top-16 -left-8 md:-left-16 w-8 md:w-16 h-8 md:h-16 border-t border-l border-white/20" />
            <div className="absolute -top-16 -right-8 md:-right-16 w-8 md:w-16 h-8 md:h-16 border-t border-r border-white/20" />
            <div className="absolute -bottom-16 -left-8 md:-left-16 w-8 md:w-16 h-8 md:h-16 border-b border-l border-white/20" />
            <div className="absolute -bottom-16 -right-8 md:-right-16 w-8 md:w-16 h-8 md:h-16 border-b border-r border-white/20" />

            {/* Center tracking marks */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-white/20 text-xl font-light">
              +
            </div>
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-white/20 text-xl font-light">
              +
            </div>

            <h2 className="text-[20vw] md:text-[16vw] xl:text-[14vw] font-black uppercase leading-[0.8] tracking-tighter text-white text-center">
              MY
              <br />
              WORK
            </h2>
          </motion.div>
        </div>

        {/* Layer 2 (Foreground): The Stacking Deck */}
        <div className="relative z-10 w-full pt-[40vh] pb-40">
          <div className="max-w-[1350px] mx-auto px-6 md:px-12 lg:px-24 mb-20 border-b border-white/5 pb-8">
            <div className="flex justify-between items-center">
              <motion.h2
                style={{ x: workTitleX }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm font-bold tracking-[0.3em] uppercase text-SoftApricot whitespace-nowrap"
              >
                003 / Selected Work
              </motion.h2>
              <MotionLink
                to="/work"
                prefetch="intent"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="hidden text-sm font-bold tracking-[0.2em] uppercase text-white hover:text-SoftApricot transition-colors md:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-SoftApricot/50"
                aria-label="View all projects in the work archive"
              >
                View <span className="hidden md:block">Archive</span>{" "}
                <ArrowUpRight size={16} />
              </MotionLink>
            </div>
          </div>

          {/* Manual Stack Interaction Area */}
          {/* Apple-inspired Horizontal Carousel */}
          <div
            ref={carouselRef}
            className="relative w-full overflow-hidden"
          >
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
              <div className="relative h-[70vh] md:h-[80vh] w-full items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={workIndex}
                    initial={{ opacity: 0, x: 100, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -100, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex flex-col lg:flex-row items-center gap-12"
                  >
                    {/* Visual Side */}
                    <div className="relative w-full lg:w-3/5 h-[40vh] lg:h-full rounded-[2.5rem] md:rounded-[4rem] overflow-hidden group">
                      <motion.img
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        src={WORKS[workIndex].image}
                        alt={WORKS[workIndex].client}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Floating Site Link */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="absolute bottom-8 right-8 z-20"
                      >
                        <a
                          href={WORKS[workIndex].site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-2xl"
                        >
                          <ArrowUpRight size={24} />
                        </a>
                      </motion.div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full lg:w-2/5 flex flex-col justify-center gap-8 lg:pr-12">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                      >
                        <span className="text-SoftApricot font-mono text-xs tracking-[0.4em] uppercase opacity-60">
                          {String(workIndex + 1).padStart(2, "0")} / {String(WORKS.length).padStart(2, "0")}
                        </span>
                        <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                          {WORKS[workIndex].client.split(" ").map((word, i) => (
                            <span key={i} className={i % 2 === 1 ? "text-white/30 block" : "block"}>
                              {word}
                            </span>
                          ))}
                        </h3>
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap gap-3"
                      >
                        <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest uppercase text-white/50">
                          {WORKS[workIndex].role}
                        </span>
                        {WORKS[workIndex].stack?.slice(0, 3).map((s) => (
                          <span key={s} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest uppercase text-white/30">
                            {s}
                          </span>
                        ))}
                      </motion.div>

                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-md"
                      >
                        {WORKS[workIndex].desc}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <MotionLink
                          to={`/work/${WORKS[workIndex].client.split(" ").join("-").toLowerCase()}`}
                          className="inline-flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase group"
                        >
                          <span className="relative pb-1">
                            Explore Case Study
                            <span className="absolute bottom-0 left-0 w-full h-px bg-SoftApricot origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                          </span>
                          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                            <ChevronRight size={16} />
                          </div>
                        </MotionLink>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Enhanced Controls */}
              <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-12 border-t border-white/5 pt-12">
                {/* Manual Navigation */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setWorkIndex((prev) => (prev - 1 + WORKS.length) % WORKS.length)}
                    className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group"
                  >
                    <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => setWorkIndex((prev) => (prev + 1) % WORKS.length)}
                    className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group"
                  >
                    <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <div className="w-px h-8 bg-white/10 mx-2" />
                  
                  <button
                    onClick={() => setIsAutoplay(!isAutoplay)}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors"
                    aria-label={isAutoplay ? "Pause Autoplay" : "Play Autoplay"}
                  >
                    {isAutoplay ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                </div>

                {/* Scrubber Style Indicators */}
                <div className="flex gap-3">
                  {WORKS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setWorkIndex(i)}
                      className="group relative py-4"
                      aria-label={`Go to project ${i + 1}`}
                    >
                      <div className="h-0.5 w-12 md:w-16 bg-white/10 rounded-full overflow-hidden transition-all duration-500 group-hover:bg-white/20">
                        {i === workIndex && (
                          <motion.div
                            layoutId="indicator"
                            className="h-full bg-SoftApricot"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: isAutoplay ? 6 : 0.8, ease: "linear" }}
                          />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Contact Footer */}
      <Suspense fallback={<SuspenseUi />}>
        <ContactCTA title="Got a vision? Let's bring it to life." />
      </Suspense>
    </div>
  );
}
