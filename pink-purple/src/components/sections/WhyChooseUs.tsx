import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      title: "Tailored for Your Business",
      text: "Every solution we build is customized to match your goals — not a template.",
      color: "bg-neutral-900 text-white",
      span: "col-span-2 row-span-1",
    },
    {
      title: "Real Support",
      text: "You’ll always talk to real humans who care about your success.",
      color: "bg-neutral-100 text-neutral-900",
      span: "col-span-1 row-span-2",
    },
    {
      title: "Transparent Pricing",
      text: "Simple, predictable pricing with no hidden fees or surprises.",
      color: "bg-white text-neutral-900",
      span: "col-span-1 row-span-1",
    },
    {
      title: "Built to Grow",
      text: "Our technology and team scale with you — from first launch to full growth.",
      color: "bg-neutral-800 text-white",
      span: "col-span-2 row-span-1",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section ref={ref} className="py-24 bg-stone-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Why Choose{" "}
            <span className=" text-purple-500">
              Pink & Purple
            </span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            We focus on clarity, quality, and real growth — no buzzwords, no fluff.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-[260px] gap-6"
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{
                scale: 1.02,
                y: -4,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className={`rounded-2xl p-8 ${card.color} ${card.span} flex flex-col justify-between border border-neutral-800`}
            >
              <div>
                <h3 className="text-2xl font-semibold mb-4">{card.title}</h3>
                <p className="text-base text-neutral-400">{card.text}</p>
              </div>

            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
