import React, { useState, useEffect, useCallback } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollButton = () => {
    const [visible, setVisible] = useState(false);
    const [offset, setOffset] = useState(0);
    const [clicked, setClicked] = useState(false);

    const toggleVisible = useCallback(() => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled === 0) {
            setClicked(false);
        }
        setVisible(scrolled > 500);
    }, []);

    const calculateOffset = useCallback(() => {
        const footer = document.querySelector("footer");
        if (footer) {
            const footerRect = footer.getBoundingClientRect();
            const footerVisibleHeight = Math.max(
                0,
                window.innerHeight - footerRect.top,
            );
            setOffset(Math.min(footerVisibleHeight, footerRect.height));
        }
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        setClicked(true);
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisible);
        window.addEventListener("scroll", calculateOffset);
        return () => {
            window.removeEventListener("scroll", toggleVisible);
            window.removeEventListener("scroll", calculateOffset);
        };
    }, [toggleVisible, calculateOffset]);

    return (
        <AnimatePresence>
            {visible && !clicked && (
                <motion.button
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    className="fixed right-1/2 z-50 translate-x-1/2 transform cursor-pointer rounded-full border border-gray-200 bg-gray-50 p-1 transition-opacity 2xl:right-6 2xl:translate-x-0"
                    initial={{ opacity: 0, bottom: "1.5rem" }}
                    animate={{
                        opacity: 1,
                        bottom: `calc(1.5rem + ${offset}px)`,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    <ChevronUp className="size-8" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollButton;
