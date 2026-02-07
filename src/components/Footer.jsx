import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const { t } = useTranslation();
    const container = useRef(null);

    useGSAP(() => {
        gsap.from(".footer-item", {
            scrollTrigger: {
                trigger: container.current,
                start: "top 90%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
        });
    }, { scope: container });

    return (
        <footer ref={container} className="bg-paper text-primary py-24 px-6 md:px-12 border-t border-secondary/20 transition-colors duration-500">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">

                <div className="footer-item">
                    <div
                        aria-label="VITA"
                        className="h-24 w-40 bg-primary hover:opacity-80 transition-all duration-500"
                        style={{
                            maskImage: 'url("/vita-logo.svg")',
                            maskRepeat: 'no-repeat',
                            maskSize: 'contain',
                            maskPosition: 'left center',
                            WebkitMaskImage: 'url("/vita-logo.svg")',
                            WebkitMaskRepeat: 'no-repeat',
                            WebkitMaskSize: 'contain',
                            WebkitMaskPosition: 'left center'
                        }}
                    />
                </div>

                {/* Links */}
                <div className="flex flex-col md:flex-row gap-12 md:gap-24 uppercase tracking-widest text-xs font-medium text-secondary">
                    <div className="footer-item flex flex-col gap-4">
                        <span className="text-accent mb-2">{t('footer.find_us')}</span>
                        <p>{t('footer.address')}</p>
                        <p>+39 06 6922 7268</p>
                    </div>
                    <div className="footer-item flex flex-col gap-4">
                        <span className="text-accent mb-2">{t('footer.hours_title')}</span>
                        <p>{t('footer.hours_days')}</p>
                        <p>{t('footer.hours_time')}</p>
                    </div>
                </div>
            </div>

            <div className="footer-item max-w-7xl mx-auto mt-24 flex justify-between text-[10px] uppercase tracking-wider text-secondary/60">
                <p>{t('footer.rights')}</p>
                <p>{t('footer.designed')}</p>
            </div>
        </footer>
    );
};

export default Footer;
