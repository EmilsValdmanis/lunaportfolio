import React, { useState, useEffect, useCallback } from "react";
import { ChevronUp } from "lucide-react";

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

    if (clicked) {
        return null;
    }

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className={`fixed bottom-4 right-1/2 z-50 translate-x-1/2 transform cursor-pointer rounded-full border border-gray-200 bg-gray-50 p-1 transition-opacity 2xl:bottom-8 2xl:right-8 2xl:translate-x-0 ${
                visible ? "opacity-100" : "opacity-0"
            }`}
            style={{
                transform: `translateY(-${offset}px)`,
                transition: "transform 0.15s ease-out",
            }}
        >
            <ChevronUp className="size-8" />
        </button>
    );
};

export default ScrollButton;
