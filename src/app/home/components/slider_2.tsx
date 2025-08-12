"use client";

import FallingText from "@/components/ui/FallingText";
import RotatingOrbitalAnimation from "@/components/ui/ImageRotating";
import ScrollingElements from "@/components/ui/ScrollingElements";
import { scrollingElementsImages } from "@/lib/imageConfigs";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useAnimation } from "@/contexts/AnimationContext";

// Import Swiper React components
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react";
import { Autoplay, EffectCreative } from "swiper/modules";

import "swiper/css/autoplay";
import "swiper/css/grid";
import "swiper/css/effect-creative";

const customText = "Add Schema.org, AI-Ready Text, Fix Meta Data, Optimize Content";
const customSpanStyles = [
    { backgroundColor: "#D3F6A9", color: "#1C2128", padding: "15px 32px", borderRadius: "100px" },
    { backgroundColor: "#000", color: "#FFF", padding: "15px 32px", borderRadius: "100px" },
    { backgroundColor: "#4353FF", color: "#FFF", padding: "15px 32px", borderRadius: "100px" },
    { backgroundColor: "#FCEA5A", color: "#1C2128", padding: "15px 32px", borderRadius: "100px" }
];

export default function Slider2() {
    const [activeIndex, setActiveIndex] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const swiperRef = useRef<SwiperRef>(null);
    const fallingTextTriggerRef = useRef<(() => void) | null>(null);

    const [isMobile, setIsMobile] = useState(false);

    const data: { name: string; text: string; content?: React.ReactNode }[] = [
        {
            name: "Analyze",
            text: "AIsee crawls your product's entire online presence — including your website, documentation, blog posts, media coverage, and social channels — to extract structured information. It identifies key sections such as FAQs, product features, roadmap, and team introduction, while simulating how leading AI platforms interpret and recommend your content.",
            content: <RotatingOrbitalAnimation />
        },
        {
            name: "Score",
            text: "Your content is scored across multiple factors — semantic clarity, structure completeness, keyword coverage, and schema compliance. You'll receive a visual report and benchmarking against industry standards to see where your visibility gaps lie.",
            content: (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                    <video src="/images/slider_2/001.mp4" className="max-w-[60%] object-cover rounded-[12px]" autoPlay muted loop />
                    <Image src="/images/slider_2/line.svg" alt="002" className="max-w-[60%] object-cover mt-[-1%]" width={428} height={5.6} priority />
                </div>
            )
        },
        {
            name: "Recommend",
            text: "Based on your AEO score, AIsee generates a tailored list of improvements. It identifies missing fields, suggests rewrites for better AI understanding, and offers prompt-ready content tailored for ChatGPT, Claude, and similar engines.",
            content: (
                <FallingText
                    text={customText}
                    separator=","
                    spanStyles={customSpanStyles}
                    trigger="manual"
                    gravity={0.8}
                    fontSize="16px"
                    onRef={(trigger) => {
                        fallingTextTriggerRef.current = trigger;
                    }}
                />
            )
        },
        {
            name: "Execute",
            text: "No need for manual edits. Our agent automatically rewrites, restructures, and deploys content updates to your GitHub, Notion, Docs site, or CMS — with optional approval from you before publishing.",
            content: (
                <ScrollingElements //
                    className="w-[46%] mx-auto h-full"
                    elements={
                        //
                        scrollingElementsImages.map((item) => (
                            <Image //
                                key={item.id}
                                src={item.img}
                                alt={item.id.toString()}
                                className="w-[115px] h-[32px] object-contain"
                                width={115}
                                height={32}
                            />
                        ))
                    }
                    itemHeight={32}
                    gap={50}
                    xOffset={150}
                    duration={20}
                />
            )
        },
        {
            name: "Verify",
            text: "After publishing, AIsee rechecks your AI visibility — comparing search engine responses, citation frequency, keyword reach, and coverage improvements. A before/after report helps you measure what changed and where.",
            content: (
                <div className="w-full h-full flex items-center justify-center">
                    <Image src="/images/slider_2/5539.png" alt="5539" className="w-[428px] object-cover max-w-[90%] mx-auto" width={428} height={240} priority />
                </div>
            )
        },
        {
            name: "Visibility Boost",
            text: "With cleaner structure and AI-friendly content, your project is more likely to be seen, quoted, and recommended in ChatGPT, Perplexity, and beyond — bringing more organic exposure from users, devs, and investors.",
            content: (
                <div className="w-full h-full flex items-center justify-center">
                    <Image src="/images/slider_2/5540.png" alt="5540" className="w-[428px] object-cover max-w-[90%] mx-auto" width={428} height={240} priority />
                </div>
            )
        }
    ];

    // 防抖的切换函数
    const handleIndexChange = (index: number) => {
        if (activeIndex === index) return;

        console.log(index);

        // 清除之前的定时器
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // 设置新的定时器，延迟切换
        timeoutRef.current = setTimeout(() => {
            setActiveIndex(index);
            // 切换到对应的 Swiper slide
            if (swiperRef.current?.swiper) {
                swiperRef.current.swiper.slideTo(index);
            }
        }, 50); // 50ms 的防抖延迟
    };

    // 准备 AnimatedSwitcher 的数据
    const switcherItems = data.map((item, index) => ({
        id: index,
        content: <div className="w-full h-full bg-white rounded-[12px] overflow-hidden relative border border-[#111111] border-solid">{item.content}</div>
    }));

    // 清理定时器
    const cleanup = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    // 监听 activeIndex 变化，触发 FallingText 动画
    useEffect(() => {
        if (activeIndex === 2 && fallingTextTriggerRef.current) {
            setTimeout(() => {
                fallingTextTriggerRef.current?.();
            }, 100);
        }
    }, [activeIndex]);

    useEffect(() => {
        const _isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
        setIsMobile(_isMobile);
        if (_isMobile) {
            fallingTextTriggerRef.current?.();
        }
        return () => {
            cleanup();
        };
    }, []);

    const { registerAnimation, isVisible, setRef } = useAnimation();

    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        registerAnimation("slider2", false);
        setRef("slider2", sectionRef);
    }, []);

    const visible = isVisible("slider2");

    return (
        <section ref={sectionRef} className="w-full pt-[96px] pb-[124px] bg-white/70 backdrop-blur-[4px] px-12 relative z-10 max-md:px-4 max-md:py-[32px]">
            <div className="text-[#111111] min-h-[128px] mb-[112px] grid grid-cols-12 gap-12 max-md:grid-cols-1 max-md:mb-[32px]">
                <p className={`text-[20px] leading-[140%] tracking-[0.5px] uppercase col-span-6 transition-all duration-300 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-50px]"}`}>AEO Workflow</p>
                <p className={`text-[22.313px] leading-[143.417%] col-span-6 transition-all duration-300 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[50px]"}`}>AIsee boosts your project&apos;s visibility in AI search. Six smart steps. Fully automated. Measurable impact.</p>
            </div>

            {!isMobile && (
                <div className={`grid grid-cols-12 gap-[132px] transition-all duration-300 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-100px]"}`}>
                    <div className="col-span-4 max-w-full">
                        <div className="flex flex-col gap-[20px]">
                            <div className="w-full" style={{ height: "clamp(200px, 20vw, 400px)" }}>
                                <Swiper
                                    ref={swiperRef}
                                    // install Swiper modules
                                    modules={[EffectCreative]}
                                    direction="vertical"
                                    spaceBetween={20}
                                    slidesPerView={1}
                                    // 怎么增加 slide之间的间距

                                    loop={true}
                                    // autoplay={{
                                    //     delay: 5000,
                                    //     disableOnInteraction: false
                                    // }}
                                    grabCursor={true}
                                    effect="creative"
                                    creativeEffect={{
                                        prev: {
                                            shadow: false,
                                            translate: [0, "calc(-10% - 20px)", -1000], // 原来的 -10% 基础上加 20px
                                            scale: 0.8
                                        },
                                        next: {
                                            translate: [0, "calc(100% + 20px)", 0] // 原来的 100% 基础上加 20px
                                        }
                                    }}
                                    speed={1000}
                                    observer={true}
                                    observeParents={true}
                                    observeSlideChildren={true}
                                    setWrapperSize={true}
                                    onSwiper={(swiper) => {
                                        console.log(swiper);
                                    }}
                                    onSlideChange={(swiper) => {
                                        console.log("slide change", swiper.realIndex);
                                        setActiveIndex(swiper.realIndex);
                                    }}
                                    className="w-full h-full"
                                >
                                    {switcherItems.map((item, index) => (
                                        <SwiperSlide key={index} className={`w-full h-full backface-hidden transform-gpu will-change-transform will-change-opacity overflow-hidden ${index === 2 ? "swiper-no-swiping" : ""}`}>
                                            {item.content}
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <p
                                key={activeIndex}
                                className="text-[16.734px] text-[#111111] leading-[134.454%] animate-fade-in-out"
                                style={{
                                    animation: "fadeInOut 0.5s ease-in-out"
                                }}
                            >
                                {data[activeIndex].text}
                            </p>
                        </div>
                    </div>

                    <div className={`col-span-8 flex flex-col transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[100px]"}`}>
                        {data.map((item, index) => (
                            <div
                                key={index}
                                className={`text-[88px] leading-[109.091%] text-[#111111] uppercase opacity-[0.25] hover:opacity-100 transition-opacity duration-300 cursor-pointer overflow-hidden ${activeIndex === index ? "!opacity-100" : ""}`}
                                onMouseEnter={() => {
                                    handleIndexChange(index);
                                }}
                                // onClick={() => {
                                //     handleIndexChange(index);
                                // }}
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {isMobile && (
                <div className="w-full flex flex-col gap-[32px]">
                    {data.map((item, index) => (
                        <div key={index} className="w-full">
                            <div className="text-[36px] leading-[150%] text-[#111111] uppercase mb-4">{item.name}</div>
                            <div className="w-full bg-white rounded-[12px] overflow-hidden relative border border-[#111111] border-solid mb-5" style={{ height: "clamp(300px, 30vw, 500px)" }}>
                                {item.content}
                            </div>
                            <div className="text-[16px] leading-[134.454%] text-[#111111]">{item.text}</div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
