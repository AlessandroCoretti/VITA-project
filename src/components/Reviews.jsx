import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from 'react-i18next';
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Reviews() {
    const { t } = useTranslation();
    const container = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const reviews = [
        {
            text: t('reviews.r1_text'),
            author: "Andrea Fedeli",
            role: "Cliente"
        },
        {
            text: t('reviews.r2_text'),
            author: "Mirko Benedetti",
            role: "Cliente"
        },
        {
            text: t('reviews.r3_text'),
            author: "Alessandra",
            role: "Cliente"
        }
    ];

    const nextReview = () => {
        const next = (activeIndex + 1) % reviews.length;
        animateChange(next);
    };

    const prevReview = () => {
        const prev = (activeIndex - 1 + reviews.length) % reviews.length;
        animateChange(prev);
    };

    const animateChange = (newIndex) => {
        gsap.to(".review-content", {
            opacity: 0,
            y: -20,
            duration: 0.3,
            onComplete: () => {
                setActiveIndex(newIndex);
                gsap.to(".review-content", {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });
    };

    useGSAP(() => {
        gsap.from(".review-container", {
            scrollTrigger: {
                trigger: container.current,
                start: "top 70%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    }, { scope: container });

    return (
        <section ref={container} className="py-32 px-6 bg-[#0C1E30] text-[#EDEDED] relative overflow-hidden">
            {/* Background Details */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

            <div className="max-w-5xl mx-auto text-center relative z-10 review-container">
                <Quote size={48} className="mx-auto text-accent mb-8 opacity-50" />

                <h2 className="font-serif text-3xl md:text-5xl mb-16 text-white leading-tight">
                    {t('reviews.title')}
                </h2>

                <div className="review-content min-h-[250px] flex flex-col justify-center items-center max-w-3xl mx-auto">
                    <p className="font-serif text-xl md:text-3xl italic leading-relaxed mb-10 text-white/90">
                        "{reviews[activeIndex].text}"
                    </p>

                    <div className="flex flex-col items-center gap-2">
                        <cite className="not-italic font-sans text-lg tracking-[0.2em] uppercase text-accent">
                            {reviews[activeIndex].author}
                        </cite>
                        <span className="text-xs text-white/50 tracking-wider uppercase font-light">
                            {reviews[activeIndex].role}
                        </span>
                    </div>

                    <div className="flex gap-1 mt-6 text-accent">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill="currentColor" />
                        ))}
                    </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-6 mt-16">
                    <button
                        onClick={prevReview}
                        className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-full hover:border-accent hover:text-accent transition-all duration-300 group hover:bg-white/5"
                        aria-label="Previous review"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <button
                        onClick={nextReview}
                        className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-full hover:border-accent hover:text-accent transition-all duration-300 group hover:bg-white/5"
                        aria-label="Next review"
                    >
                        <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-3 mt-8">
                    {reviews.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => animateChange(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-accent w-6' : 'bg-white/20 hover:bg-white/40'}`}
                            aria-label={`Go to review ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
