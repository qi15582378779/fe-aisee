"use client";

import Image from "next/image";
import { stackImages, listImages, cardStackImages } from "@/lib/imageConfigs";
import Stack from "@/components/ui/Stack";
import { AnimatedList } from "@/components/magicui/animated-list";
import { StackedCards } from "@/components/ui/StackedCards";
import { useAnimation } from "@/contexts/AnimationContext";
import { useRef, useEffect, useState } from "react";

const data = [
    {
        title: "AEO Diagnostic Engine",
        des: "Analyze your website or product across AI search engines and output an AEO Score.",
        bg: "#D2F6A7"
    },
    {
        title: "Optimization Recommendation Engine",
        des: "Actionable improvements based on scoring output.",
        bg: "#FFD0E2"
    },
    {
        title: "Agent Executor",
        des: "Let an AI Agent complete tasks across content, code, or deployment.",
        bg: "#FCEA59"
    }
];

export default function Slider4() {
    const { registerAnimation, isVisible, setRef } = useAnimation();

    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        registerAnimation("slider4", false);
        setRef("slider4", sectionRef);
    }, []);

    const visible = isVisible("slider4");

    return (
        <section ref={sectionRef} className="w-full px-12 pb-[72px] relative z-10 max-md:px-4 max-md:pt-[12px]">
            <div className="grid grid-cols-2 items-center mb-10 max-md:mb-[14px] max-md:grid-cols-1">
                <div></div>
                <div className="flex gap-[4.3px] items-baseline text-[#111111] text-[35.1px] leading-[80.057%] max-md:text-[16px] max-md:leading-[175.625%] max-md:justify-end max-md:px-[16px]">
                    <span className={`flex w-[7px] h-[7px] rounded-full bg-[#FF5A4D] transition-all duration-700 ${visible ? "animate-bounce-twice" : "translate-y-10 opacity-0"}`}></span>
                    <span className={`transition-all duration-700 ease-out ${visible ? "translate-x-0 opacity-100" : "translate-x-[50%] opacity-0"}`}>Features Page</span>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center text-[#111111] text-[84.3px] leading-[108.327%] mb-[48px] max-md:text-[48px] max-md:leading-[150%]">
                <div className="flex items-center gap-6 max-md:gap-2">
                    Explore the
                    <div className="flex items-center justify-center border border-[#111111] rounded-full bg-[#E6FFF9] w-[72px] h-[72px] max-md:w-[64px] max-md:h-[64px]">
                        <Image src="/images/slider_4/1.gif" alt="arrow" width={48} height={48} />
                    </div>
                    <span className="max-md:hidden">Core Features of</span>
                </div>
                <p>
                    <span className="hidden max-md:inline">Core Features of</span>
                    AIsee&apos;s AEO Engine
                </p>
            </div>

            <div className="grid grid-cols-3 gap-[26px] max-md:grid-cols-1">
                {data.map((item, index) => (
                    <div key={index} style={{ backgroundColor: item.bg }} className="pt-8 px-6 rounded-[24px] text-[#111111] transition-all duration-300 hover:transform hover:-translate-y-4 relative">
                        <p className="text-[36px] leading-[133.333%] tracking-[-1.25px] mb-4">{item.title}</p>
                        <p className="text-[18px] leading-[133.333%]">{item.des}</p>

                        {index === 0 && (
                            <div className="w-full mt-[32px] flex items-center justify-center absolute bottom-[64px] left-0 max-md:bottom-[0] max-md:relative max-md:mb-[32px]">
                                <Stack //
                                    randomRotation={false}
                                    sensitivity={180}
                                    sendToBackOnClick={true}
                                    cardDimensions={{ width: 250, height: 200 }}
                                    cardsData={stackImages}
                                />
                            </div>
                        )}

                        {index === 1 && (
                            <div className="w-full h-[220px] overflow-hidden mt-[32px] flex justify-center absolute bottom-0 left-0 max-md:bottom-[0] max-md:relative">
                                <AnimatedList delay={2000}>
                                    {listImages.map((item) => (
                                        <Image key={item.id} src={item.img} alt="list" width={304} height={100} className="w-[304px]" />
                                    ))}
                                </AnimatedList>
                            </div>
                        )}

                        {index === 2 && (
                            <div className="w-full overflow-hidden my-[32px] flex flex-col items-center justify-center">
                                <div>
                                    <Image src="/images/slider_4/005.png" alt="slider_4" width={124} height={57} className="w-[124px] h-[57px] mb-1 ml-5" />
                                </div>

                                <div className="w-full h-[200px] overflow-hidden">
                                    <StackedCards />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
