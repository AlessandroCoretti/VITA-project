import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Sun, Moon } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const location = useLocation();
    const menuRef = useRef(null);

    const changeLanguage = () => {
        const newLang = i18n.language === 'en' ? 'it' : 'en';
        i18n.changeLanguage(newLang);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark-mode');
    };

    const isHome = location.pathname === '/';

    useEffect(() => {
        if (!isHome) {
            setScrolled(true);
            return;
        }

        const handleScroll = () => {
            setScrolled(window.scrollY > window.innerHeight - 100);
        };

        // Initial check
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHome]);

    useGSAP(() => {
        if (isOpen) {
            // FORCE INITIAL STATE - Visible but off-screen (top)
            gsap.set(menuRef.current, { autoAlpha: 1, yPercent: -100 });

            const tl = gsap.timeline();

            // OPEN ANIMATION - Slide DOWN from top
            tl.to(menuRef.current, {
                yPercent: 0,
                duration: 1,
                ease: "power4.inOut"
            })
                .fromTo(".menu-link",
                    { y: 100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
                    "-=0.4"
                )
                .fromTo(".menu-footer",
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                    "-=0.6"
                );

        } else {
            // CLOSE ANIMATION - Slide DOWN to bottom (opposite of entry)
            // Only run if menuRef is actually mounted/visible (avoid initial render trigger)
            if (menuRef.current && gsap.getProperty(menuRef.current, "autoAlpha") === 1) {
                const tl = gsap.timeline();

                tl.to(".menu-link", {
                    y: -50,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.in"
                })
                    .to(menuRef.current, {
                        yPercent: 100, // Exit to bottom
                        duration: 0.8,
                        ease: "power4.inOut"
                    }, "-=0.2")
                    .set(menuRef.current, { autoAlpha: 0, yPercent: -100 }); // RESET for next open
            } else {
                // Ensure hidden on mount
                gsap.set(menuRef.current, { autoAlpha: 0, yPercent: -100 });
            }
        }
    }, [isOpen]);

    const navLinks = [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.menu'), path: '/menu' },
        { name: t('nav.events'), path: '/events' },
        { name: t('nav.contact'), path: '/contact' },
    ];

    return (
        <>
            <nav className={`fixed w-full z-50 p-6 md:p-12 flex justify-between items-center transition-all duration-500 ${scrolled && !isOpen ? 'bg-transparent py-6 text-primary' : 'bg-transparent text-white'}`}>

                {/* Logo - Hides on scroll ONLY on Home page. Always visible on other pages. */}
                <Link to="/" className={`hover:opacity-80 transition-all duration-500 ${isHome && scrolled && !isOpen ? 'opacity-0 -translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                    <div
                        className={`h-12 w-32 transition-colors duration-500 ${isOpen || (isHome && !scrolled) ? 'bg-white' : 'bg-primary'}`}
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
                </Link>

                <div className="flex items-center gap-8">
                    {/* Theme Switcher */}
                    <button onClick={toggleTheme} aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"} className={`hover:text-accent transition-colors ${isOpen ? 'text-white' : ''}`}>
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* Language Switcher - Always Visible */}
                    <button
                        onClick={changeLanguage}
                        aria-label={`Current language: ${i18n.language.toUpperCase()}. Click to switch.`}
                        className={`text-xs font-bold uppercase tracking-widest hover:text-accent transition-all duration-500 opacity-100 ${isOpen ? 'text-white' : ''}`}
                    >
                        {i18n.language}
                    </button>

                    {/* Menu Toggle (Desktop & Mobile) */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Close Menu" : "Open Menu"}
                        className={`flex items-center gap-4 group hover:opacity-80 transition-opacity ${isOpen ? 'text-white' : ''}`}
                    >
                        <span className={`hidden md:block text-xs font-medium tracking-[0.2em] uppercase transition-all duration-500 ${scrolled && !isOpen ? 'opacity-0' : 'opacity-100'}`}>
                            {isOpen ? t('nav.close', 'Close') : t('nav.menu', 'Menu')}
                        </span>
                        <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden">
                            <div className={`absolute transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'rotate-[360deg] opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`}>
                                <Menu size={28} strokeWidth={1} />
                            </div>
                            <div className={`absolute transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-[360deg] opacity-0 scale-50'}`}>
                                <X size={28} strokeWidth={1} />
                            </div>
                        </div>
                    </button>
                </div>
            </nav>

            {/* Fullscreen Overlay Menu - Always rendered, controlled via GSAP */}
            <div
                ref={menuRef}
                className="fixed inset-0 z-40 bg-[#0C1E30] flex flex-col justify-center items-center invisible"
            >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

                <div className="flex flex-col items-center space-y-8 md:space-y-12 z-10 w-full">
                    {navLinks.map((link, index) => (
                        <div key={link.path} className="overflow-hidden">
                            <Link
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className="menu-link block text-3xl md:text-5xl font-serif text-[#EAEAEA] font-light tracking-widest uppercase hover:text-accent transition-colors duration-300 translate-y-[100%]"
                            >
                                {link.name}
                            </Link>
                        </div>
                    ))}

                    <div className="w-12 h-px bg-white/20 my-8"></div>

                    <div className="overflow-hidden">
                        <Link
                            to="/contact"
                            onClick={() => setIsOpen(false)}
                            className="menu-footer block text-lg md:text-xl font-sans tracking-[0.2em] text-white/60 hover:text-[#C19A6B] transition-colors uppercase translate-y-[100%]"
                        >
                            {t('nav.book')}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
