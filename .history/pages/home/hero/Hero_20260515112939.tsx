"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import axiosInstance from "@/lib/config/AxiosConfig";

 //@ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/effect-cube";
 // @ts-ignore
import "swiper/css/navigation";
import { HeroImage } from "@/lib/types/GlobalTypes";

const Carousel = () => {
    const [banners, setBanners] = useState<HeroImage[]>([]);
    const [loading, setLoading] = useState(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https:api.sanakisan.magnus.com.np";

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const res: any = await axiosInstance.get("/banners");
                const activeBanners = (res.result || []).filter((b: HeroImage) => b.status === "active");
                setBanners(activeBanners);
            } catch (error) {
                console.error("Failed to fetch hero banners:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-400px flex items-center justify-center bg-slate-50">
                <Loader2 className="w-10 h-10 text-teal-600 animate-spin" />
            </div>
        );
    }

    if (banners.length === 0) return null;

    return (
        <section className="w-full bg-white py-4 md:py-1">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative w-full aspect 16/9 sm:aspect-16/8 md:aspect-16/7 lg:aspect-16/6 max-h-450px sm:max-h-500px md:max-h-550px lg:max-h-600px group">
                    <Swiper
                        effect={"cube"}
                        grabCursor={true}
                        loop={banners.length > 1}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            nextEl: ".swiper-button-next-custom",
                            prevEl: ".swiper-button-prev-custom",
                        }}


                        cubeEffect={{
                            shadow: false,
                            slideShadows: false,
                            shadowOffset: 20,
                            shadowScale: 0.94,
                        }}
                        modules={[EffectCube, Autoplay, Navigation]}
                        className="w-full h-full"
                    >
                        {banners.map((item) => (
                            <SwiperSlide key={item.id} className="w-full h-full">
                                <div className="relative w-full h-full overflow-hidden bg-gray-100">
                                    <img
                                        src={`${baseUrl}${item.imageUrl}`}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Footer Title Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/55 py-2 sm:py-2 px-2 z-10">
                                        <div className="text-center max-w-4xl mx-auto">
                                            <h2 className="text-white text-sm sm:text-base md:text-l tracking-wide drop-shadow-md">
                                                {item.title}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Buttons - Show on hover */}
                    {banners.length > 1 && (
                        <>
                            <button className="swiper-button-prev-custom absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 
                                w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-black 
                                flex items-center justify-center shadow-lg backdrop-blur-sm
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                                disabled:opacity-0 disabled:cursor-not-allowed">
                                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>

                            <button className="swiper-button-next-custom absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 
                                w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-black 
                                flex items-center justify-center shadow-lg backdrop-blur-sm
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                disabled:opacity-0 disabled:cursor-not-allowed">
                                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Carousel;
