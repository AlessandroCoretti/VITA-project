import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin } from 'lucide-react';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ContactPage = () => {
    const { t } = useTranslation();
    const container = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from(".contact-page-item", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.2
        });
    }, { scope: container });

    return (
        <ReactLenis root>
            <div ref={container} className="bg-paper min-h-screen text-primary flex flex-col items-center justify-center pt-32 pb-20 px-6">

                <div className="max-w-4xl w-full text-center">
                    <h1 className="contact-page-item font-serif text-6xl md:text-8xl mb-8">{t('contact.title')}</h1>
                    <p className="contact-page-item text-secondary text-lg font-light max-w-2xl mx-auto mb-16 leading-relaxed">
                        {t('contact.desc')}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 text-left">
                        <div className="contact-page-item space-y-8">
                            <div className="flex items-start gap-4">
                                <MapPin className="text-accent mt-1" />
                                <div className="contact-page-item">
                                    <h3 className="font-serif text-2xl mb-2 text-primary">{t('contact.location')}</h3>
                                    <p className="text-secondary font-light">Via Principe di Napoli, 7<br />00062 Bracciano (RM)<br />Italy</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone className="text-accent mt-1" />
                                <div className="contact-page-item">
                                    <h3 className="font-serif text-2xl mb-2 text-primary">{t('contact.phone')}</h3>
                                    <p className="text-secondary font-light hover:text-accent cursor-pointer transition-colors">+39 06 6922 7268</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Mail className="text-accent mt-1" />
                                <div className="contact-page-item">
                                    <h3 className="font-serif text-2xl mb-2 text-primary">{t('contact.email')}</h3>
                                    <p className="text-secondary font-light hover:text-accent cursor-pointer transition-colors">info@vita.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Embed */}
                        <div className="w-full h-[400px] border border-cream/20 relative overflow-hidden group">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2960.205815757652!2d12.176096699999997!3d42.103062699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f4e8f4ed00a7b%3A0x2dd43548a75f83d1!2sVita%20-%20Mangiare%2C%20Bere%2C%20Condividere!5e0!3m2!1sit!2sit!4v1770502428894!5m2!1sit!2sit"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                title="Google Map VITA"
                            ></iframe>
                        </div>
                    </div>

                </div>
            </div>
        </ReactLenis>
    );
};

export default ContactPage;
