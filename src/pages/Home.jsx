import Hero from "../components/Hero";
import About from "../components/About";
import Gallery from "../components/Gallery";
import Products from "../components/Products";
import Social from "../components/Social";
import Contact from "../components/Contact";
import Reviews from "../components/Reviews";
import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { t } = useTranslation();
  const container = useRef();

  useGSAP(() => {
    // 1. Text Line Reveals (The "Magazine" look)
    const textLines = gsap.utils.toArray('.anim-line');
    textLines.forEach((line) => {
      gsap.fromTo(line,
        { y: "100%", opacity: 0, rotationX: -10 },
        {
          y: "0%",
          opacity: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: line,
            start: "top 90%", // Start earlier
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // 2. Image Parallax (Scrubbing)
    const parallaxImages = gsap.utils.toArray('.parallax-img');
    parallaxImages.forEach((img) => {
      gsap.to(img, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: img.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // 3. Stagger Lists (Menu/Details)
    ScrollTrigger.batch(".stagger-item", {
      start: "top 85%",
      onEnter: batch => gsap.fromTo(batch,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "back.out(1.7)" }
      ),
      onLeaveBack: batch => gsap.to(batch, { opacity: 0, y: 30 }) // Optional: fade out on reverse
    });

    // 4. Hero Reveal
    const tl = gsap.timeline();
    tl.fromTo(".hero-title", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" })
      .fromTo(".hero-sub", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=1");

  }, { scope: container });

  return (
    <Layout>
      <div ref={container} className="bg-paper min-h-screen">
        <SEO title="Home" description="VITA - Experience Design." />

        {/* 1. Hero Section - ParallaxBG */}
        <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
              className="w-full h-full object-cover parallax-img scale-110" // Initial scale for parallax room
              alt="Vita Bar Hero"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          <div className="relative z-10 text-center text-white px-6">
            <div className="overflow-hidden">
              <h1 className="hero-title text-7xl md:text-9xl font-serif tracking-wide mb-6">{t('hero.title')}</h1>
            </div>
            <p className="hero-sub text-lg md:text-xl font-light tracking-[0.3em] uppercase opacity-90">{t('hero.subtitle')}</p>
          </div>
        </div>

        {/* 2. Intro Story - Animated Lines */}
        <section className="section-padding bg-white relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <span className="anim-line block text-sm font-bold tracking-[0.3em] text-accent mb-8 uppercase">Est. 2026</span>
            <div className="overflow-hidden mb-12">
              <h2 className="anim-line text-4xl md:text-6xl font-serif text-primary leading-tight">
                {t('intro.title')}
              </h2>
            </div>
            <div className="space-y-8 text-secondary text-xl md:text-2xl leading-relaxed font-light">
              <div className="overflow-hidden"><p className="anim-line">{t('intro.p1')}</p></div>
              <div className="overflow-hidden"><p className="anim-line">{t('intro.p2')}</p></div>
            </div>
          </div>
        </section>

        {/* 3. Atmosphere - Full Width Parallax */}
        <div className="relative h-[90vh] w-full overflow-hidden">
          <div className="absolute inset-0 h-[120%] -top-[10%]"> {/* Container is taller for parallax */}
            <img
              src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1935&auto=format&fit=crop"
              className="w-full h-full object-cover parallax-img"
              alt="Atmosphere"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/95 p-16 md:p-24 text-center max-w-2xl mx-6 shadow-2xl skew-y-0 transform transition-all hover:scale-105 pointer-events-auto">
              <h3 className="anim-line text-3xl font-serif text-primary mb-6">{t('atmosphere.title')}</h3>
              <p className="anim-line text-secondary text-lg">{t('atmosphere.desc')}</p>
            </div>
          </div>
        </div>

        {/* 4. The Taste - Asymmetric & Staggered */}
        <section className="section-padding bg-cream">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="order-2 md:order-1">
              <h2 className="anim-line text-5xl font-serif text-primary mb-16">{t('menu.title')}</h2>
              <ul className="space-y-16">
                <li className="stagger-item border-b border-gray-300 pb-8">
                  <h4 className="text-2xl font-serif mb-3 text-primary">{t('menu.breakfast_t')}</h4>
                  <p className="text-lg text-secondary font-light">{t('menu.breakfast_d')}</p>
                </li>
                <li className="stagger-item border-b border-gray-300 pb-8">
                  <h4 className="text-2xl font-serif mb-3 text-primary">{t('menu.lunch_t')}</h4>
                  <p className="text-lg text-secondary font-light">{t('menu.lunch_d')}</p>
                </li>
                <li className="stagger-item border-b border-gray-300 pb-8">
                  <h4 className="text-2xl font-serif mb-3 text-primary">{t('menu.aperitivo_t')}</h4>
                  <p className="text-lg text-secondary font-light">{t('menu.aperitivo_d')}</p>
                </li>
              </ul>
              <div className="mt-16 stagger-item">
                <Link to="/menu" className="inline-flex items-center gap-4 text-sm tracking-[0.25em] uppercase font-bold text-primary hover:text-accent transition-colors border-b border-primary pb-1 hover:border-accent">
                  {t('menu.button')} <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            <div className="order-1 md:order-2 h-[800px] overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
                className="w-full h-full object-cover parallax-img scale-125"
                alt="Food details"
              />
            </div>
          </div>
        </section>

        {/* 5. The Space - Carousel / Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 h-[70vh]">
          {[
            "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
          ].map((src, i) => (
            <div key={i} className="relative overflow-hidden group">
              <img src={src} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 parallax-img" alt={`Detail ${i}`} />
            </div>
          ))}
        </div>

        {/* 6. Events CTA - High Contrast */}
        {/* 6. Events CTA - High Contrast */}
        <section className="py-48 bg-cream text-primary text-center px-6">
          <div className="max-w-3xl mx-auto">
            <div className="overflow-hidden mb-10"><h2 className="anim-line text-5xl md:text-7xl font-serif">{t('events.title')}</h2></div>
            <div className="overflow-hidden mb-16"><p className="anim-line text-secondary/80 text-xl md:text-2xl font-light">{t('events.desc')}</p></div>
            <div className="anim-line">
              <Link to="/contact" className="inline-block border border-accent px-12 py-5 text-sm tracking-[0.3em] uppercase bg-accent text-white hover:bg-paper hover:text-accent transition-all duration-300">
                {t('events.cta')}
              </Link>
            </div>
          </div>
        </section>

        <Contact />
        <Reviews />

      </div>
    </Layout>
  );
};

export default Home;
