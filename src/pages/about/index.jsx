import React from "react"
import LunaImage from "../../assets/luna.png"

const About = () => {
  return (
    <div className="max-w-7xl mx-auto flex gap-16">
      <div className="w-1/2">
        <h1 className="font-calligraphy text-7xl">About our little Luna</h1>
        <div className="flex flex-col gap-4 py-8 text-lg">
          <p>
            Meet the enchanting furball that stole our hearts – our beloved three-colored feline wonder, a delightful blend of black, white, and orange hues. Two years ago, we embarked on a journey to an animal shelter, where destiny led us to the tiniest, most vibrant creature we've ever laid eyes on. Rescued from the quiet confines of a barn in a small town at the tender age of two months, she entered our lives with a spirited energy that hinted at her adventurous beginnings.
          </p>
          <p>
            Initially, our dear cat was a wild sprite, a testament to her early days navigating the rustic charm of a barn. Yet, as the days unfolded, so did the layers of her endearing personality. Her transformation from a cautious kitten to the epitome of feline charm has been nothing short of magical. With each passing moment, she gracefully unveiled the most heartwarming facets of her being.
          </p>
          <p>
            Flipping through the pages of time, we're reminded of the first days when she tentatively explored her new home, every nook and cranny sparking her curiosity. The images captured tell tales of her playfulness, her sleek black coat adorned with splashes of white and orange, a palette as unique as the bond we've forged.
          </p>
          <p>
            Two years have whisked by in a flurry of paw prints and gentle purrs. She has woven herself seamlessly into the fabric of our lives, becoming not just a pet but an irreplaceable member of our family. Her affectionate nature has warmed our hearts, turning her from a rescued treasure to the queen of our home.
          </p>
        </div>
        
      </div>
      <div className="w-1/2 flex flex-col justify-center">
          <img
          src={LunaImage}
          alt="Luna"
          className="w-full rounded-xl"
        />
      </div>
    </div>
  )
}

export default About
