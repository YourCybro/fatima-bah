'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';

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

// ============================================
// HERO WITH PORTRAIT VIDEO - FIXED
// ============================================
const Hero = () => {
  const targetRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  // FIXED: Changed from [0.25, 0] to [1, 0] so video is fully visible initially
  const videoOpacity = useTransform(scrollYProgress, [0, 0.3], [0.7, 0]);

  return (
    <motion.section 
      ref={targetRef}
      style={{ opacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0D0D0D]"
    >
      {/* Portrait Video Background */}
      <motion.div 
        style={{ opacity: videoOpacity, scale }}
        className="absolute inset-0 w-full h-full"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-full aspect-[9/16] max-w-full">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onLoadedData={() => {
                console.log('Video loaded successfully');
                setIsVideoLoaded(true);
              }}
              onError={(e) => {
                console.error('Video error:', e);
              }}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/fatima-portrait.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Loading spinner */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-[#0D0D0D] flex items-center justify-center z-50">
            <div className="w-12 h-12 border-2 border-[#B88A6A] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* FIXED: Reduced overlay opacity to make video more visible */}
        <div className="absolute inset-0 bg-[#0D0D0D]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/60 via-transparent to-[#0D0D0D]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/40 via-transparent to-[#0D0D0D]/40" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at center, transparent 0%, transparent 50%, rgba(13,13,13,0.6) 100%)'
        }} />
      </motion.div>
      
      {/* Atmospheric Background Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B88A6A] opacity-5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#B88A6A] opacity-5 blur-[120px] rounded-full" />
      </div>

      {/* Hero Content */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        <motion.div variants={fadeUpVariant} className="mb-6">
          <h1 className="text-[clamp(3.5rem,12vw,9rem)] font-light tracking-tight leading-[0.9] mb-0">
            <span className="block text-[#F5EDE3] relative drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
              FATIMA
              <div className="absolute inset-0 blur-xl opacity-30 text-[#B88A6A]" aria-hidden="true">FATIMA</div>
            </span>
            <span className="block text-[#F5EDE3] relative mt-2 drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
              BAH
              <div className="absolute inset-0 blur-xl opacity-30 text-[#B88A6A]" aria-hidden="true">BAH</div>
            </span>
          </h1>
        </motion.div>

        <motion.p 
          variants={fadeUpVariant}
          className="text-[#D6BFAE] text-lg md:text-xl tracking-[0.3em] uppercase font-light mb-16 opacity-90 drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]"
        >
          Beauty · Style · Elegance
        </motion.p>

        <motion.div 
          variants={fadeUpVariant}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-12 py-5 bg-[#B88A6A] text-[#0D0D0D] font-medium tracking-wider overflow-hidden shadow-2xl"
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
            className="px-12 py-5 border-2 border-[#B88A6A] text-[#F5EDE3] font-medium tracking-wider hover:bg-[rgba(184,138,106,0.15)] transition-all duration-300 backdrop-blur-sm shadow-xl"
          >
            VIEW PORTFOLIO
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#B88A6A] to-transparent" />
      </motion.div>

      {/* Mute/Unmute button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        whileHover={{ opacity: 1 }}
        onClick={() => {
          if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(!isMuted);
          }
        }}
        className="absolute bottom-8 right-8 z-20 p-3 bg-[#0D0D0D]/60 backdrop-blur-md border border-[#B88A6A]/30 rounded-full hover:border-[#B88A6A] transition-all duration-300 shadow-xl"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <svg className="w-5 h-5 text-[#F5EDE3]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-[#F5EDE3]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
          </svg>
        )}
      </motion.button>
    </motion.section>
  );
};

// Philosophy Section
const Philosophy = () => {
  return (
    <section className="relative py-32 md:py-48 px-6 bg-[#0D0D0D]">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-light leading-[1.1] text-[#F5EDE3] mb-12 text-center">
            Where beauty meets
            <br />
            <span className="text-[#B88A6A]">timeless elegance.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-16">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <p className="text-[#D6BFAE] text-lg md:text-xl leading-relaxed font-light">
              Style is more than what you wear—it's how you carry yourself, the confidence 
              in your presence, and the grace in every movement.
            </p>
            <p className="text-[#D6BFAE] text-lg md:text-xl leading-relaxed font-light">
              From curated fashion to refined beauty, I celebrate the art of living well. 
              Building a lifestyle brand that inspires sophistication, wellness, and authentic self-expression.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

// Visual Showcase Section
const VisualShowcase = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section ref={targetRef} className="relative py-32 px-6 bg-[#141414] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Video 1 - Fashion */}
            <motion.div
              style={{ y: y1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[9/16] rounded-3xl overflow-hidden bg-[#0D0D0D] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/videos/fatima-fashion.mp4" type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <p className="text-[#F5EDE3] text-sm tracking-[0.2em] uppercase opacity-90 drop-shadow-lg">
                  Fashion
                </p>
                <p className="text-[#D6BFAE] text-xs mt-1 opacity-80">
                  Curated Style
                </p>
              </div>
            </motion.div>

            {/* Video 2 - Beauty */}
            <motion.div
              style={{ y: y2 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[9/16] rounded-3xl overflow-hidden bg-[#0D0D0D] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/videos/fatima-beauty.mp4" type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <p className="text-[#F5EDE3] text-sm tracking-[0.2em] uppercase opacity-90 drop-shadow-lg">
                  Beauty
                </p>
                <p className="text-[#D6BFAE] text-xs mt-1 opacity-80">
                  Timeless Elegance
                </p>
              </div>
            </motion.div>

            {/* Video 3 - Lifestyle */}
            <motion.div
              style={{ y: y3 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[9/16] rounded-3xl overflow-hidden bg-[#0D0D0D] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/videos/fatima-lifestyle.mp4" type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <p className="text-[#F5EDE3] text-sm tracking-[0.2em] uppercase opacity-90 drop-shadow-lg">
                  Lifestyle
                </p>
                <p className="text-[#D6BFAE] text-xs mt-1 opacity-80">
                  Living Well
                </p>
              </div>
            </motion.div>

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
      description: 'Authentic collaborations with luxury beauty and fashion brands that align with sophisticated lifestyle values.',
    },
    {
      title: 'Beauty Campaigns',
      description: 'Refined beauty narratives celebrating self-care, wellness, and timeless elegance for premium beauty houses.',
    },
    {
      title: 'Fashion Editorial',
      description: 'High-fashion content showcasing curated style, designer pieces, and the art of elevated everyday dressing.',
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
      quote: "Fatima brings unparalleled elegance and authenticity to every collaboration. Her sophisticated aesthetic perfectly aligns with luxury brands.",
      author: "Creative Director, Premium Fashion House",
    },
    {
      quote: "Working with Fatima elevated our beauty campaign beyond expectations. She embodies the refined lifestyle our brand represents.",
      author: "Marketing Lead, Luxury Beauty Brand",
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
            Let's Create Something
            <br />
            <span className="text-[#B88A6A]">Beautiful.</span>
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
  const socials = ['Instagram', 'TikTok', 'YouTube', 'SnapChat'];

  return (
    <footer className="relative py-16 px-6 bg-[#0D0D0D] border-t border-[#B88A6A]/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-8">
            {socials.map((social, index) => (
              <motion.a
                key={index}
                href={
                  social === 'Instagram' ? 'https://www.instagram.com/fbxxo/' :
                  social === 'TikTok' ? 'https://www.tiktok.com/@fatimabahxo' :
                  social === 'SnapChat' ? 'https://www.snapchat.com/add/fatimabahxo' :
                  'https://www.youtube.com/@fatimaba'
                }
                target="_blank"
                rel="noopener noreferrer"
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
      <Philosophy />
      <VisualShowcase />
      <ImpactMetrics />
      <PartnershipExperience />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}