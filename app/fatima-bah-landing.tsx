'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

// Luxury Animation Variants
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

// Reusable Scroll Reveal Component
const ScrollReveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUpVariant}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Hero Section
const Hero = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <motion.section 
      ref={targetRef}
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0D0D0D]"
    >
      {/* Atmospheric Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B88A6A] opacity-5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#B88A6A] opacity-5 blur-[120px] rounded-full" />
      </div>

      {/* Content */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        <motion.div variants={fadeUpVariant} className="mb-6">
          <h1 className="text-[clamp(3.5rem,12vw,9rem)] font-light tracking-tight leading-[0.9] mb-0">
            <span className="block text-[#F5EDE3] relative">
              FATIMA
              <div className="absolute inset-0 blur-xl opacity-25 text-[#B88A6A]">FATIMA</div>
            </span>
            <span className="block text-[#F5EDE3] relative mt-2">
              BAH
              <div className="absolute inset-0 blur-xl opacity-25 text-[#B88A6A]">BAH</div>
            </span>
          </h1>
        </motion.div>

        <motion.p 
          variants={fadeUpVariant}
          className="text-[#D6BFAE] text-lg md:text-xl tracking-[0.3em] uppercase font-light mb-16 opacity-90"
        >
          Discipline · Beauty · Power
        </motion.p>

        <motion.div 
          variants={fadeUpVariant}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-12 py-5 bg-[#B88A6A] text-[#0D0D0D] font-medium tracking-wider overflow-hidden"
          >
            <span className="relative z-10">WORK WITH ME</span>
            <motion.div 
              className="absolute inset-0 bg-[#D6BFAE]"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-12 py-5 border border-[#B88A6A] text-[#F5EDE3] font-medium tracking-wider hover:bg-[rgba(184,138,106,0.1)] transition-all duration-300"
          >
            VIEW PORTFOLIO
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#B88A6A] to-transparent" />
      </motion.div>
    </motion.section>
  );
};

// Manifesto Section
const Manifesto = () => {
  return (
    <section className="relative py-32 md:py-48 px-6 bg-[#0D0D0D]">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-light leading-[1.1] text-[#F5EDE3] mb-12 text-center">
            Strength is elegance.
            <br />
            <span className="text-[#B88A6A]">Discipline is beauty.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-16">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <p className="text-[#D6BFAE] text-lg md:text-xl leading-relaxed font-light">
              In the intersection of athletic precision and refined aesthetics lies a new standard. 
              Every movement is intentional. Every detail, considered. Every moment, powerful.
            </p>
            <p className="text-[#D6BFAE] text-lg md:text-xl leading-relaxed font-light">
              This is not about following trends. This is about setting them. Building a legacy 
              where strength and grace are not opposites, but partners in elevation.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

// Visual Showcase Section
const VisualShowcase = () => {
  const images = [
    { id: 1, size: 'large', position: 'left' },
    { id: 2, size: 'small', position: 'right-top' },
    { id: 3, size: 'small', position: 'right-bottom' },
  ];

  return (
    <section className="relative py-32 px-6 bg-[#141414]">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Large Image Left */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-[#0D0D0D] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#B88A6A]/20 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-[#F5EDE3] text-sm tracking-[0.2em] uppercase opacity-80">Campaign 01</p>
              </div>
            </motion.div>

            {/* Stacked Images Right */}
            <div className="flex flex-col gap-8 lg:gap-12">
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#0D0D0D] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#B88A6A]/20 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[#F5EDE3] text-sm tracking-[0.2em] uppercase opacity-80">Editorial 02</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#0D0D0D] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#B88A6A]/20 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[#F5EDE3] text-sm tracking-[0.2em] uppercase opacity-80">Collection 03</p>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

// Impact Metrics Section
const ImpactMetrics = () => {
  const metrics = [
    { value: '450K+', label: 'Followers' },
    { value: '1M+', label: 'Monthly Reach' },
    { value: '22+', label: 'Brand Collaborations' },
  ];

  return (
    <section className="relative py-32 md:py-48 px-6 bg-[#0D0D0D]">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8"
        >
          {metrics.map((metric, index) => (
            <motion.div 
              key={index}
              variants={fadeUpVariant}
              className="text-center"
            >
              <div className="relative inline-block">
                <h3 className="text-[clamp(3rem,8vw,5.5rem)] font-light text-[#F5EDE3] leading-none mb-4">
                  {metric.value}
                </h3>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#B88A6A] to-transparent" />
              </div>
              <p className="text-[#D6BFAE] text-sm tracking-[0.3em] uppercase mt-6 opacity-80">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Partnership Experience Section
const PartnershipExperience = () => {
  const services = [
    {
      title: 'Brand Partnerships',
      description: 'Authentic collaborations that align with premium lifestyle values and resonate with an engaged, affluent audience.',
    },
    {
      title: 'Fitness Campaigns',
      description: 'Elite athletic content showcasing discipline, performance, and the pursuit of physical excellence.',
    },
    {
      title: 'Beauty Campaigns',
      description: 'Refined beauty narratives that celebrate sophistication, self-care, and timeless elegance.',
    },
  ];

  return (
    <section className="relative py-32 px-6 bg-[#141414]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-[clamp(2rem,6vw,4rem)] font-light text-[#F5EDE3] text-center mb-20">
            Partnership Experience
          </h2>
        </ScrollReveal>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeUpVariant}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group relative p-10 bg-[#0D0D0D] border border-[#B88A6A]/20 hover:border-[#B88A6A]/50 transition-all duration-500 rounded-2xl"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#B88A6A]/10 via-transparent to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-light text-[#F5EDE3] mb-6">
                  {service.title}
                </h3>
                <p className="text-[#D6BFAE] leading-relaxed font-light">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Testimonials Section
const Testimonials = () => {
  const testimonials = [
    {
      quote: "Fatima brings an unparalleled level of professionalism and authenticity to every collaboration. Her audience engagement is exceptional.",
      author: "Creative Director, Luxury Athleisure Brand",
    },
    {
      quote: "Working with Fatima elevated our campaign beyond expectations. She understands the art of storytelling through movement and aesthetics.",
      author: "Marketing Lead, Premium Beauty House",
    },
  ];

  return (
    <section className="relative py-32 px-6 bg-[#0D0D0D]">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-20"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              variants={fadeUpVariant}
              className="text-center"
            >
              <blockquote className="text-[clamp(1.25rem,3vw,1.75rem)] font-light text-[#F5EDE3] leading-relaxed mb-8 italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-[1px] bg-[#B88A6A]" />
              </div>
              <cite className="text-[#D6BFAE] text-sm tracking-[0.2em] uppercase not-italic opacity-80">
                {testimonial.author}
              </cite>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Final CTA Section
const FinalCTA = () => {
  return (
    <section className="relative py-32 md:py-48 px-6 bg-[#141414]">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-[clamp(2.5rem,8vw,5.5rem)] font-light leading-[1.1] text-[#F5EDE3] mb-16">
            Let's Build Something
            <br />
            <span className="text-[#B88A6A]">Powerful.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-16 py-6 bg-[#B88A6A] text-[#0D0D0D] text-lg font-medium tracking-wider overflow-hidden"
          >
            <motion.div
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(184,138,106,0.3)',
                  '0 0 40px rgba(184,138,106,0.5)',
                  '0 0 20px rgba(184,138,106,0.3)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0"
            />
            <span className="relative z-10">START A CONVERSATION</span>
            <motion.div 
              className="absolute inset-0 bg-[#D6BFAE]"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </ScrollReveal>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const socials = ['Instagram', 'TikTok', 'YouTube'];

  return (
    <footer className="relative py-16 px-6 bg-[#0D0D0D] border-t border-[#B88A6A]/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-8">
            {socials.map((social, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ y: -2 }}
                className="text-[#D6BFAE] text-sm tracking-wider hover:text-[#B88A6A] transition-colors duration-300"
              >
                {social}
              </motion.a>
            ))}
          </div>

          <p className="text-[#D6BFAE] text-sm tracking-wider opacity-60">
            © 2026 Fatima Bah. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main Page Component
export default function FatimaBahLanding() {
  return (
    <main className="relative bg-[#0D0D0D] overflow-x-hidden">
      <Hero />
      <Manifesto />
      <VisualShowcase />
      <ImpactMetrics />
      <PartnershipExperience />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}
