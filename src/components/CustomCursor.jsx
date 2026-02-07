import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CustomCursor = () => {
    const cursorRef = useRef(null);

    useGSAP(() => {
        document.body.style.cursor = 'none';

        const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3.out" });
        const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3.out" });

        const moveShape = (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        window.addEventListener("mousemove", moveShape);

        // Simple scale effect on hover
        const links = document.querySelectorAll('a, button, .hover-trigger');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(cursorRef.current, { scale: 1.5, opacity: 0.8 });
            });
            link.addEventListener('mouseleave', () => {
                gsap.to(cursorRef.current, { scale: 1, opacity: 1 });
            });
        });

        return () => {
            window.removeEventListener("mousemove", moveShape);
            document.body.style.cursor = 'auto';
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-3 h-3 bg-[#C19A6B] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        />
    );
};

export default CustomCursor;
