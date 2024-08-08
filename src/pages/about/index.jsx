import React from "react";
import { motion } from "framer-motion";
import LunaImage from "../../assets/luna.jpg";

const About = () => {
    return (
        <div className="mx-auto flex h-full max-w-7xl flex-col gap-8 lg:flex-row lg:gap-16">
            <motion.div className="w-full lg:w-1/2">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 font-calligraphy text-7xl text-gray-800"
                >
                    About our little Luna
                </motion.h1>
                <div className="flex h-full flex-col gap-4 py-4 text-lg">
                    <motion.p
                        className="text-lg leading-relaxed"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0, duration: 0.6 }}
                    >
                        Meet the enchanting furball that stole our hearts – our
                        beloved{" "}
                        <span className="text-orange-500">
                            three-colored feline wonder
                        </span>
                        , a delightful blend of black, white, and orange hues.
                        Two years ago, we embarked on a journey to an animal
                        shelter, where destiny led us to the tiniest, most
                        vibrant creature we've ever laid eyes on. Rescued from
                        the quiet confines of a barn in a small town at the
                        tender age of two months, she entered our lives with a
                        spirited energy that hinted at her adventurous
                        beginnings.
                    </motion.p>
                    <motion.p
                        className="text-lg leading-relaxed"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Initially, our dear cat was a wild sprite, a testament
                        to her early days navigating the rustic charm of a barn.
                        Yet, as the days unfolded, so did the layers of her
                        endearing personality. Her transformation from a
                        cautious kitten to the epitome of{" "}
                        <span className="text-orange-500">feline charm</span>{" "}
                        has been nothing short of magical. With each passing
                        moment, she gracefully unveiled the most heartwarming
                        facets of her being.
                    </motion.p>
                    <motion.p
                        className="text-lg leading-relaxed"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        Flipping through the pages of time, we're reminded of
                        the first days when she tentatively explored her new
                        home, every nook and cranny sparking her curiosity. The
                        images captured tell tales of her playfulness, her sleek{" "}
                        <span className="text-orange-500">
                            black coat adorned with splashes of white and orange
                        </span>
                        , a palette as unique as the bond we've forged.
                    </motion.p>
                    <motion.p
                        className="text-lg leading-relaxed"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                    >
                        Two years have whisked by in a flurry of paw prints and
                        gentle purrs. She has woven herself seamlessly into the
                        fabric of our lives, becoming not just a pet but an
                        irreplaceable member of our family. Her{" "}
                        <span className="text-orange-500">
                            affectionate nature
                        </span>{" "}
                        has warmed our hearts, turning her from a rescued
                        treasure to the queen of our home. She has an uncanny
                        ability to brighten even the gloomiest days with her
                        playful antics and soothing purrs.
                    </motion.p>
                    <motion.p
                        className="text-lg leading-relaxed"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                    >
                        Her presence is a source of comfort, and her
                        companionship is a daily reminder of the joy and love
                        that a furry friend can bring into our lives. From lazy
                        afternoons curled up in sunlit spots to midnight
                        adventures that keep us entertained, every moment spent
                        with her is a treasure. We feel truly blessed to share
                        our days with this wonderful{" "}
                        <span className="text-orange-500">
                            feline companion
                        </span>
                        .
                    </motion.p>
                </div>
            </motion.div>
            <motion.div
                className="flex w-full flex-col items-center justify-center lg:w-1/2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <img
                    src={LunaImage}
                    alt="Luna"
                    className="w-full max-w-xl rounded-xl shadow-lg"
                />
            </motion.div>
        </div>
    );
};

export default About;
