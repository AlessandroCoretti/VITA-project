import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function Products() {
    const { t } = useTranslation();
    const container = useRef(null);

    const products = [
        { name: t('products.p1_name'), category: t('products.p1_cat'), img: "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?q=80&w=2671&auto=format&fit=crop" }, // Pastry
        { name: t('products.p2_name'), category: t('products.p2_cat'), img: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=2574&auto=format&fit=crop" }, // Wine Bottle
    ];

    useGSAP(() => {
        gsap.utils.toArray('.product-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1
            });
        });
    }, { scope: container });

    return (
        <section ref={container} className="py-32 px-6 bg-cream">
            <div className="max-w-7xl mx-auto mb-20 text-center">
                <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">{t('products.title')}</h2>
                <p className="font-sans text-secondary tracking-wider uppercase text-sm">{t('products.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {products.map((p, i) => (
                    <div key={i} className="product-item group cursor-pointer">
                        <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10"></div>
                            <img
                                src={p.img}
                                alt={p.name}
                                loading="lazy"
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                        </div>
                        <div className="flex justify-between items-baseline border-b border-secondary/20 pb-4 group-hover:border-accent transition-colors">
                            <div>
                                <h3 className="text-2xl font-serif text-primary">{p.name}</h3>
                                <p className="text-xs text-secondary uppercase tracking-widest mt-1">{p.category}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
