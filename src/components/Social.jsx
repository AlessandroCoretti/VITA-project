import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram, Heart, MessageCircle, Bookmark, ArrowLeft, MoreHorizontal } from "lucide-react"; // Import more icons
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function Social() {
    const { t } = useTranslation();
    const container = useRef(null);
    const phoneRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top 70%",
            }
        });

        tl.from(".social-text", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        })
            .from(phoneRef.current, {
                y: 100,
                rotation: 5,
                opacity: 0,
                duration: 1.5,
                ease: "power2.out"
            }, "-=0.5");

        // Parallax effect for phone
        gsap.to(phoneRef.current, {
            scrollTrigger: {
                trigger: container.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            },
            y: -50,
            rotation: 0
        });

    }, { scope: container });

    return (
        <section ref={container} className="py-32 bg-[#0C1E30] overflow-hidden flex flex-col items-center relative">
            <div className="text-center mb-16 z-10">
                <h2 className="social-text font-serif text-4xl md:text-6xl text-[#EDEDED] mb-4">{t('social.title')}</h2>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-text inline-flex items-center gap-2 text-[#C19A6B] hover:text-white transition-colors uppercase tracking-[0.2em] text-sm">
                    <Instagram size={18} /> {t('social.handle')}
                </a>
            </div>

            {/* Mockup Container */}
            <div ref={phoneRef} className="relative w-[320px] md:w-[360px] aspect-[9/19] bg-white rounded-[3rem] border-8 border-[#222] shadow-2xl overflow-hidden text-black">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-[#000] rounded-b-xl z-20"></div>

                {/* Status Bar Area */}
                <div className="h-8 bg-white w-full"></div>

                {/* Instagram Header */}
                <div className="flex justify-between items-center px-4 py-2 bg-white border-b border-gray-100 sticky top-0 z-10">
                    <ArrowLeft size={24} />
                    <span className="font-bold text-sm tracking-wide">vita_locale</span>
                    <MoreHorizontal size={24} />
                </div>

                {/* Profile Info */}
                <div className="px-4 py-4 overflow-y-auto h-full pb-20 no-scrollbar">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[2px]">
                            <div className="w-full h-full rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=200&auto=format&fit=crop" alt="Profile" loading="lazy" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="flex gap-4 text-center">
                            <div>
                                <div className="font-bold text-lg">{t('social.posts')}</div>
                                <div className="text-xs text-gray-500">Posts</div>
                            </div>
                            <div>
                                <div className="font-bold text-lg">{t('social.followers')}</div>
                                <div className="text-xs text-gray-500">Followers</div>
                            </div>
                            <div>
                                <div className="font-bold text-lg">{t('social.following')}</div>
                                <div className="text-xs text-gray-500">Following</div>
                            </div>
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="mb-6">
                        <h1 className="font-bold text-sm">{t('social.handle')}</h1>
                        <p className="text-sm whitespace-pre-line leading-tight text-gray-700 mt-1">
                            {t('social.bio')}
                        </p>
                        <a href="#" className="text-[#00376b] text-sm font-semibold mt-1 block">vitalocale.com</a>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mb-6">
                        <button className="flex-1 bg-[#EFEFEF] py-1.5 rounded-lg text-sm font-semibold">Following</button>
                        <button className="flex-1 bg-[#EFEFEF] py-1.5 rounded-lg text-sm font-semibold">Message</button>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-3 gap-0.5">
                        {[
                            "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b",
                            "https://images.unsplash.com/photo-1559339352-11d035aa65de",
                            "https://images.unsplash.com/photo-1554118811-1e0d58224f24",
                            "https://images.unsplash.com/photo-1470337458703-46ad1756a187",
                            "https://images.unsplash.com/photo-1522336572468-971c5430be65",
                            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
                            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
                            "https://images.unsplash.com/photo-1560624052-449f5ddf0c31",
                            "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2"
                        ].map((src, n) => (
                            <div key={n} className="aspect-square bg-gray-100 overflow-hidden relative group">
                                <img src={`${src}?q=80&w=300&auto=format&fit=crop`} alt={`Instagram post ${n + 1}`} loading="lazy" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Nav Mockup */}
                <div className="absolute bottom-0 w-full bg-white border-t py-3 flex justify-around items-center z-20">
                    <div className="w-6 h-6 bg-black rounded-full" /> {/* Home */}
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full" /> {/* Search */}
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-lg" /> {/* Plus */}
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full" /> {/* Reels */}
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=100" alt="User profile" loading="lazy" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            {/* Glow effect behind phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C19A6B] rounded-full opacity-5 blur-[100px] pointer-events-none"></div>
        </section>
    );
}
