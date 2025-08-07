"use client";

import { cardStackImages } from "@/lib/imageConfigs";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-cards";

export const StackedCards = () => {
    return (
        <Swiper
            modules={[EffectCards, Autoplay]}
            direction="vertical"
            loop={true}
            slidesPerView={4}
            spaceBetween={0}
            centeredSlides={true}
            watchSlidesProgress={true}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                waitForTransition: true
            }}
            onSetTranslate={(swiper: SwiperClass) => {
                swiper.slides.forEach((slide, index) => {
                    const el = slide as HTMLElement & { progress: number };
                    // 使用 Math.round 来获取整数进度，避免小数导致的偏移问题
                    const progress = Math.round(el.progress);
                    // console.log(`Slide ${index}: progress = ${progress}`);

                    // 清除之前的样式
                    // el.style.removeProperty("opacity");
                    // el.style.removeProperty("transform");
                    el.style.removeProperty("z-index");
                    el.style.removeProperty("width");

                    const distance = Math.abs(progress);
                    // 宽度递减：从300px开始，每个距离减少25px，最小200px
                    const width = Math.max(200, 300 - distance * 25);
                    // const opacity = Math.max(0.3, 1 - distance * 0.15);
                    // 偏移：progress为负值时向上，正值时向下
                    // const translateY = progress * 20;
                    const zIndex = 100 - distance;

                    // el.style.setProperty("opacity", opacity.toString(), "important");
                    // el.style.setProperty("transform", `translate3d(0, -${translateY}px, 0)`, "important");
                    el.style.setProperty("z-index", zIndex.toString(), "important");
                    el.style.setProperty("width", `${width}px`, "important");
                });
            }}
            onSetTransition={(swiper, transition) => {
                // console.log(swiper);
                for (let i = 0; i < swiper.slides.length; i++) {
                    const slide = swiper.slides[i];
                    slide.style.transition = transition.toString();
                }
            }}
            className="w-full h-full "
        >
            {cardStackImages.map((card) => (
                <SwiperSlide key={card.id} className="my-0 mx-auto">
                    <Image src={card.img} alt={card.id.toString()} width={304} height={56} className="!h-[56px]" />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
