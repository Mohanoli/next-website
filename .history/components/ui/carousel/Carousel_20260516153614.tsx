"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { FaArrowRight } from "react-icons/fa6";

//@ts-ignore
import "swiper/css";
//@ts-ignore
import "swiper/css/pagination";
//@ts-ignore
import "swiper/css/navigation";
import { HighlightCarouselProps } from "@/lib/types/GlobalTypes";

const SLIDES_TO_SHOW = 3;

export default function HighlightCarousel({
  data,
  title,
  cardClass = "bg-white shadow-md border border-gray-100",
  imageHeight = "h-64",
}: HighlightCarouselProps) {
  const totalDots = Math.ceil(data.length / SLIDES_TO_SHOW);
  const [activeDot, setActiveDot] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveDot(Math.floor(swiper.realIndex / SLIDES_TO_SHOW));
  };

  const goToGroup = (dotIndex: number) => {
    swiperRef.current?.slideTo(dotIndex * SLIDES_TO_SHOW);
    setActiveDot(dotIndex);
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-8 max-w-7xl">
        {/* Heading */}
        <div className="mb-4">
          <h2 className="px-2 text-2xl md:text-3xl font-medium text-[#4B63A8]">
            {title}
          </h2>
          <div className="mt-2 ml-2 h-0.5 w-16 bg-[#4B63A8]/30 rounded-full" />
        </div>

        {/* Swiper */}
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={handleSlideChange}
          modules={[Autoplay, Navigation]}
          slidesPerView={1}
          spaceBetween={24}
          loop
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <Link
                href={item.url}
                className={`block rounded-2xl overflow-hidden transition-all duration-300 group ${cardClass}`}
              >
                {/* Image */}
                <div className={`relative ${imageHeight} overflow-hidden`}>
                  
                  {/* Image with grayscale hover */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    sizes="100vh"
                    fill
                    className="object-cover transition-all duration-500 ease-in-out group-hover:grayscale group-hover:scale-105"
                  />

                  {/* Optional dark overlay for premium feel */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
                </div>

                {/* Content */}
                <div className="p-4">
                  <span className="text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full">
                    {item.type}
                  </span>

                  <h3 className="text-lg font-semibold mt-2 group-hover:text-[#4B63A8]">
                    {item.title}
                  </h3>

                  <div className="mt-3 inline-flex items-center gap-2 text-white bg-red-600 px-3 py-1.5 rounded-full">
                    Read More <FaArrowRight size={12} />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-3">
          {Array.from({ length: totalDots }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToGroup(i)}
              className={`w-2.5 h-2.5 rounded-full ${
                activeDot === i ? "bg-black" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}