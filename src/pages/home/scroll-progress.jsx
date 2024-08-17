import { motion, useScroll, useSpring } from "framer-motion";

const ProgressBar = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            style={{ scaleX }}
            className="fixed bottom-0 left-0 right-0 z-50 h-3 origin-left backdrop-blur supports-[backdrop-filter]:bg-orange-500/80"
        />
    );
};

export default ProgressBar;
