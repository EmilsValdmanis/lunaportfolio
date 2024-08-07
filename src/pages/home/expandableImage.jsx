import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { X } from "lucide-react";

export default function ExpandableImage({ image }) {
    const [active, setActive] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        function onKeyDown(event) {
            if (event.key === "Escape") {
                setActive(false);
            }
        }

        if (active) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(false));

    return (
        <>
            <div
                className="transform cursor-pointer overflow-hidden rounded-xl shadow transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => setActive(true)}
            >
                <img
                    src={image.url}
                    alt={image.name}
                    className="h-96 w-full object-cover object-center"
                />
            </div>

            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-4 md:py-10 md:pr-14"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            ref={ref}
                            className="relative"
                        >
                            <motion.img
                                src={image.url}
                                alt={image.name}
                                className="h-full max-h-[720px] w-full rounded-xl object-contain md:max-h-[1080px]"
                            />
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute -right-2 top-0 hidden translate-x-full rounded-full bg-white p-2 md:block"
                                onClick={() => setActive(false)}
                            >
                                <X className="size-6" />
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
