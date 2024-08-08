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
                            className="relative max-h-full"
                        >
                            <motion.button
                                initial={{
                                    opacity: 0,
                                    rotate: -15,
                                    y: -10,
                                    x: "-100%",
                                }}
                                animate={{
                                    opacity: 1,
                                    rotate: 0,
                                    y: 0,
                                    x: "100%",
                                    transition: {
                                        stiffness: 300,
                                        damping: 10,
                                    },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: {
                                        duration: 0.2,
                                    },
                                }}
                                whileHover={{
                                    scale: 1.1,
                                    rotate: [0, 10, -10, 10, 0],
                                    transition: {
                                        duration: 0.5,
                                    },
                                }}
                                whileTap={{ scale: 0.8 }}
                                key={`button-${active.name}-${id}`}
                                className="absolute right-0 top-0 -mr-2 rounded-full p-2 shadow backdrop-blur supports-[backdrop-filter]:bg-white/30 md:block"
                                onClick={() => setActive(null)}
                                style={{ pointerEvents: "auto" }}
                            >
                                <X className="size-6" />
                            </motion.button>
                            <motion.div layoutId={`image-${active.name}-${id}`}>
                                <motion.img
                                    loading="lazy"
                                    src={active.url}
                                    alt={active.name}
                                    style={{
                                        boxShadow:
                                            "0px 10px 30px rgba(0, 0, 0, 0.3)",
                                    }}
                                    className="h-[85vh] w-auto rounded-3xl object-cover object-center"
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
                className="cursor-pointer overflow-hidden rounded-xl outline-orange-500"
                whileHover={{
                    borderRadius: "24px",
                    rotate: 0.3,
                    scale: 1.05,
                    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
                    transition: {
                        duration: 0.5,
                        ease: "easeInOut",
                        type: "spring",
                        stiffness: 300,
                    },
                }}
                whileTap={{ scale: 0.95 }}
                whileFocus={{ scale: 0.95 }}
                initial={{ opacity: 1, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-75px", once: true }}
                transition={{ duration: 0.4 }}
            >
                <motion.div layoutId={`image-${image.name}-${id}`}>
                    <motion.img
                        loading="lazy"
                        src={image.url}
                        alt={image.name}
                        className="h-96 w-full rounded-lg object-cover object-center"
                    />
                </motion.div>
            </motion.div>
        </>
    );
}
