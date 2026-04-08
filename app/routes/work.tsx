import { lazy, Suspense, useRef } from "react";
import type { Route } from "./+types/work";
import { motion, useScroll, useTransform } from "framer-motion";
import { PageSection, PageWrapper } from "~/components/pageWrapper";
import { WORKS } from "~/lib/constants";
import SuspenseUi from "~/components/suspenseUi";
import ContactCTA from "~/components/contactCta";

const WorkCards = lazy(() => import("~/components/workCards"));

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Selected Works — Charles Mbachu | Creative Developer & Full Stack Engineer" },
    {
      name: "description",
      content:
        "Explore the portfolio of Charles Mbachu, a specialized Full Stack Web Developer and Creative Technologist. Featuring high-end interactive experiences, cinematic design, and performant digital solutions.",
    },
    {
      name: "keywords",
      content:
        "web developer, full stack developer, creative engineer, react developer, interactive portfolio, cinematic web, portfolio",
    },
  ];
}

export default function Work() {
  const servicesRef = useRef(null);
  const { scrollYProgress: servicesScroll } = useScroll({
    target: servicesRef,
    offset: ["start end", "end start"],
  });
  const servicesTitleX = useTransform(servicesScroll, [0, 1], ["-0%", "0%"]);
  return (
    <div className="bg-[#0a0a0a] text-white selection:bg-SoftApricot selection:text-black py-4">
      <Suspense fallback={<SuspenseUi />}>
        <PageWrapper>
          <PageSection index={0}>
            <motion.h2
              style={{ x: servicesTitleX }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mx-auto text-sm font-bold tracking-[0.3em] uppercase text-SoftApricot my-10"
            >
              Projects
            </motion.h2>
            <motion.p className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight md:leading-tight lg:leading-tight text-white/90 md:w-4/4">
              Each project I've handled holds sentimental importance and
              showcases my
              <span className="text-SoftApricot leading-relaxed mx-3">
                passion
              </span>
              for expressive art.
            </motion.p>
          </PageSection>
          <PageSection
            index={1}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mt-16 pb-32"
          >
            {WORKS.map((work, idx) => (
              <WorkCards key={idx} work={work} idx={idx} />
            ))}
          </PageSection>
          <ContactCTA title="Ready to start a project?" />
        </PageWrapper>
      </Suspense>
    </div>
  );
}
