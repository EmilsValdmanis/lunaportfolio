import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { X } from "lucide-react";

export default function ExpandableImage({ image }) {
    const [active, setActive] = useState(false);
    const id = useId();
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

    useOutsideClick(ref, () => setActive(null));

    return (
        <>
            <AnimatePresence>
                {active && typeof active === "object" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 h-full w-full bg-black/50"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {active && typeof active === "object" ? (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-4 md:py-10 md:pr-14">
                        <motion.div
                            layoutId={`card-${active.name}-${id}`}
                            ref={ref}
                            className="relative"
                        >
                            <motion.button
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: {
                                        duration: 0.2,
                                    },
                                }}
                                key={`button-${active.name}-${id}`}
                                className="absolute -right-2 top-0 hidden translate-x-full rounded-full bg-white p-2 md:block"
                                onClick={() => setActive(null)}
                            >
                                <X className="size-6" />
                            </motion.button>
                            <motion.div layoutId={`image-${active.name}-${id}`}>
                                <motion.img
                                    src={active.url}
                                    alt={active.name}
                                    className="h-full max-h-[720px] w-full rounded-xl object-contain md:max-h-[1080px]"
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
            <motion.div
                layoutId={`card-${image.name}-${id}`}
                key={image.name}
                onClick={() => setActive(image)}
                className="cursor-pointer overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                whileHover={{
                    borderRadius: "24px",
                    scale: 1.05,
                    transition: {
                        duration: 0.5,
                        ease: "easeInOut",
                        type: "spring",
                        stiffness: 300,
                    },
                }}
                whileTap={{ scale: 0.95 }}
                whileFocus={{ scale: 0.95 }}
            >
                <motion.div layoutId={`image-${image.name}-${id}`}>
                    <motion.img
                        src={image.url}
                        alt={image.name}
                        className="h-96 w-full rounded-lg object-cover object-center"
                    />
                </motion.div>
            </motion.div>
        </>
    );
}
