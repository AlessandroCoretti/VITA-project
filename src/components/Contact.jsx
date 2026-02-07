import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from "lucide-react";

export default function Contact() {
    const { t } = useTranslation();
    const container = useRef(null);

    useGSAP(() => {
        gsap.from(".contact-reveal", {
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%"
            },
            y: 30, // Reduced movement for cleaner look
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        });
    }, { scope: container });

    return (
        <section ref={container} className="py-32 px-6 md:px-24 bg-paper text-center flex flex-col justify-center items-center">

            <div className="max-w-4xl w-full">
                <span className="contact-reveal block text-accent text-xs tracking-[0.3em] uppercase mb-6 font-medium">
                    {t('contact.location')}
                </span>

                <h2 className="contact-reveal font-serif text-5xl md:text-7xl text-primary mb-8 leading-tight">
                    {t('contact.title')}
                </h2>

                <p className="contact-reveal text-secondary font-light text-lg mb-12 max-w-xl mx-auto leading-relaxed">
                    {t('contact.desc')}
                </p>

                <div className="contact-reveal flex flex-col md:flex-row gap-8 justify-center items-center">
                    <Link
                        to="/contact"
                        className="group relative px-10 py-5 bg-primary text-paper hover:bg-accent hover:text-white transition-all duration-300 overflow-hidden shadow-lg"
                    >
                        <div className="relative z-10 flex items-center gap-4 font-sans text-sm tracking-[0.2em] uppercase font-bold">
                            {t('contact.cta')}
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    <a href="tel:+390669227268" className="text-secondary hover:text-accent transition-colors text-sm tracking-widest uppercase border-b border-transparent hover:border-accent pb-1 font-medium">
                        +39 06 6922 7268
                    </a>
                </div>
            </div>
        </section>
    );
}
