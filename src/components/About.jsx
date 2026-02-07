import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t } = useTranslation();
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });

    tl.from(".about-title", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })
      .from(".about-para", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.5")
      .from(".about-divider", {
        width: 0,
        duration: 1,
        ease: "power3.inOut"
      }, "-=0.8")
      .from(".about-image-container", {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
      }, "-=1");

  }, { scope: container });

  return (
    <section ref={container} className="min-h-screen flex flex-col md:flex-row items-center justify-center py-24 px-6 md:px-24 bg-paper relative overflow-hidden">

      {/* Editorial Text */}
      <div className="w-full md:w-1/2 flex flex-col justify-center z-10 md:pr-12 mb-12 md:mb-0">
        <h2 className="about-title font-serif text-4xl md:text-7xl mb-8 leading-tight text-primary">
          {t('intro.title')}
        </h2>
        <div className="font-sans text-secondary text-lg leading-relaxed max-w-md space-y-6">
          <p className="about-para">
            {t('intro.p1')}
          </p>
          <p className="about-para">
            {t('intro.p2')}
          </p>
        </div>
        <div className="about-divider w-24 h-px bg-accent mt-10"></div>
      </div>

      {/* Image */}
      <div className="about-image-container w-full md:w-1/2 h-[60vh] md:h-[80vh] overflow-hidden relative">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
          alt="Interior Ambience"
          loading="lazy"
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
        />
      </div>
    </section>
  );
}
