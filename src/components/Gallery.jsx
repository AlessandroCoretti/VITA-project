import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const images = [
    { src: "https://images.unsplash.com/photo-1542181961-9590d0c79dab?q=80&w=2670&auto=format&fit=crop", position: "self-start" },
    { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2670&auto=format&fit=crop", position: "self-center mt-20" },
    { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2670&auto=format&fit=crop", position: "self-end mb-20" },
    { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop", position: "self-start mt-32" },
    { src: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?q=80&w=2535&auto=format&fit=crop", position: "self-center" },
    { src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=2457&auto=format&fit=crop", position: "self-end" },
    { src: "https://images.unsplash.com/photo-1466978913421-dad938661248?q=80&w=2670&auto=format&fit=crop", position: "self-start mt-10" }, // Replaced broken link
    { src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2670&auto=format&fit=crop", position: "self-center mb-10" } // Replaced broken link
];

export default function Gallery() {
    const { t } = useTranslation();
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);

    useGSAP(() => {
        const calculateWidth = () => sectionRef.current.scrollWidth - document.documentElement.clientWidth;

        gsap.to(sectionRef.current, {
            x: () => -calculateWidth(),
            ease: "none",
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: () => `+=${calculateWidth()}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true
            }
        });

        gsap.from(".gallery-title", {
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top 80%",
            },
            y: 30,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out"
        });
    }, { scope: triggerRef });

    return (
        <div ref={triggerRef} className="overflow-hidden bg-paper">
            <div className="absolute top-40 md:top-10 left-6 md:left-10 z-10 pointer-events-none">
                <h3 className="gallery-title font-serif text-2xl text-primary tracking-[0.3em] uppercase opacity-70">
                    {t('gallery.title')}
                </h3>
            </div>

            <div ref={sectionRef} className="flex h-screen w-fit flex-nowrap items-center gap-8 md:gap-16 pl-6 md:px-24">
                {images.map((item, i) => (
                    <div
                        key={i}
                        className={`relative shrink-0 overflow-hidden ${i % 3 === 0 ? 'w-[80vw] md:w-[35vw] h-[55vh]' : i % 3 === 1 ? 'w-[70vw] md:w-[25vw] h-[75vh]' : 'w-[75vw] md:w-[30vw] h-[40vh]'} ${item.position} grayscale hover:grayscale-0 transition-all duration-700`}
                    >
                        <img src={item.src} alt={`Gallery ${i}`} loading="lazy" className="h-full w-full object-cover transform hover:scale-110 transition-transform duration-1000" />
                    </div>
                ))}

                {/* End text - Full screen on mobile to center perfectly */}
                <div className="shrink-0 w-[100vw] md:w-[40vw] h-full flex items-center justify-center md:pr-0">
                    <p className="font-serif text-3xl md:text-5xl text-accent italic text-center text-wrap w-2/3">{t('gallery.end')}</p>
                </div>
            </div>
        </div>
    );
}
