import React from "react";
import LunaImage from "../../assets/luna.jpg";

const About = () => {
    return (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16">
            <div className="w-full lg:w-1/2">
                <h1 className="font-calligraphy text-7xl">
                    About our little Luna
                </h1>
                <div className="flex flex-col gap-4 py-8 text-lg">
                    <p>
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
                    </p>
                    <p>
                        Initially, our dear cat was a wild sprite, a testament
                        to her early days navigating the rustic charm of a barn.
                        Yet, as the days unfolded, so did the layers of her
                        endearing personality. Her transformation from a
                        cautious kitten to the epitome of{" "}
                        <span className="text-orange-500">feline charm</span>{" "}
                        has been nothing short of magical. With each passing
                        moment, she gracefully unveiled the most heartwarming
                        facets of her being.
                    </p>
                    <p>
                        Flipping through the pages of time, we're reminded of
                        the first days when she tentatively explored her new
                        home, every nook and cranny sparking her curiosity. The
                        images captured tell tales of her playfulness, her sleek{" "}
                        <span className="text-orange-500">
                            black coat adorned with splashes of white and orange
                        </span>
                        , a palette as unique as the bond we've forged.
                    </p>
                    <p>
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
                    </p>
                    <p>
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
                    </p>
                </div>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
                <img
                    src={LunaImage}
                    alt="Luna"
                    className="w-full max-w-xl rounded-xl"
                />
            </div>
        </div>
    );
};

export default About;
