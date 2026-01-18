import { memo, useMemo } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Star } from "lucide-react";

const TestimonyCard = memo(
  ({
    name,
    role,
    company,
    testimony,
    rating,
    delay = 0,
  }: {
    name: string;
    role: string;
    company: string;
    testimony: string;
    rating: number;
    delay?: number;
  }) => (
    <m.div
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
      className="group relative h-full p-10 rounded-3xl bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-sm shadow-lg border border-white/50 hover:border-pink-300/50 transition-all duration-300 cursor-default"
    >
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

      {/* Star rating */}
      <div className="flex gap-1 mb-6">
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 fill-yellow-400 text-yellow-400"
            strokeWidth={1.5}
          />
        ))}
      </div>

      {/* Testimony text */}
      <p className="text-slate-700 text-base leading-relaxed mb-10 flex-grow min-h-24 italic text-lg font-light">
        "{testimony}"
      </p>

      {/* Author info */}
      <div className="border-t-2 border-gradient-to-r from-purple-200 via-transparent to-pink-200 pt-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg">
            {name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-slate-900 text-base">{name}</p>
            <p className="text-sm text-slate-600">{role}</p>
          </div>
        </div>
        <p className="text-sm text-pink-600 font-semibold ml-15">
          {company}
        </p>
      </div>
    </m.div>
  )
);
TestimonyCard.displayName = "TestimonyCard";

export default memo(function TestimoniesSection() {
  const testimonies = useMemo(
    () => [
      {
        name: "Sarah Johnson",
        role: "Founder & CEO",
        company: "TechHub Solutions",
        testimony:
          "The process was incredibly smooth. Within two weeks, my business was officially registered and I was able to open a business bank account. The team's guidance was invaluable.",
        rating: 5,
      },
      {
        name: "Thabo Mthembu",
        role: "Business Owner",
        company: "Creative Designs Co.",
        testimony:
          "I was overwhelmed by all the paperwork, but this service made everything simple. They handled every detail and kept me informed throughout. Highly recommended for anyone starting out.",
        rating: 5,
      },
      {
        name: "Amelia Foster",
        role: "Entrepreneur",
        company: "Digital Marketing Experts",
        testimony:
          "Professional, efficient, and stress-free. I got my registration sorted in record time, and the transparency with pricing was refreshing. Best investment for my business.",
        rating: 5,
      },
    ],
    []
  );

  const fadeIn = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px", amount: 0.2 },
    transition: { duration: 0.3, ease: "easeOut" },
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <section className="relative py-32 bg-gradient-to-b from-neutral-900 via-slate-900 to-neutral-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <m.div
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"
          />
          <m.div
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-12">
          <m.div {...fadeIn} className="text-center mb-20">
            <m.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-block px-4 py-2 rounded-full bg-pink-600/10 border border-pink-600/20 text-pink-400 font-semibold mb-6"
            >
              Client Stories
            </m.div>

            <m.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-black text-white mb-6"
            >
              Real Businesses,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 animate-pulse">
                Real Results.
              </span>
            </m.h2>

            <m.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed"
            >
              Hear from entrepreneurs who've already made their business official
            </m.p>
          </m.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {testimonies.map((testimony, index) => (
              <TestimonyCard
                key={index}
                name={testimony.name}
                role={testimony.role}
                company={testimony.company}
                testimony={testimony.testimony}
                rating={testimony.rating}
                delay={index * 0.1}
              />
            ))}
          </div>

          {/* Bottom accent */}
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 text-center"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex -space-x-3">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-neutral-900 flex items-center justify-center text-white text-xs font-bold"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <p className="text-white font-semibold">
                Join 100+ satisfied businesses
              </p>
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
});
