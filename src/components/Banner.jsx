import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import BannerImage1 from "../assets/banner1.jpg";
import BannerImage2 from "../assets/banner2.jpg";
import BannerImage3 from "../assets/banner3.jpg";

const Banner = () => {
  return (
    <section className="relative max-w-[1500px] mx-auto mt-20 rounded-3xl">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        emulateTouch
        className="h-[500px] md:h-[600px]"
      >
        <div className="relative">
          <img
            src={BannerImage1}
            alt="Medical Camp 1"
            className="object-cover h-[500px] md:h-[600px] w-full rounded-3xl"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-2">
              Bringing Health to Communities
            </h2>
            <p className="text-sm md:text-lg max-w-xl">
              Our medical camps have helped thousands of people gain access to
              quality healthcare.
            </p>
          </div>
        </div>

        <div className="relative">
          <img
            src={BannerImage2}
            alt="Medical Camp 2"
            className="object-cover h-[500px] md:h-[600px] w-full rounded-3xl"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-2">
              Expert Care for Everyone
            </h2>
            <p className="text-sm md:text-lg max-w-xl">
              Our healthcare professionals ensure high-quality medical support
              at every camp.
            </p>
          </div>
        </div>

        <div className="relative">
          <img
            src={BannerImage3}
            alt="Medical Camp 3"
            className="object-cover h-[500px] md:h-[600px] w-full rounded-3xl"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-2">
              Success Stories that Inspire
            </h2>
            <p className="text-sm md:text-lg max-w-xl">
              Read the stories of individuals whose lives were changed through
              our medical camps.
            </p>
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default Banner;
