import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Reveal Logo
    tl.fromTo(textRef.current, {
      y: 100,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power4.out",
      delay: 0.5
    })
      .from(".hero-sub", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8");

  }, { scope: containerRef });

  const title = t('hero.title');

  return (
    <div ref={containerRef} className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-[#0C1E30]">
      {/* 4K Quality Background Image - Fashion/Luxury Dark Aesthetic */}
      <div
        className="absolute inset-0 opacity-60 bg-[url('https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center will-change-transform"
        style={{ filter: "grayscale(100%) contrast(110%) brightness(0.8)" }}
      ></div>

      {/* Gradient Removed */}\n      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-paper"></div> */}

      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <div className="overflow-hidden mb-6">
          <img
            ref={textRef}
            src="/vita-logo.svg"
            alt="VITA Restaurant Logo"
            className="h-[30vh] w-auto brightness-0 invert opacity-0 translate-y-10"
          />
        </div>

        <p className="hero-sub text-sm md:text-xl text-accent tracking-[0.5em] uppercase font-light">
          {t('hero.subtitle')}
        </p>
      </div>
    </div>
  );
}
